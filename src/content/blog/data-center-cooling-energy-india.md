---
title: "Data Center Cooling Energy in India: Where It Goes and How to Cut It"
description: Cooling is the largest energy cost in a data center after the IT itself, and India's heat and humidity make it harder to control. A practical guide to where cooling energy goes, why so much is wasted, and the levers that bring it down.
date: 2026-10-15
category: Data centers
author: Garvata Labs
keywords: [data center cooling energy, data center cooling India, reduce PUE, CRAH fan energy, ASHRAE temperature setpoint, data center humidity]
---

> **Key points.** Cooling is the largest part of a data center's energy overhead: as much as **30–40%** of total energy in older chilled-water facilities, and most of the overhead even at a PUE of 1.3–1.4. Much of it goes to cooling that no server needs: setpoints held below ASHRAE's recommended **18–27 °C** range, fans running at fixed speed, and units working against each other. Because fan power falls with the **cube** of speed, small control changes can bring large savings.

In our [overview of data center electricity use](/blog/data-center-energy-consumption) we showed that every 0.1 of PUE on a 1 MW facility costs about ₹88 lakh a year at ₹10 per unit. Most of that overhead is cooling. This article looks inside it: where the energy goes, why so much is wasted, and what Indian operators can realistically do about it.

## Where cooling energy goes

Every watt a server draws becomes heat, and the cooling system has to move that heat out of the building. In a typical chilled-water data center that work is shared across five groups of equipment:

| Equipment | What it does | Why it uses energy |
| --- | --- | --- |
| Chillers | Remove heat from the chilled-water loop | Compressors do the thermodynamic work, the largest single cooling load |
| Cooling towers or dry coolers | Reject heat to outdoor air | Fans, and water in evaporative systems |
| Pumps | Circulate chilled and condenser water | Run continuously, often at fixed speed |
| CRAH and CRAC units | Push cooled air through the white space | Fans run 24/7, often near full speed |
| Humidifiers and reheat | Hold humidity within limits | Add moisture or reheat air that was just cooled |

Studies of older chilled-water facilities put cooling at 30–40% of total energy. Newer facilities do much better, but even at a PUE of 1.4 cooling is most of the 0.4 overhead.

## Why so much cooling energy is wasted

The equipment is rarely the main problem. The problem is how it is controlled. Four patterns show up in almost every legacy room:

**1. Control against the wrong signal.** Most precision cooling units modulate on return-air temperature at the unit. What matters is the inlet temperature at the server. To keep the worst-placed rack safe, operators lower the room setpoint and overcool everything else.

**2. Setpoints left at commissioning values.** ASHRAE's *Thermal Guidelines* recommend server inlet temperatures of **18–27 °C**. Many rooms still supply air well below the top of that range, because that was the commissioning value and nobody wants to be the person who changed it. The US government's Energy Star programme estimates that each 1 °F (about 0.55 °C) increase in server inlet temperature cuts energy costs by 4–5%. Higher temperatures also let chillers work more efficiently: a common rule of thumb is a 2–3% better chiller COP for every 1 °C rise in evaporator temperature.

**3. Fixed-speed or poorly modulated fans.** Fan power follows the affinity laws: airflow scales with speed, but power scales with speed **cubed**. A fan at 80% speed draws only about 51% of full power, and at 60% speed about 22%. A room where every CRAH fan runs at 100% to cover a few hot racks pays a heavy premium.

**4. Units that fight each other.** Each CRAC or CRAH runs its own local control loop. One unit humidifies while its neighbour dehumidifies. One reheats air that another has just cooled. Each loop looks stable on its own, but together they waste energy.

## Why India makes it harder

Cooling strategies developed for Northern Europe or the US Pacific Northwest don't transfer directly to Mumbai or Chennai.

- **High ambient temperatures** shorten the hours when economisers (free cooling with outside air or water) can carry the load, so chillers run more of the year.
- **Monsoon humidity** pushes dew points high for months at a time. Holding the room within ASHRAE's moisture limits takes more dehumidification energy, and static humidity setpoints tend to make units fight each other.
- **Daily and seasonal swings** mean a setpoint tuned for a February night is wrong for a May afternoon. Rules tuned once at commissioning can't follow the weather.

Low PUE is still achievable in India. Infosys has reported an average of 1.37 at its Bangalore campus using evaporative cooling. But it takes deliberate design and active control. Government tenders that require a PUE of 1.35 or better have drawn industry comment that the target is hard to meet in Indian conditions without those measures.

## The rise of AI racks doesn't make air cooling obsolete

High-density AI racks are pushing the industry towards liquid cooling. Uptime Institute's 2026 survey found more operators reporting racks above 30 kW. But for most Indian enterprise and colocation halls, air is still the medium that removes most of the heat. Even in liquid-cooled deployments, a share of the heat (from memory, storage, power supplies and networking) still needs air. Getting air-side cooling right remains the biggest near-term lever for most operators.

## Levers that cut cooling energy, in order of effort

| Lever | What it involves | Typical effort |
| --- | --- | --- |
| Measure at the rack | Rack-inlet temperature sensors and separate cooling metering | Low |
| Airflow management | Blanking panels, sealed cable cut-outs, aisle containment | Low to medium |
| Raise setpoints | Move supply air towards ASHRAE's 18–27 °C envelope, step by step | Low, once rack inlets are monitored |
| Variable-speed fans | Retrofit fixed-speed fans in CRAH and CRAC units with EC fans | Medium |
| Coordinated control | Supervisory control that runs all units as one system | Medium, mostly software |

Each lever makes the next one more effective. Containment makes it safe to raise setpoints. Rack-level sensing tells you how far you can go. Variable-speed fans turn lower airflow demand into real savings, because of the cube law (see [EC Fans for Indian Data Centers](/blog/ec-fans-data-centers-india)). And coordinated control keeps all of it optimised as load and weather change, instead of drifting back to conservative values after the commissioning engineer leaves.

That last step is where AI is starting to make a measurable difference. We look at how it works, and what published deployments have achieved, in [AI for Data Center Cooling: How It Works and What It Saves](/blog/ai-data-center-cooling).

*Garvata builds both halves of this: EC fans that modulate efficiently, and Cooling OS, supervisory control that runs CRAC and CRAH units as one system (now in early access). [See the data center solution](/solutions/data-centers).*

## Sources

1. ASHRAE TC 9.9, *Thermal Guidelines for Data Processing Environments*, 5th edition reference card. [ashrae.org](https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf)
2. Energy Star, "Raise the temperature" guidance for data centers. [energystar.gov](https://www.energystar.gov/products/raise_temperature)
3. Netherlands Enterprise Agency (RVO), chiller evaporator temperature measure. [rvo.nl](https://www.rvo.nl/energiemaatregelen/ph1)
4. Iyengar and Schmidt, "Energy consumption of information technology data centers", *Electronics Cooling*. [electronics-cooling.com](https://www.electronics-cooling.com/2010/12/energy-consumption-of-information-technology-data-centers/)
5. Uptime Institute 2026 survey findings, as reported by Data Center Knowledge. [datacenterknowledge.com](https://www.datacenterknowledge.com/ai-data-centers/ai-drives-data-center-uncertainty-in-uptime-s-2026-survey)
6. CII / IGBC, Infosys data center case study (2021). [igbc.in](https://www.igbc.in/frontend-assets/html_pdfs/Infosys%20case%20study%20092020_Final_CII-28Jan2021.pdf)
7. W.Media, on PUE requirements in Indian government tenders. [w.media](https://w.media/?p=28430)
