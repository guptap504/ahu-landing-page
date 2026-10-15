---
title: "EC Fan Retrofit for AHUs in India: Cost, Savings and Payback"
description: How much does replacing a belt-driven AHU fan with an EC plug fan save at ₹10 per unit, and how fast does it pay back? A worked example for Indian IT parks, hospitals and plants, the factors that move the numbers, and how to estimate your own.
date: 2026-10-15
category: EC fans
author: Garvata Labs
keywords: [EC fan retrofit, AHU retrofit India, AHU energy saving, EC fan payback, AHU fan replacement cost, EC fan savings calculator]
---

> **Key points.** Replacing a belt-driven AHU fan with an EC plug fan saves energy twice: once from the more efficient motor, impeller and drive, and again when the fan's speed follows the real load. In our worked example for a 24x7 AHU at ₹10 per unit, the swap alone saves about **₹1.6 lakh a year**, and the swap plus demand-based control about **₹2.7 lakh a year**. That means each **₹1 lakh** of installed cost pays back in roughly **4–8 months**.

An EC fan retrofit is one of the few energy projects that a facility head can scope, cost and justify in a few weeks, with no change to the building and little downtime. This article walks through the economics for Indian sites, using numbers you can check against your own meters.

If you are still choosing between technologies, read [EC vs AC Fans for AHUs: An Indian Buyer's Guide](/blog/ec-vs-ac-fans-ahu-india) first.

## Where the savings come from

**1. The swap: efficiency at the same airflow.** The new fan delivers the same air for less power. It removes belt and pulley losses, replaces an induction motor with an IE5-equivalent EC motor, and usually replaces a forward-curved blower with a more efficient backward-curved plug impeller. Fan makers report savings of roughly **25–50%** from this step on belt-driven units. ebm-papst, for example, quotes up to 50%, and a third-party-measured retrofit of 70 AHUs in Singapore delivered 25%. In India, Capgemini replaced more than 1,000 fans across eight campuses, in AHUs, cooling towers and precision air conditioners, and reported about 30% lower fan energy.

**2. The control: running only as fast as the load needs.** Because fan power falls with the cube of speed, letting the fan slow down when temperature, humidity, CO₂ or pressure allow saves far more than the motor upgrade alone. This needs something to set the speed: the BMS, a controller or AI control.

## A worked example at ₹10 per unit

One AHU in an IT park or hospital, running 24x7. The existing belt-driven fan draws 6 kW at its fixed speed.

| | Existing belt-driven fan | EC fan, swap only | EC fan with demand-based control |
| --- | --- | --- | --- |
| Average input power | 6.0 kW | 4.2 kW | 2.9 kW |
| Energy per year | 52,560 kWh | 36,790 kWh | 25,750 kWh |
| Cost per year at ₹10/unit | ₹5.26 lakh | ₹3.68 lakh | ₹2.58 lakh |
| Saving per year | — | ₹1.58 lakh (30%) | ₹2.68 lakh (51%) |
| Payback per ₹1 lakh of installed cost | — | about 7.6 months | about 4.5 months |
| CO₂ avoided per year | — | 11 tonnes | 19 tonnes |

*Assumptions: 8,760 operating hours; a 30% saving from the swap, at the lower end of published retrofit results; with control, average fan power a further 30% lower, which is more conservative than the cube law gives for an average speed of 85%; CEA grid emission factor of 0.71 tCO₂/MWh.*

**For a 12-hour office AHU,** halve the savings and double the payback: about ₹79,000 a year from the swap and ₹1.34 lakh a year with control, or 9–15 months per ₹1 lakh of installed cost.

Results are not guaranteed to be this quick. A Hong Kong commercial building retrofit published by the Hong Kong Green Building Council took 11 years to pay back, while others report under two years. Payback depends on running hours, how inefficient the old fan was, and what the project included beyond the fans.

Installed cost depends on fan size, the number of fans per AHU, mounting changes and controls. We quote it per AHU after a site survey. The table lets you test any quote: multiply the installed cost in lakhs by the months-per-lakh figure.

## What moves the numbers

- **Running hours.** Savings scale directly with hours. Data centers, pharma plants, hospitals and 24x7 IT parks see the fastest payback.
- **Condition of the existing fan.** Worn belts, misaligned pulleys and oversized motors mean bigger savings. A recently installed direct-drive fan with a VFD leaves less to gain.
- **How much the load varies.** Comfort AHUs with changing occupancy have plenty of room to slow down. Pharma cleanroom AHUs that must hold air-change rates and pressure cascades have less, but still gain from the more efficient fan and, where validated, from reduced airflow outside production hours.
- **Static pressure.** In systems with high fixed pressure, such as long ducts and HEPA filters, the savings from slowing the fan are smaller than the ideal cube law.
- **Your tariff.** At ₹12 per unit the savings rise by 20%. If the time-of-day tariff penalises peak hours, savings are worth more when the AHU runs through the afternoon.

## Benefits beyond the meter

- **No belts.** Nothing to tension, replace or align, and no belt dust in the airstream.
- **Redundancy.** Large AHUs can use an array of smaller EC fans, so one failure no longer takes the whole unit down.
- **Visibility.** EC fans report their own speed, power and faults. With monitoring, problems show up as trends before they cause downtime.
- **Lower noise** at reduced speed, which matters in offices and hospitals.

## How to estimate your own savings

1. **Measure input power** on each AHU fan with a clamp meter or the panel meter, at normal running.
2. **Record running hours** per day, and whether the AHU runs at the same speed throughout.
3. **Note the duty:** design airflow (CFM or m³/h) and static pressure from the AHU schedule or nameplate.
4. **Run the numbers** using the worked example above: fan kW × hours × ₹ per unit gives today's cost, and 30–50% of it is the range to expect.

Or send us the schedule and we will validate the fan selection, check site conditions and confirm the numbers for your building.

*Garvata EC fans and GarvataAI AHU Control are available now. [See the commercial solution](/solutions/commercial) or [talk to us about your AHUs](/contact?from=commercial).*

## Sources

1. ebm-papst, AHU fan retrofit programme (belt-driven to EC, up to 50%). [ebmpapst.com](https://www.ebmpapst.com/ae/en/campaigns/industry-campaigns/ahu-fan.html)
2. ebm-papst, "AHU retrofit in financial hub Singapore" (70 AHUs, 25% measured saving). [ebmpapst.com](https://www.ebmpapst.com/sg/en/newsroom/projects/ahu-retrofit-in-financial-hub-singapore.html)
3. Ziehl-Abegg, "Best practice: retrofit" (belt-driven to direct-drive EC). [ziehl-abegg.com](https://fanpost.ziehl-abegg.com/en/detail/best-practice-retrofit-by-ziehl-abegg)
4. ebm-papst, "Achieving climate targets with EC fans and an energy command center" (Capgemini India, 2025). [ebmpapst.com](https://www.ebmpapst.com/at/en/newsroom/news/2025/achieving-climate-targets-with-ec-fans-and-energy-command-center.html)
5. Hong Kong Green Building Council, retrofit showcase: Two Pacific Place. [hkgbc.org.hk](https://retrofit.hkgbc.org.hk/showcasesd.php?serial=10)
6. Cooling Post, "EC fan retrofits bring big rewards". [coolingpost.com](https://www.coolingpost.com/features/ec-fan-retrofits-bring-big-rewards/)
7. Central Electricity Authority, CO₂ Baseline Database v21.0 (December 2025). [cea.nic.in](https://cea.nic.in/wp-content/uploads/baseline/2025/12/User_Guide_V_21.0.pdf)
