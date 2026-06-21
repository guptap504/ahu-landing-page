import {
  ArrowLeft,
  FolderOpen,
  Gauge,
  IndianRupee,
  Plus,
  Save,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type AhuRow = {
  id: string;
  name: string;
  designCfm: string;
  monthlyRunHours: string;
  nameplateKw: string;
  vfdFrequency: string;
  staticPressure: string;
};

type SavedAhuInput = Omit<AhuRow, "id">;

type SavedProject = {
  id: string;
  name: string;
  savedAt: string;
  electricityTariff: string;
  rows: SavedAhuInput[];
};

type FanSelection = {
  sevenPointFiveCount: number;
  tenCount: number;
  totalFans: number;
  installedCfm: number;
  totalKw: number;
  overshootCfm: number;
};

type AhuResult = {
  row: AhuRow;
  designCfm: number;
  monthlyRunHours: number;
  nameplateKw: number;
  vfdFrequency: number;
  staticPressure: number;
  baselineKw: number;
  selection: FanSelection;
  capex: number;
  baselineMonthlyCost: number;
  ecMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPct: number;
  paybackMonths: number | null;
};

const PER_CFM_RATE = 24;
const BASELINE_FREQUENCY = 50;
const DEFAULT_STATIC_PRESSURE = 400;
const PROJECT_STORAGE_KEY = "garvata:ec-fan-roi-projects:v1";
const FAN_TYPE_KEYS = ["sevenPointFive", "ten"] as const;

type FanTypeKey = (typeof FAN_TYPE_KEYS)[number];

type CurvePoint = {
  cfm: number;
  staticPa: number;
  watts: number;
};

type SpeedCurve = {
  points: CurvePoint[];
};

const FAN_TYPES = {
  sevenPointFive: {
    label: "7.5K",
    curves: [
      {
        points: [
          { cfm: 9500, staticPa: 0, watts: 1700 },
          { cfm: 7814, staticPa: 590, watts: 2156 },
          { cfm: 5400, staticPa: 804, watts: 2300 },
          { cfm: 0, staticPa: 892, watts: 840 },
        ],
      },
      {
        points: [
          { cfm: 9000, staticPa: 0, watts: 1080 },
          { cfm: 6500, staticPa: 441, watts: 1620 },
          { cfm: 4600, staticPa: 650, watts: 1520 },
          { cfm: 0, staticPa: 716, watts: 630 },
        ],
      },
      {
        points: [
          { cfm: 7500, staticPa: 0, watts: 810 },
          { cfm: 4400, staticPa: 400, watts: 1040 },
          { cfm: 3200, staticPa: 500, watts: 860 },
          { cfm: 0, staticPa: 549, watts: 400 },
        ],
      },
      {
        points: [
          { cfm: 5357, staticPa: 0, watts: 295 },
          { cfm: 3143, staticPa: 204, watts: 379 },
          { cfm: 2286, staticPa: 255, watts: 313 },
          { cfm: 0, staticPa: 280, watts: 146 },
        ],
      },
    ],
  },
  ten: {
    label: "10K",
    curves: [
      {
        points: [
          { cfm: 12400, staticPa: 0, watts: 2200 },
          { cfm: 11000, staticPa: 412, watts: 2600 },
          { cfm: 8423, staticPa: 699, watts: 2900 },
          { cfm: 0, staticPa: 873, watts: 1100 },
        ],
      },
      {
        points: [
          { cfm: 11800, staticPa: 0, watts: 1410 },
          { cfm: 10000, staticPa: 412, watts: 1610 },
          { cfm: 5200, staticPa: 657, watts: 1830 },
          { cfm: 0, staticPa: 696, watts: 830 },
        ],
      },
      {
        points: [
          { cfm: 9700, staticPa: 0, watts: 1050 },
          { cfm: 6100, staticPa: 400, watts: 1340 },
          { cfm: 3500, staticPa: 500, watts: 1090 },
          { cfm: 0, staticPa: 539, watts: 500 },
        ],
      },
      {
        points: [
          { cfm: 6929, staticPa: 0, watts: 383 },
          { cfm: 4357, staticPa: 204, watts: 488 },
          { cfm: 2500, staticPa: 255, watts: 397 },
          { cfm: 0, staticPa: 275, watts: 182 },
        ],
      },
    ],
  },
} satisfies Record<FanTypeKey, { label: string; curves: SpeedCurve[] }>;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
  style: "percent",
});

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `ahu-${Date.now()}-${Math.random()}`;
}

function createAhuRow(index: number, overrides: Partial<AhuRow> = {}): AhuRow {
  return {
    id: makeId(),
    name: `AHU ${index}`,
    designCfm: "",
    monthlyRunHours: "",
    nameplateKw: "",
    vfdFrequency: "50",
    staticPressure: String(DEFAULT_STATIC_PRESSURE),
    ...overrides,
  };
}

function toText(value: unknown, fallback = "") {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function normalizeSavedAhuRow(value: unknown, index: number): SavedAhuInput | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  return {
    name: toText(row.name, `AHU ${index + 1}`),
    designCfm: toText(row.designCfm),
    monthlyRunHours: toText(row.monthlyRunHours),
    nameplateKw: toText(row.nameplateKw),
    vfdFrequency: toText(row.vfdFrequency, String(BASELINE_FREQUENCY)),
    staticPressure: toText(row.staticPressure, String(DEFAULT_STATIC_PRESSURE)),
  };
}

function normalizeSavedProject(value: unknown): SavedProject | null {
  if (!value || typeof value !== "object") return null;
  const project = value as Record<string, unknown>;
  const name = toText(project.name).trim();
  if (!name) return null;

  const rows = Array.isArray(project.rows)
    ? project.rows
        .map((row, index) => normalizeSavedAhuRow(row, index))
        .filter((row): row is SavedAhuInput => row !== null)
    : [];

  return {
    id: toText(project.id, makeId()),
    name,
    savedAt: toText(project.savedAt, new Date(0).toISOString()),
    electricityTariff: toText(project.electricityTariff, "10.06"),
    rows,
  };
}

function readSavedProjects() {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(PROJECT_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeSavedProject)
      .filter((project): project is SavedProject => project !== null)
      .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
  } catch {
    return [];
  }
}

function writeSavedProjects(projects: SavedProject[]) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
    return true;
  } catch {
    return false;
  }
}

function parseNumber(value: string, fallback = 0) {
  if (value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatCurrency(value: number) {
  return inrFormatter.format(Math.round(value));
}

function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value));
}

function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

function formatPayback(value: number | null) {
  return value === null ? "No payback" : `${formatDecimal(value)} mo`;
}

function getFanMixLabel(selection: FanSelection) {
  const parts = [];
  if (selection.sevenPointFiveCount > 0) {
    parts.push(
      `${selection.sevenPointFiveCount} x ${FAN_TYPES.sevenPointFive.label}`
    );
  }
  if (selection.tenCount > 0) {
    parts.push(`${selection.tenCount} x ${FAN_TYPES.ten.label}`);
  }
  return parts.length > 0 ? parts.join(" + ") : "-";
}

function interpolate(start: number, end: number, ratio: number) {
  return start + (end - start) * ratio;
}

function getCurvePointAtStatic(curve: SpeedCurve, staticPressure: number) {
  const points = [...curve.points].sort((a, b) => a.staticPa - b.staticPa);

  if (staticPressure <= points[0].staticPa) {
    return {
      cfm: points[0].cfm,
      watts: points[0].watts,
    };
  }

  for (let index = 1; index < points.length; index += 1) {
    const lower = points[index - 1];
    const upper = points[index];

    if (staticPressure <= upper.staticPa) {
      const ratio =
        (staticPressure - lower.staticPa) /
        (upper.staticPa - lower.staticPa);

      return {
        cfm: interpolate(lower.cfm, upper.cfm, ratio),
        watts: interpolate(lower.watts, upper.watts, ratio),
      };
    }
  }

  return {
    cfm: 0,
    watts: 0,
  };
}

function getFanCapacityAtStatic(fanType: FanTypeKey, staticPressure: number) {
  return Math.max(
    ...FAN_TYPES[fanType].curves.map(
      (curve) => getCurvePointAtStatic(curve, staticPressure).cfm
    )
  );
}

function estimateFanWatts(
  fanType: FanTypeKey,
  targetCfm: number,
  staticPressure: number
) {
  if (targetCfm <= 0) return 0;

  const curvePoints = FAN_TYPES[fanType].curves
    .map((curve) => getCurvePointAtStatic(curve, staticPressure))
    .filter((point) => point.cfm > 0)
    .sort((a, b) => a.cfm - b.cfm);

  if (curvePoints.length === 0) return null;

  const lowest = curvePoints[0];
  const highest = curvePoints[curvePoints.length - 1];

  if (targetCfm > highest.cfm) return null;

  if (targetCfm <= lowest.cfm) {
    return lowest.watts * Math.pow(targetCfm / lowest.cfm, 3);
  }

  for (let index = 1; index < curvePoints.length; index += 1) {
    const lower = curvePoints[index - 1];
    const upper = curvePoints[index];

    if (targetCfm <= upper.cfm) {
      const ratio = (targetCfm - lower.cfm) / (upper.cfm - lower.cfm);
      return interpolate(lower.watts, upper.watts, ratio);
    }
  }

  return highest.watts;
}

function estimateSelectionKw(
  selection: Pick<FanSelection, "sevenPointFiveCount" | "tenCount">,
  designCfm: number,
  staticPressure: number
) {
  if (designCfm <= 0) return 0;

  const sevenPointFiveCapacity =
    selection.sevenPointFiveCount *
    getFanCapacityAtStatic("sevenPointFive", staticPressure);
  const tenCapacity =
    selection.tenCount * getFanCapacityAtStatic("ten", staticPressure);
  const totalCapacity = sevenPointFiveCapacity + tenCapacity;

  if (totalCapacity <= 0 || totalCapacity < designCfm) return null;

  let totalWatts = 0;

  for (const fanType of FAN_TYPE_KEYS) {
    const fanCount =
      fanType === "sevenPointFive"
        ? selection.sevenPointFiveCount
        : selection.tenCount;

    if (fanCount === 0) continue;

    const typeCapacity =
      fanCount * getFanCapacityAtStatic(fanType, staticPressure);
    const typeTargetCfm = designCfm * (typeCapacity / totalCapacity);
    const perFanTargetCfm = typeTargetCfm / fanCount;
    const watts = estimateFanWatts(
      fanType,
      perFanTargetCfm,
      staticPressure
    );

    if (watts === null) return null;
    totalWatts += watts * fanCount;
  }

  return totalWatts / 1000;
}

function chooseFanMix(designCfm: number, staticPressure: number): FanSelection {
  const emptySelection = {
    sevenPointFiveCount: 0,
    tenCount: 0,
    totalFans: 0,
    installedCfm: 0,
    totalKw: 0,
    overshootCfm: 0,
  };

  if (designCfm <= 0) return emptySelection;

  const sevenPointFiveCapacity = getFanCapacityAtStatic(
    "sevenPointFive",
    staticPressure
  );
  const tenCapacity = getFanCapacityAtStatic("ten", staticPressure);
  const smallestCapacity = Math.min(
    ...[sevenPointFiveCapacity, tenCapacity].filter((capacity) => capacity > 0)
  );

  if (!Number.isFinite(smallestCapacity)) return emptySelection;

  const maxFans = Math.ceil(designCfm / smallestCapacity) + 2;
  let best: FanSelection | null = null;

  for (
    let sevenPointFiveCount = 0;
    sevenPointFiveCount <= maxFans;
    sevenPointFiveCount += 1
  ) {
    for (let tenCount = 0; tenCount <= maxFans; tenCount += 1) {
      const totalFans = sevenPointFiveCount + tenCount;
      if (totalFans === 0) continue;

      const installedCfm =
        sevenPointFiveCount * sevenPointFiveCapacity + tenCount * tenCapacity;
      if (installedCfm < designCfm) continue;

      const totalKw = estimateSelectionKw(
        { sevenPointFiveCount, tenCount },
        designCfm,
        staticPressure
      );
      if (totalKw === null) continue;

      const candidate = {
        sevenPointFiveCount,
        tenCount,
        totalFans,
        installedCfm,
        totalKw,
        overshootCfm: installedCfm - designCfm,
      };

      if (
        best === null ||
        candidate.totalFans < best.totalFans ||
        (candidate.totalFans === best.totalFans &&
          candidate.overshootCfm < best.overshootCfm) ||
        (candidate.totalFans === best.totalFans &&
          candidate.overshootCfm === best.overshootCfm &&
          candidate.totalKw < best.totalKw)
      ) {
        best = candidate;
      }
    }
  }

  return best ?? emptySelection;
}

function calculateAhu(row: AhuRow, electricityTariff: number): AhuResult {
  const designCfm = Math.max(0, parseNumber(row.designCfm));
  const monthlyRunHours = Math.max(0, parseNumber(row.monthlyRunHours));
  const nameplateKw = Math.max(0, parseNumber(row.nameplateKw));
  const vfdFrequency = Math.max(
    0,
    parseNumber(row.vfdFrequency, BASELINE_FREQUENCY)
  );
  const staticPressure = Math.max(
    0,
    parseNumber(row.staticPressure, DEFAULT_STATIC_PRESSURE)
  );
  const speedRatio = vfdFrequency / BASELINE_FREQUENCY;
  const speedDerating = Math.pow(speedRatio, 3);
  const baselineKw =
    nameplateKw * speedDerating;
  const fullSpeedSelection = chooseFanMix(designCfm, staticPressure);
  const selection = {
    ...fullSpeedSelection,
    totalKw: fullSpeedSelection.totalKw * speedDerating,
  };
  const capex = designCfm * PER_CFM_RATE;
  const baselineMonthlyCost = baselineKw * monthlyRunHours * electricityTariff;
  const ecMonthlyCost = selection.totalKw * monthlyRunHours * electricityTariff;
  const monthlySavings = baselineMonthlyCost - ecMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPct =
    baselineMonthlyCost > 0 ? monthlySavings / baselineMonthlyCost : 0;
  const paybackMonths = monthlySavings > 0 ? capex / monthlySavings : null;

  return {
    row,
    designCfm,
    monthlyRunHours,
    nameplateKw,
    vfdFrequency,
    staticPressure,
    baselineKw,
    selection,
    capex,
    baselineMonthlyCost,
    ecMonthlyCost,
    monthlySavings,
    annualSavings,
    savingsPct,
    paybackMonths,
  };
}

const initialRows = [
  createAhuRow(1, {
    designCfm: "13000",
    monthlyRunHours: "416",
    nameplateKw: "6.76",
  }),
  createAhuRow(2, {
    designCfm: "17200",
    monthlyRunHours: "416",
    nameplateKw: "9.21",
  }),
];

const Calculate = () => {
  const [projectName, setProjectName] = useState("");
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(() =>
    readSavedProjects()
  );
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [electricityTariff, setElectricityTariff] = useState("10.06");
  const [rows, setRows] = useState<AhuRow[]>(initialRows);
  const tariff = Math.max(0, parseNumber(electricityTariff));
  const selectedProject = savedProjects.find(
    (project) => project.id === selectedProjectId
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "EC Fan ROI Calculator | GarvataAI";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Calculate project-level ROI for Garvata EC fan AHU retrofits."
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  const results = useMemo(
    () => rows.map((row) => calculateAhu(row, tariff)),
    [rows, tariff]
  );

  const project = useMemo(
    () =>
      results.reduce(
        (total, result) => ({
          designCfm: total.designCfm + result.designCfm,
          installedCfm: total.installedCfm + result.selection.installedCfm,
          fanCount: total.fanCount + result.selection.totalFans,
          capex: total.capex + result.capex,
          baselineMonthlyCost:
            total.baselineMonthlyCost + result.baselineMonthlyCost,
          ecMonthlyCost: total.ecMonthlyCost + result.ecMonthlyCost,
          monthlySavings: total.monthlySavings + result.monthlySavings,
          annualSavings: total.annualSavings + result.annualSavings,
        }),
        {
          designCfm: 0,
          installedCfm: 0,
          fanCount: 0,
          capex: 0,
          baselineMonthlyCost: 0,
          ecMonthlyCost: 0,
          monthlySavings: 0,
          annualSavings: 0,
        }
      ),
    [results]
  );

  const projectPaybackMonths =
    project.monthlySavings > 0 ? project.capex / project.monthlySavings : null;
  const projectSavingsPct =
    project.baselineMonthlyCost > 0
      ? project.monthlySavings / project.baselineMonthlyCost
      : 0;

  const updateRow = (id: string, field: keyof AhuRow, value: string) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setRows((currentRows) => [
      ...currentRows,
      createAhuRow(currentRows.length + 1, {
        monthlyRunHours: currentRows[0]?.monthlyRunHours ?? "",
        staticPressure:
          currentRows[0]?.staticPressure ?? String(DEFAULT_STATIC_PRESSURE),
      }),
    ]);
  };

  const removeRow = (id: string) => {
    setRows((currentRows) =>
      currentRows.length === 1
        ? currentRows
        : currentRows.filter((row) => row.id !== id)
    );
  };

  const saveProject = () => {
    const name = projectName.trim();
    if (!name) {
      setSaveMessage("Enter a project name before saving.");
      return;
    }

    const existingProject = savedProjects.find(
      (project) => project.name.toLowerCase() === name.toLowerCase()
    );
    const projectToSave: SavedProject = {
      id: existingProject?.id ?? makeId(),
      name,
      savedAt: new Date().toISOString(),
      electricityTariff,
      rows: rows.map((row) => ({
        name: row.name,
        designCfm: row.designCfm,
        monthlyRunHours: row.monthlyRunHours,
        nameplateKw: row.nameplateKw,
        vfdFrequency: row.vfdFrequency,
        staticPressure: row.staticPressure,
      })),
    };
    const nextProjects = [
      projectToSave,
      ...savedProjects.filter((project) => project.id !== projectToSave.id),
    ];

    if (!writeSavedProjects(nextProjects)) {
      setSaveMessage("Could not save this project in this browser.");
      return;
    }

    setSavedProjects(nextProjects);
    setSelectedProjectId(projectToSave.id);
    setSaveMessage(`Saved "${projectToSave.name}".`);
  };

  const loadSelectedProject = () => {
    if (!selectedProject) {
      setSaveMessage("Select a saved project to load.");
      return;
    }

    setProjectName(selectedProject.name);
    setElectricityTariff(selectedProject.electricityTariff);
    setRows(
      selectedProject.rows.length > 0
        ? selectedProject.rows.map((row, index) =>
            createAhuRow(index + 1, row)
          )
        : [createAhuRow(1)]
    );
    setSaveMessage(`Loaded "${selectedProject.name}".`);
  };

  const deleteSelectedProject = () => {
    if (!selectedProject) {
      setSaveMessage("Select a saved project to delete.");
      return;
    }

    const nextProjects = savedProjects.filter(
      (project) => project.id !== selectedProject.id
    );

    if (!writeSavedProjects(nextProjects)) {
      setSaveMessage("Could not update saved projects in this browser.");
      return;
    }

    setSavedProjects(nextProjects);
    setSelectedProjectId("");
    setSaveMessage(`Deleted "${selectedProject.name}".`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            className="flex min-h-[44px] items-center gap-2.5 text-gray-900 transition-opacity hover:opacity-80"
          >
            <img src="/logo192.svg" alt="" className="h-7 w-7" />
            <span className="font-serif text-lg font-bold">GarvataAI</span>
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-200 bg-gray-50 px-4 py-10 sm:py-14">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                  EC Fan Retrofit ROI
                </p>
                <h1 className="mb-5 max-w-3xl font-serif text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
                  Project payback for multi-AHU EC fan retrofits
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                  Baseline energy is adjusted by VFD frequency. EC fan load is
                  interpolated from 7.5K and 10K fan curves at the entered duct
                  static pressure.
                </p>
              </div>
              <div className="grid gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-2">
                <div className="sm:col-span-2 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Project name
                    </span>
                    <input
                      aria-label="Project name"
                      className="h-11 w-full rounded-md border border-gray-300 px-3 text-base font-semibold text-gray-900 outline-none transition-colors focus:border-primary"
                      placeholder="e.g. Hotel AHU retrofit"
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={saveProject}
                    disabled={!projectName.trim()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 md:min-w-[10rem]"
                  >
                    <Save className="h-4 w-4" />
                    Save Project
                  </button>
                </div>
                <div className="sm:col-span-2 grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Saved projects
                    </span>
                    <select
                      aria-label="Saved projects"
                      className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary disabled:bg-gray-50 disabled:text-gray-400"
                      disabled={savedProjects.length === 0}
                      value={selectedProjectId}
                      onChange={(event) =>
                        setSelectedProjectId(event.target.value)
                      }
                    >
                      <option value="">
                        {savedProjects.length === 0
                          ? "No saved projects"
                          : "Select saved project"}
                      </option>
                      {savedProjects.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={loadSelectedProject}
                    disabled={!selectedProject}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 md:min-w-[6.5rem]"
                  >
                    <FolderOpen className="h-4 w-4" />
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={deleteSelectedProject}
                    disabled={!selectedProject}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 text-sm font-semibold text-gray-700 transition-colors hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 md:min-w-[6.5rem]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
                {saveMessage && (
                  <p
                    className="sm:col-span-2 text-sm font-medium text-gray-500"
                    role="status"
                  >
                    {saveMessage}
                  </p>
                )}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Electricity tariff
                  </span>
                  <div className="flex min-h-[44px] items-center rounded-md border border-gray-300 bg-white px-3 focus-within:border-primary">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-400" />
                    <input
                      aria-label="Electricity tariff in rupees per kWh"
                      className="h-10 w-full bg-transparent text-base font-semibold text-gray-900 outline-none"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      type="number"
                      value={electricityTariff}
                      onChange={(event) => setElectricityTariff(event.target.value)}
                    />
                    <span className="text-sm text-gray-500">/kWh</span>
                  </div>
                </label>
                <div>
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Retrofit rate
                  </span>
                  <div className="flex min-h-[44px] items-center rounded-md border border-gray-200 bg-gray-50 px-3">
                    <span className="font-semibold text-gray-900">
                      Rs {PER_CFM_RATE}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">/CFM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 px-4 py-8">
          <div className="container mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                <Gauge className="h-4 w-4 text-primary" />
                Project ROI
              </div>
              <p className="font-mono text-3xl font-bold text-gray-900">
                {formatPayback(projectPaybackMonths)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                <IndianRupee className="h-4 w-4 text-accent" />
                Monthly savings
              </div>
              <p className="font-mono text-3xl font-bold text-gray-900">
                {formatCurrency(project.monthlySavings)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                <Zap className="h-4 w-4 text-emerald-700" />
                Energy savings
              </div>
              <p className="font-mono text-3xl font-bold text-gray-900">
                {percentFormatter.format(projectSavingsPct)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="mb-3 text-sm font-medium text-gray-500">
                Project capex
              </div>
              <p className="font-mono text-3xl font-bold text-gray-900">
                {formatCurrency(project.capex)}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  AHU schedule
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter duct static pressure in Pa. Use 50 Hz when there is no
                  VFD derating.
                </p>
              </div>
              <button
                type="button"
                onClick={addRow}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                Add AHU
              </button>
            </div>

            <div
              className="overflow-x-auto rounded-lg border border-gray-200"
              role="region"
              aria-label="AHU ROI calculator table"
              tabIndex={0}
            >
              <table className="w-full min-w-[1280px] text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                    <th className="w-[9rem] px-3 py-3 font-semibold">AHU</th>
                    <th className="w-[8rem] px-3 py-3 font-semibold">
                      Design CFM
                    </th>
                    <th className="w-[9rem] px-3 py-3 font-semibold">
                      Monthly hours
                    </th>
                    <th className="w-[9rem] px-3 py-3 font-semibold">
                      Nameplate kW
                    </th>
                    <th className="w-[8rem] px-3 py-3 font-semibold">
                      VFD Hz
                    </th>
                    <th className="w-[8rem] px-3 py-3 font-semibold">
                      Static Pa
                    </th>
                    <th className="px-3 py-3 font-semibold">Fan mix</th>
                    <th className="px-3 py-3 font-semibold">Curve CFM</th>
                    <th className="px-3 py-3 font-semibold">Baseline kW</th>
                    <th className="px-3 py-3 font-semibold">EC kW</th>
                    <th className="px-3 py-3 font-semibold">Capex</th>
                    <th className="px-3 py-3 font-semibold">Saving/mo</th>
                    <th className="px-3 py-3 font-semibold">ROI</th>
                    <th className="w-[3.5rem] px-3 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map((result) => (
                    <tr key={result.row.id}>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} name`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                          value={result.row.name}
                          onChange={(event) =>
                            updateRow(result.row.id, "name", event.target.value)
                          }
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} design CFM`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-right font-mono text-gray-900 outline-none transition-colors focus:border-primary"
                          inputMode="numeric"
                          min="0"
                          type="number"
                          value={result.row.designCfm}
                          onChange={(event) =>
                            updateRow(
                              result.row.id,
                              "designCfm",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} monthly run hours`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-right font-mono text-gray-900 outline-none transition-colors focus:border-primary"
                          inputMode="decimal"
                          min="0"
                          step="0.1"
                          type="number"
                          value={result.row.monthlyRunHours}
                          onChange={(event) =>
                            updateRow(
                              result.row.id,
                              "monthlyRunHours",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} existing motor nameplate kilowatt`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-right font-mono text-gray-900 outline-none transition-colors focus:border-primary"
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          type="number"
                          value={result.row.nameplateKw}
                          onChange={(event) =>
                            updateRow(
                              result.row.id,
                              "nameplateKw",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} VFD frequency in Hz`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-right font-mono text-gray-900 outline-none transition-colors focus:border-primary"
                          inputMode="decimal"
                          min="0"
                          step="0.1"
                          type="number"
                          value={result.row.vfdFrequency}
                          onChange={(event) =>
                            updateRow(
                              result.row.id,
                              "vfdFrequency",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-3">
                        <input
                          aria-label={`${result.row.name} duct static pressure in Pa`}
                          className="h-10 w-full rounded-md border border-gray-300 px-2 text-right font-mono text-gray-900 outline-none transition-colors focus:border-primary"
                          inputMode="decimal"
                          min="0"
                          step="1"
                          type="number"
                          value={result.row.staticPressure}
                          onChange={(event) =>
                            updateRow(
                              result.row.id,
                              "staticPressure",
                              event.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {getFanMixLabel(result.selection)}
                      </td>
                      <td className="px-3 py-3 font-mono text-gray-700">
                        {formatNumber(result.selection.installedCfm)}
                        {result.selection.overshootCfm > 0 && (
                          <span className="ml-1 text-xs text-gray-400">
                            +{formatNumber(result.selection.overshootCfm)}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 font-mono text-gray-700">
                        {formatDecimal(result.baselineKw)}
                      </td>
                      <td className="px-3 py-3 font-mono text-gray-700">
                        {formatDecimal(result.selection.totalKw)}
                      </td>
                      <td className="px-3 py-3 font-mono text-gray-700">
                        {formatCurrency(result.capex)}
                      </td>
                      <td
                        className={`px-3 py-3 font-mono font-semibold ${
                          result.monthlySavings >= 0
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(result.monthlySavings)}
                      </td>
                      <td className="px-3 py-3 font-mono font-semibold text-gray-900">
                        {formatPayback(result.paybackMonths)}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeRow(result.row.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={rows.length === 1}
                          aria-label={`Remove ${result.row.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-gray-300 bg-gray-50 font-semibold text-gray-900">
                  <tr>
                    <td className="px-3 py-3" colSpan={7}>
                      Project total
                    </td>
                    <td className="px-3 py-3 font-mono">
                      {formatNumber(project.installedCfm)}
                    </td>
                    <td className="px-3 py-3" />
                    <td className="px-3 py-3 font-mono">
                      {formatNumber(project.fanCount)} fans
                    </td>
                    <td className="px-3 py-3 font-mono">
                      {formatCurrency(project.capex)}
                    </td>
                    <td className="px-3 py-3 font-mono">
                      {formatCurrency(project.monthlySavings)}
                    </td>
                    <td className="px-3 py-3 font-mono">
                      {formatPayback(projectPaybackMonths)}
                    </td>
                    <td className="px-3 py-3" />
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="mb-1 text-sm font-medium text-gray-500">
                  Baseline monthly cost
                </p>
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {formatCurrency(project.baselineMonthlyCost)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="mb-1 text-sm font-medium text-gray-500">
                  EC fan monthly cost
                </p>
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {formatCurrency(project.ecMonthlyCost)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="mb-1 text-sm font-medium text-gray-500">
                  Annual savings
                </p>
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {formatCurrency(project.annualSavings)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Calculate;
