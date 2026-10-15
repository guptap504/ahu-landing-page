---
title: "EC Fans for Indian Data Centers: CRAH Retrofits, Fan Walls and What They Save"
description: CRAH and CRAC fans run every hour of the year, and every watt they draw ends up as heat the cooling plant must remove. How EC fan retrofits and fan walls cut that load in Indian data halls, what it is worth at PUE 1.3–1.4 and ₹10 per unit, and how to retrofit without risking uptime.
date: 2026-10-15
category: Data centers
author: Garvata Labs
keywords: [EC fan data center, CRAH EC fan retrofit, fan wall data center India, CRAC fan energy, data center cooling retrofit India, precision cooling EC fan]
---

> **Key points.** In an air-cooled data hall, CRAH and CRAC fans run 8,760 hours a year, and their power is paid for **twice**: once to drive the fan and again to remove the heat the fan adds to the room. Upgrading to EC fans and letting them slow down to match the IT load is one of the lowest-risk efficiency projects available. In our 1 MW example, a 30% cut in fan energy is worth about **₹13 lakh a year** at ₹10 per unit, before counting the cooling it avoids.

Liquid cooling gets the headlines, but most of India's operating data center capacity is still cooled by air, through CRAH units on chilled water, DX CRAC units, or fan walls. Every one of them depends on fans, and in older halls those fans are often AC motors running at or near full speed. This article covers the options for Indian operators: retrofitting existing units, specifying fan walls in new halls, and getting the savings without putting uptime at risk.

For the bigger picture of cooling energy in Indian facilities, see [Data Center Cooling Energy in India](/blog/data-center-cooling-energy-india).

## Why fans matter more than their size suggests

- **They never stop.** Precision cooling fans run all year, at every IT load.
- **Their energy becomes heat in the room.** A CRAH fan's power is released into the airstream it moves, so the chillers must remove it again. Saving fan energy also reduces cooling load.
- **They are often over-driven.** Fans are commonly set high enough to protect the hottest rack, so the rest of the room gets more air than it needs.
- **The cube law works in your favour.** At 80% speed a fan draws about half its full power. In a room with N+1 or N+2 units, running all units slower usually uses less energy than running fewer units faster.

The gains are well documented. Meta reported a **20% reduction in supply-fan energy** in a pilot region after applying AI to air-side control. Vendors now offer EC fan upgrades for precision cooling as a standard service: Vertiv India offers one for Liebert units, and Stulz India offers EC fan retrofits and CRAH replacement.

## Option 1: Retrofit EC fans into existing CRAH and CRAC units

Replacing the AC fan motors in existing precision units with EC fans is usually the quickest win:

- **No new cooling units.** Coils, valves and casings stay. Only the fan assemblies change.
- **Speed control built in.** The EC fan takes a speed command directly from the unit controller, the BMS or a supervisory controller.
- **Unit by unit.** With N+1 redundancy, one unit can be taken out of service, retrofitted and recommissioned while the others carry the load.
- **Data.** EC fans report their own speed, power and faults, which shows where airflow and energy go.

## Option 2: Fan walls for new halls and major refits

A **fan wall** places an array of EC plug fans across the air path of a large air handler or a dedicated cooling wall. For new halls or major refits:

- **Built-in redundancy.** One failed fan out of a dozen barely changes airflow, and the others speed up slightly to compensate.
- **Efficient part load.** Many smaller fans can turn down smoothly as IT load ramps up over months or years.
- **Made in India.** Fan walls are now built locally. Modine opened a Chennai plant for its AireWall fan wall in 2025, and FläktGroup opened a Pune plant in 2026 that makes fan walls, CRAH and CRAC units.

## What it is worth: a worked example

A 1 MW IT load in an air-cooled hall at PUE 1.4. Suppose CRAH fans draw 50 kW in total, or 5% of IT load. The real figure varies widely with design and airflow, so measure yours.

| | Value |
| --- | --- |
| Fan energy per year | 438 MWh |
| Fan cost per year at ₹10/unit | ₹43.8 lakh |
| Saving at 30% lower fan energy | 131 MWh, about ₹13.1 lakh a year |
| PUE improvement from fans alone | about 0.015 |
| CO₂ avoided per year | about 93 tonnes |

The saving is understated, because every kWh of fan energy saved is also a kWh of heat the chillers no longer have to remove. On a 20 MW campus, the same proportional saving is worth about **₹2.6 crore a year** from fans alone.

## Retrofitting without risking uptime

1. **Baseline first.** Meter fan power and log rack-inlet temperatures for at least two weeks before you change anything.
2. **Keep redundancy intact.** Retrofit one unit at a time, and never take more units out of service than your N+1 or N+2 design allows.
3. **Check harmonics.** Many EC drives on one distribution board can raise harmonic distortion. Ask suppliers for current-harmonic (THDi) figures and IEEE 519 compliance.
4. **Set limits before speeds.** Agree rack-inlet temperature and humidity limits, within ASHRAE's recommended 18–27 °C, before fans are allowed to slow down.
5. **Coordinate the units.** Slowing fans unit by unit, each on its own return-air loop, leaves savings on the table and can create hot spots. Supervisory control that runs every unit against rack-inlet conditions captures more, safely.

## Where Garvata fits

Garvata builds the fans and the control for this. **Garvata EC fans** (available now) are rated for −25 to +60 °C ambient and 380–480 V supply, designed to IEEE 519 harmonic limits, and report speed, temperature, power and vibration over Modbus. **Garvata Cooling OS** (in early access) coordinates every CRAC and CRAH as one system against rack-inlet conditions, through your BMS and with a safety check on every change. Our own precision cooling units, with EC fan arrays and the controller built in, are planned.

We cover the control side in [AI for Data Center Cooling](/blog/ai-data-center-cooling).

*[See the data center solution](/solutions/data-centers) or [ask about the pilot programme](/contact?from=data-centers).*

## Sources

1. Meta Engineering, "Simulator-based reinforcement learning for data center cooling optimization" (2024). [engineering.fb.com](https://engineering.fb.com/2024/09/10/data-center-engineering/simulator-based-reinforcement-learning-for-data-center-cooling-optimization/)
2. Vertiv India, Liebert EC fan upgrade service. [vertiv.com](https://www.vertiv.com/en-in/services-catalog/services/performance-optimization-services/liebert-ec-fan-upgrade-service/)
3. Stulz India, retrofitting services. [stulz.com](https://www.stulz.com/en-in/product-support/retrofitting/)
4. Modine, "Modine opens India facility to manufacture data center cooling equipment for APAC region" (August 2025). [modine.com](https://investors.modine.com/news/news-details/2025/Modine-Opens-India-Facility-to-Manufacture-Data-Center-Cooling-Equipment-for-APAC-Region/default.aspx)
5. Refindustry, "FläktGroup opens HVAC manufacturing facility in India" (2026). [refindustry.com](https://refindustry.com/news/flaktgroup-opens-hvac-manufacturing-facility-in-india/)
6. ASHRAE TC 9.9, *Thermal Guidelines for Data Processing Environments*, 5th edition reference card. [ashrae.org](https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf)
7. Central Electricity Authority, CO₂ Baseline Database v21.0 (December 2025). [cea.nic.in](https://cea.nic.in/wp-content/uploads/baseline/2025/12/User_Guide_V_21.0.pdf)
