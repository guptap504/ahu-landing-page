---
title: "How Much Electricity Do Data Centers Use? (2026 Guide)"
description: Data centers used about 415 TWh in 2024 and are on track to double by 2030. Here is where that energy goes, what is driving the growth, what it means for India, and what one point of PUE costs in rupees.
date: 2026-10-15
category: Data centers
author: Garvata Labs
keywords: [data center energy consumption, data center electricity use, data center power demand India, PUE, AI data center energy]
---

> **The short answer.** Data centers used roughly **415 TWh** of electricity in 2024, about **1.5%** of global demand. The International Energy Agency expects that to more than double to around **945 TWh by 2030**, with AI the main driver. India's data centers used an estimated **13 TWh** in 2024; projections for 2030 range from **40 to 57 TWh**.

Data centers have gone from a rounding error in national energy statistics to one of the fastest-growing loads on the grid. For anyone who runs, finances or buys capacity in one, the question is no longer whether energy matters but how much of it is avoidable. This guide sets out the numbers, explains where the electricity goes inside a facility, and puts a rupee value on the part you can control.

## Global data center electricity use

The most widely cited baseline comes from the IEA's *Energy and AI* report (April 2025):

- **2024:** about 415 TWh, or roughly 1.5% of the world's electricity. The United States accounted for 45% of that, China 25% and Europe 15%.
- **2030:** about 945 TWh in the IEA's base case, slightly more than Japan's entire electricity consumption today.
- **AI-optimised data centers** are expected to more than quadruple their electricity demand over the same period.

Growth has not slowed since. In April 2026 the IEA reported that data center electricity demand rose **17% in 2025**, against about 3% for electricity demand as a whole.

National studies point the same way. Lawrence Berkeley National Laboratory estimates US data centers used **176 TWh in 2023 (4.4% of US electricity)** and could reach **325–580 TWh by 2028**, or 6.7–12% of national demand. Goldman Sachs projects global data center power demand to rise **165% by 2030** compared with 2023.

## What is driving the growth

Three things are compounding:

1. **AI training and inference.** McKinsey estimates that global demand for data center capacity could almost triple by 2030, with about 70% of that demand coming from AI workloads.
2. **Denser racks.** Uptime Institute's 2026 survey found the most common rack density has risen to 11 kW, from 9 kW a year earlier, and more operators now report racks above 30 kW. Every kilowatt of IT load in a rack is a kilowatt of heat that has to be removed.
3. **Cloud and digital services.** Payments, streaming, enterprise SaaS and government services keep growing underneath the AI headlines, especially in fast-digitising economies like India.

## India: capacity, power and where it is being built

India is one of the fastest-growing data center markets in the world, although estimates vary with how each firm defines capacity:

| Source | Operational capacity | Outlook |
| --- | --- | --- |
| JLL (June 2026) | ~1.6 GW | ~6 GW by 2029 |
| CBRE (H1 2026) | ~1.75 GW | ~130 MW added in H1 2026 |
| Savills (H1 2026) | ~1.8 GW IT stock | 258 MW added in H1 2026 |
| Colliers (April 2025) | 1,263 MW, top 7 cities | 4,500+ MW by 2030 |

Mumbai holds the largest share of operating capacity, more than 40%, followed by Chennai and Delhi-NCR. JLL puts Mumbai, Hyderabad, Visakhapatnam and Chennai at the head of the 4.4 GW development pipeline.

Electricity use is rising with it. S&P Global estimates Indian data centers consumed about **13 TWh in 2024** and could reach **57 TWh by 2030**, about 2.6% of India's generation, up from 0.84%. Other estimates put 2030 closer to 40–50 TWh. Either way, it is roughly a fourfold increase in six years.

On policy, data centers were granted infrastructure status in 2022, and several states offer incentives. Tamil Nadu's 2021 policy, for example, exempts data centers from electricity tax for five years. A national data center policy has been in draft since 2020 and has not yet been notified.

## Where the electricity goes inside a data center

A data center's electricity splits into two parts:

- **IT load**: servers, storage and network equipment. This is the useful work.
- **Overhead**: everything needed to keep the IT running. Cooling is by far the largest part, followed by power conversion losses (UPS, transformers) and lighting.

The industry measures this with **Power Usage Effectiveness (PUE)**: total facility energy divided by IT energy. A PUE of 1.4 means that for every 1 kWh delivered to IT, another 0.4 kWh goes to overhead.

Uptime Institute's 2026 global survey puts the **average PUE at 1.52**, essentially flat for six years. The capacity-weighted average is lower, at 1.36, because large new facilities run more efficiently than older, smaller ones. Cooling is the largest part of the overhead. Studies of older chilled-water facilities measured it at **30–40% of total energy**. Even in an efficient facility at PUE 1.3–1.4, cooling makes up most of the overhead, which makes it the biggest lever outside the IT equipment itself.

India has no authoritative national PUE average. Published operator figures range from about 1.35 to 1.6, and newer colocation facilities typically design for 1.3–1.4, the range we use in the examples on this blog. Holding a low PUE is harder here than in temperate climates: high ambient temperatures and monsoon humidity limit the hours when outside air can do the cooling for free. We cover this in detail in [Data Center Cooling Energy in India: Where It Goes and How to Cut It](/blog/data-center-cooling-energy-india).

## What one point of PUE costs

PUE is easy to report and easy to underestimate. Here is what it means in money for a modest 1 MW IT load running all year, at ₹10 per unit:

| | PUE 1.5 | PUE 1.4 | PUE 1.3 |
| --- | --- | --- | --- |
| IT energy (MWh/yr) | 8,760 | 8,760 | 8,760 |
| Overhead energy (MWh/yr) | 4,380 | 3,504 | 2,628 |
| Total energy (MWh/yr) | 13,140 | 12,264 | 11,388 |
| Total cost at ₹10/kWh | ₹13.1 crore | ₹12.3 crore | ₹11.4 crore |

Every **0.1 of PUE** on a 1 MW facility is about **876 MWh a year**, which is roughly **₹88 lakh** at ₹10 per unit and about **620 tonnes of CO₂** at India's grid average of 0.71 tCO₂/MWh (CEA, FY 2024-25). Scale that to a 20 MW campus and a 0.1 improvement is worth about ₹17.5 crore a year.

*Assumptions: constant 1 MW IT load, 8,760 hours, and ₹10 per unit (kWh) as a round figure for commercial supply. Your blended rate depends on the state, the contract and duties, so substitute your own.*

## What smarter cooling control could save

A rough sizing shows why cooling control matters at national scale. Assume a PUE of 1.4, with cooling making up about 0.3 of the 0.4 overhead. That puts cooling at about 21% of data center electricity, and published AI control results suggest 10–20% of it can be saved:

| | Data center electricity | Cooling at ~21% | Saving at 10–20% | Value at ₹10/unit |
| --- | --- | --- | --- | --- |
| World, 2024 | 415 TWh | ~89 TWh | 9–18 TWh | — |
| India, 2024 | 13 TWh | ~2.8 TWh | 0.28–0.56 TWh | ₹280–560 crore |
| India, 2030 | 57 TWh | ~12 TWh | 1.2–2.4 TWh | ₹1,200–2,400 crore |

The global figure, **9–18 TWh a year**, is comparable to everything India's data centers consumed in 2024. The estimate is conservative, because the global average PUE is closer to 1.5 than 1.4.

## What operators can do about it

The IT load is set by the business. The overhead is an engineering and operations choice, and most of it is cooling. In rough order of effort:

1. **Measure properly.** Meter IT and cooling separately, and monitor rack-inlet temperatures, not just return air.
2. **Manage airflow.** Seal gaps, use blanking panels and contain hot or cold aisles so cooled air reaches the servers instead of bypassing them.
3. **Raise setpoints within ASHRAE's recommended envelope.** ASHRAE recommends server inlet temperatures of 18–27 °C. Many rooms still run at the bottom of that range, paying for cooling no server needs.
4. **Use variable-speed fans.** Fan power falls with the cube of speed, so a fan at 80% speed draws only about half the power. EC fans make that modulation efficient and precise.
5. **Control the cooling as one system.** Most rooms are run by individual units on fixed rules, often working against each other. AI-based supervisory control coordinates them against live conditions, and published deployments report 10–30% lower cooling energy. We explain how in [AI for Data Center Cooling](/blog/ai-data-center-cooling).

Demand will keep rising, so the operators who do best will be the ones who stop wasting energy on cooling the IT doesn't need.

*Garvata Cooling OS, our supervisory control for data center cooling, is in early access. [See how it works](/solutions/data-centers) or [ask about the pilot programme](/contact?from=data-centers).*

## Sources

1. IEA, *Energy and AI*, executive summary (April 2025). [iea.org](https://www.iea.org/reports/energy-and-ai/executive-summary)
2. IEA, "Data centre electricity use surged in 2025" (April 2026). [iea.org](https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions)
3. US DOE / LBNL, *2024 United States Data Center Energy Usage Report* (December 2024). [energy.gov](https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers)
4. Goldman Sachs Research via American Public Power Association (2025). [publicpower.org](https://www.publicpower.org/periodical/article/ai-drive-165-increase-data-center-power-demand-2030-goldman-sachs)
5. McKinsey, "The cost of compute: a $7 trillion race to scale data centers" (2025). [mckinsey.com](https://www.mckinsey.com/industries/tmt/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers)
6. Uptime Institute, 2026 global survey findings on PUE and rack density. [uptimeinstitute.com](https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers), [datacenterknowledge.com](https://www.datacenterknowledge.com/ai-data-centers/ai-drives-data-center-uncertainty-in-uptime-s-2026-survey)
7. CBRE, *India Data Centre Market Monitor H1 2026*. [cbre.com.au](https://www.cbre.com.au/insights/figures/india-data-centre-market-monitor-h1-2026)
8. JLL India data center outlook (2026), as reported. [aurumproptech.in](https://www.aurumproptech.in/pulse/media/indias-data-centre-capacity-to-hit-6-gw-by-2029-jll)
9. Savills India data center report (H1 2026), as reported. [therealtytoday.com](https://therealtytoday.com/news/market-insights/indias-data-centre-infrastructure-reaches-18-gw-with-rising-global-investments-savills-india-report/)
10. Colliers India data center report (May 2025), as reported. [tele.net.in](https://tele.net.in/indias-data-centre-capacity-to-exceed-4500-mw-by-2030-says-colliers-report/)
11. S&P Global estimate of Indian data center power use, as reported. [knnindia.co.in](https://knnindia.co.in/news/newsdetails/sectors/energy/power-consumption-by-data-centers-to-quadruple-from-13-to-57-twh-by-2030)
12. Central Electricity Authority, CO₂ Baseline Database v21.0 (December 2025). [cea.nic.in](https://cea.nic.in/wp-content/uploads/baseline/2025/12/User_Guide_V_21.0.pdf)
13. ASHRAE TC 9.9, *Thermal Guidelines for Data Processing Environments*, 5th edition reference card. [ashrae.org](https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf)
14. Iyengar and Schmidt, "Energy consumption of information technology data centers", *Electronics Cooling*. [electronics-cooling.com](https://www.electronics-cooling.com/2010/12/energy-consumption-of-information-technology-data-centers/)
