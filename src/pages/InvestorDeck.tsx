import { SLIDE_HEIGHT, SLIDE_WIDTH, SlideView } from "@/components/deck/slides";
import { buildSteps, type DeckContent } from "@/content/investorDeck";
import { usePageMeta } from "@/lib/usePageMeta";
import { ChevronLeft, ChevronRight, Download, LayoutGrid, Maximize, Minimize, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

// Unlisted, passcode-protected investor deck for presenting from the site.
// Nothing links here and the slide content is fetched from the
// investor-deck function, so it never ships in the public bundle.

const PASSCODE_KEY = "garvata-investor-passcode";

const readStored = () => {
  try {
    return sessionStorage.getItem(PASSCODE_KEY);
  } catch {
    return null;
  }
};
const store = (value: string | null) => {
  try {
    if (value) sessionStorage.setItem(PASSCODE_KEY, value);
    else sessionStorage.removeItem(PASSCODE_KEY);
  } catch {
    // Private mode: the passcode is just asked for again on reload.
  }
};

async function fetchDeck(passcode: string): Promise<DeckContent | "denied"> {
  const response = await fetch("/.netlify/functions/investor-deck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passcode }),
  });
  if (response.status === 401) return "denied";
  if (!response.ok) throw new Error(`Deck request failed (${response.status})`);
  return response.json();
}

// Keeps search engines away while this page is open; the server also sends
// X-Robots-Tag for /investors (netlify.toml).
function useNoIndex() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute("content");
    meta?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (previous) meta?.setAttribute("content", previous);
    };
  }, []);
}

// Each slide prints as one 1280×720 page, so "Save as PDF" gives the deck.
function usePrintPageSize() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@media print { @page { size: ${SLIDE_WIDTH}px ${SLIDE_HEIGHT}px; margin: 0; } html, body { background: #071827; } }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}

function Gate({ onUnlock }: { onUnlock: (deck: DeckContent, passcode: string) => void }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!passcode.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await fetchDeck(passcode.trim());
      if (result === "denied") setError("That passcode isn't right.");
      else onUnlock(result, passcode.trim());
    } catch {
      setError("Couldn't load the deck. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4 font-sans">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-navy-800 p-8"
      >
        <div className="flex items-center gap-2.5 text-white">
          <img src="/logo192.svg" alt="" className="h-8 w-8" />
          <span className="font-serif text-lg font-bold">Garvata Labs</span>
        </div>
        <h1 className="mt-8 font-serif text-3xl font-semibold text-white">Investor presentation</h1>
        <p className="mt-2 text-sm text-slate-400">Enter the passcode you were given.</p>
        <label htmlFor="passcode" className="mt-6 block text-sm font-medium text-slate-300">
          Passcode
        </label>
        <input
          id="passcode"
          type="password"
          autoComplete="off"
          autoFocus
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-navy px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-amber-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 min-h-[48px] w-full rounded-full bg-cyan-400 font-semibold text-navy transition-colors hover:bg-cyan-300 disabled:opacity-60"
        >
          {busy ? "Opening…" : "Open deck"}
        </button>
      </form>
    </main>
  );
}

// "#5" opens slide 5 fully built; "#5.0" opens it at its first build.
const fromHash = (total: number) => {
  const [slide, build] = window.location.hash.slice(1).split(".");
  const n = Number.parseInt(slide, 10);
  const index = Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), total - 1) : 0;
  const step = Number.parseInt(build ?? "", 10);
  return { index, step: Number.isFinite(step) ? step : undefined };
};

function Presenter({ deck }: { deck: DeckContent }) {
  const total = deck.slides.length;
  const [index, setIndex] = useState(() => fromHash(total).index);
  // Build step within the current slide; opening a slide by number shows it
  // fully built, stepping forward into it starts from its first build.
  const lastStep = (i: number) => buildSteps(deck.slides[i]) - 1;
  const [step, setStep] = useState(() => {
    const start = fromHash(total);
    return Math.min(start.step ?? Infinity, lastStep(start.index));
  });
  const [scale, setScale] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [overview, setOverview] = useState(false);
  // Slides slide in from the side you're moving towards.
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStart = useRef<number | null>(null);

  const go = (target: number, at: "start" | "end" = "end") => {
    const clamped = Math.min(Math.max(target, 0), total - 1);
    setStep(at === "start" ? 0 : lastStep(clamped));
    if (clamped === index) return;
    setDirection(clamped > index ? "next" : "prev");
    setIndex(clamped);
  };
  // Next plays the slide's next build, then moves on; back undoes a build.
  const next = () => {
    if (step < lastStep(index)) setStep(step + 1);
    else if (index < total - 1) go(index + 1, "start");
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
    else if (index > 0) go(index - 1, "end");
  };
  const atStart = index === 0 && step === 0;
  const atEnd = index === total - 1 && step === lastStep(index);

  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / SLIDE_WIDTH, window.innerHeight / SLIDE_HEIGHT));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "g" || event.key === "G") {
        setOverview((open) => !open);
        event.preventDefault();
        return;
      }
      if (overview) {
        if (event.key === "Escape") setOverview(false);
        return;
      }
      // Let focused controls handle their own Space and Enter.
      if ((event.target as HTMLElement).closest("button, a, input")) return;
      if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) next();
      else if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) prev();
      else if (event.key === "Home") go(0);
      else if (event.key === "End") go(total - 1);
      else if (event.key === "f" || event.key === "F") toggleFullscreen();
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Fade the controls out while presenting; any movement brings them back.
  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), 2500);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 2500);
    };
    window.addEventListener("mousemove", wake);
    window.addEventListener("touchstart", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("touchstart", wake);
    };
  }, []);

  const button =
    "flex h-11 w-11 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30";

  return (
    <>
      <main
        className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#03101b] print:hidden"
        onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const dx = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          touchStart.current = null;
        }}
      >
        <h1 className="sr-only">{deck.title}</h1>
        <div
          className="fixed left-0 top-0 h-[3px] bg-cyan-400 transition-[width] duration-500 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
          aria-hidden="true"
        />
        <div
          style={{ width: SLIDE_WIDTH * scale, height: SLIDE_HEIGHT * scale }}
          className="relative overflow-hidden bg-navy"
          aria-live="polite"
        >
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <div key={index} className={direction === "next" ? "deck-enter-next" : "deck-enter-prev"}>
              <SlideView
                slide={deck.slides[index]}
                footer={deck.footer}
                index={index}
                total={total}
                step={step}
              />
            </div>
          </div>
        </div>

        <nav
          aria-label="Slide controls"
          className={`fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-navy-800/95 px-2 py-1 transition-opacity duration-300 ${idle ? "opacity-0 focus-within:opacity-100 hover:opacity-100" : "opacity-100"}`}
        >
          <button type="button" className={button} onClick={prev} disabled={atStart} aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[4.5rem] text-center font-mono text-sm text-slate-300">
            {index + 1} / {total}
          </span>
          <button type="button" className={button} onClick={next} disabled={atEnd} aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
          <span className="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />
          <button
            type="button"
            className={button}
            onClick={() => setOverview(true)}
            aria-label="All slides"
            title="All slides (G)"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={button}
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Full screen"}
            title="Full screen (F)"
          >
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="ml-1 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-cyan-400 px-4 text-sm font-semibold text-navy transition-colors hover:bg-cyan-300"
            title="Opens the print dialog — choose “Save as PDF”"
          >
            <Download className="h-4 w-4" />
            PDF
          </button>
        </nav>
      </main>

      {overview && (
        <Overview
          deck={deck}
          current={index}
          onPick={(i) => {
            go(i);
            setOverview(false);
          }}
          onClose={() => setOverview(false)}
        />
      )}

      {/* Every slide, one per printed page, for "Save as PDF". */}
      <div className="deck-print hidden print:block">
        {deck.slides.map((slide, i) => (
          <div key={i} className="deck-print-page">
            <SlideView slide={slide} footer={deck.footer} index={i} total={total} />
          </div>
        ))}
      </div>
    </>
  );
}

const THUMB_SCALE = 0.2;

// Every slide as a thumbnail, for jumping around during questions.
function Overview({
  deck,
  current,
  onPick,
  onClose,
}: {
  deck: DeckContent;
  current: number;
  onPick: (index: number) => void;
  onClose: () => void;
}) {
  const currentRef = useRef<HTMLButtonElement>(null);
  useEffect(() => currentRef.current?.focus(), []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All slides"
      className="fixed inset-0 z-50 overflow-y-auto bg-navy px-6 py-8 print:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-cyan-400">
          All slides
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <ol className="mx-auto mt-6 grid max-w-6xl grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-6">
        {deck.slides.map((slide, i) => (
          <li key={i} className="flex flex-col items-center gap-2">
            <button
              ref={i === current ? currentRef : undefined}
              type="button"
              onClick={() => onPick(i)}
              aria-current={i === current ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
              className={`overflow-hidden rounded-lg border-2 transition-colors ${i === current ? "border-cyan-400" : "border-white/10 hover:border-white/40"}`}
              style={{ width: SLIDE_WIDTH * THUMB_SCALE + 4, height: SLIDE_HEIGHT * THUMB_SCALE + 4 }}
            >
              <div
                className="pointer-events-none text-left"
                style={{ transform: `scale(${THUMB_SCALE})`, transformOrigin: "top left" }}
                aria-hidden="true"
              >
                <SlideView slide={slide} footer={deck.footer} index={i} total={deck.slides.length} />
              </div>
            </button>
            <span className="font-mono text-xs text-slate-400">{i + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else document.documentElement.requestFullscreen?.().catch(() => {});
}

const InvestorDeck = () => {
  usePageMeta(
    "Investor Presentation",
    "Garvata Labs investor presentation.",
    "/investors",
  );
  useNoIndex();
  usePrintPageSize();
  const [deck, setDeck] = useState<DeckContent | null>(null);
  const [checking, setChecking] = useState(() => Boolean(readStored()));

  // Reopen without asking again in the same tab.
  useEffect(() => {
    const saved = readStored();
    if (!saved) return;
    fetchDeck(saved)
      .then((result) => {
        if (result === "denied") store(null);
        else setDeck(result);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (deck) return <Presenter deck={deck} />;
  if (checking) return <main className="min-h-screen bg-navy" />;
  return (
    <Gate
      onUnlock={(loaded, passcode) => {
        store(passcode);
        setDeck(loaded);
      }}
    />
  );
};

export default InvestorDeck;
