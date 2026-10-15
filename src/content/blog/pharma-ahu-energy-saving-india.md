---
title: "Pharma AHU Energy in India: How to Save Power Without Risking GMP"
description: HVAC is the largest energy load in most pharma plants, and revised Schedule M has many Indian manufacturers upgrading it now. Where AHU energy can be saved without touching validated conditions, where it needs a risk assessment first, and how to plan an EC fan retrofit through change control.
date: 2026-10-15
category: Pharma
author: Garvata Labs
keywords: [pharma HVAC energy saving, cleanroom AHU energy, Schedule M HVAC, pharma AHU India, GMP HVAC energy efficiency, cleanroom EC fan]
---

> **Key points.** HVAC uses **36–67%** of a pharmaceutical facility's energy, mostly in AHUs that run 24x7 to hold air changes and pressure cascades. Three kinds of saving carry little or no GMP risk: **more efficient fans at the same airflow**, **constant-airflow control** that stops fans over-delivering when filters are clean, and **better monitoring**. Reducing airflow outside production hours can save more, but WHO GMP says it needs to be **justified, proven and documented** first.

Indian pharma manufacturers spent the last two years upgrading facilities for the revised Schedule M. The Ministry of Health notified it in December 2023 to bring Indian GMP in line with WHO standards, and gave smaller manufacturers until 31 December 2025 to comply. Many of those upgrades involved HVAC. For plants that have upgraded, and those still planning, this is the right moment to make sure AHU energy is not paying for inefficiency that GMP doesn't require.

## Why pharma AHUs use so much energy

- **High air-change rates.** Cleanrooms need many more air changes per hour than offices. ISPE notes ISO 8 areas are now often designed at 10–20 air changes an hour, down from 20–30, and ISO 7 areas at 30–65.
- **HEPA filtration.** Terminal HEPA filters add significant static pressure, so the fans work harder for every cubic metre of air.
- **Pressure cascades.** Supply and exhaust must stay balanced to hold differential pressures between rooms, often with dedicated AHUs per zone.
- **Around-the-clock running.** Many cleanroom AHUs never switch off, even when production stops.

ISPE puts HVAC at **36–67% of total facility energy** in pharmaceutical plants, and cleanrooms can use many times the energy per square metre of an office.

## Savings with little or no GMP risk

**1. More efficient fans at the same airflow.** Replacing a belt-driven blower with EC plug fans delivers the **same validated airflow** for less power. Air changes, pressures and filtration don't change; only the fan is more efficient. Published retrofit savings for belt-driven to EC conversions range from about 25% to 50%. In pharma, where airflow is fixed, expect the lower end.

**2. Constant-airflow control as filters load.** A fixed-speed fan is sized to deliver design airflow with **dirty** filters at the end of their life. With clean filters, it delivers more air than designed and uses more power to do it. A variable-speed EC fan controlled to hold **design airflow or duct pressure** stays at the validated value as filters load, saving energy in the early part of each filter cycle and preventing the drift in air-change rates that a fixed-speed fan allows.

**3. Monitoring that supports compliance.** EC fans report their own speed, power, temperature and faults. Combined with differential pressure, temperature and humidity sensors, that gives continuous evidence that rooms stayed within limits, and early warning of a failing fan before it causes an excursion.

## Savings that need a risk assessment first

**Reducing airflow outside production hours.** Many plants could cut fan energy sharply overnight and at weekends. WHO's GMP guidance on HVAC (TRS 1010, Annex 8) says that switching AHUs off or reducing airflow when areas are not in use **should be avoided unless it is justified, proven and documented**. That means a risk assessment, a defined reduced mode that still holds pressure cascades, validated recovery to operational conditions before production restarts, and monitoring throughout.

**Reviewing air-change rates.** Neither Schedule M nor WHO GMP sets a fixed number of air changes. Many designs use conventions like "20 air changes" rather than what the room needs to meet its cleanliness classification. ISPE has published cases where air-change rates were reduced during operation, with particle counts confirming the room stayed in specification. This is a bigger change that belongs in your validation and QA process, but the potential savings are large.

## A worked example at ₹10 per unit

One cleanroom AHU with an 11 kW belt-driven fan, running 24x7 at fixed design airflow:

| | Per AHU | Plant with 30 AHUs |
| --- | --- | --- |
| Fan energy per year | 96,360 kWh | 2,891 MWh |
| Fan cost per year at ₹10/unit | ₹9.6 lakh | ₹2.9 crore |
| Saving at 25% (EC fans, same airflow) | ₹2.4 lakh | ₹72 lakh |
| CO₂ avoided per year | 17 tonnes | 513 tonnes |

*Assumptions: 8,760 hours; a 25% saving from the fan swap alone, at the low end of published results; no change to airflow or operating modes; CEA grid emission factor of 0.71 tCO₂/MWh. Constant-airflow control and validated setback would add to this.*

## Planning a retrofit through change control

A fan change on a validated HVAC system is a GMP change. Plan it with QA from the start:

1. **Change control.** Raise the change, with a risk assessment covering airflow, pressure cascades, temperature, humidity and recovery.
2. **Specification.** Define design airflow and static pressure, including end-of-life filter pressure drop, and select fans for it.
3. **Installation.** Schedule the swap in a planned shutdown, with containment for the AHU section.
4. **Qualification.** Re-verify airflow, air-change rates, pressure differentials and room classification as your protocol requires, and update the documentation.
5. **Monitoring.** Trend fan power, airflow and room pressures afterwards to confirm both the energy saving and stable conditions.

## Where Garvata fits

**Garvata EC fans** replace belt-driven blowers in existing AHU sections and report speed, temperature, power and vibration. **GarvataAI AHU Control** has a mode for pharma and R&D that prioritises room pressure: supply and exhaust fan speeds respond to differential-pressure readings, and the controller only chooses speeds inside the airflow and pressure limits you set. It works alongside your BMS over Modbus or BACnet. Both are available now.

*[See the pharma solution](/solutions/pharma) or [talk to us about your production site](/contact?from=pharma).*

## Sources

1. ISPE, "Air change rate reduction during operation: a success" (*Pharmaceutical Engineering*, July–August 2023). [ispe.org](https://ispe.org/pharmaceutical-engineering/july-august-2023/air-change-rate-reduction-during-operation-success)
2. ISPE, on cleanroom HVAC energy use. [ispe.org](https://ispe.org/node/219248)
3. ISPE, on ISO 8 and ISO 7 air-change rates. [ispe.org](https://ispe.org/node/254304)
4. World Health Organization, *TRS 1010, Annex 8: Guidelines on heating, ventilation and air-conditioning systems for non-sterile pharmaceutical products* (2018). [gmp-compliance.org](https://gmp-compliance.org/files/guidemgr/TRS1010annex8.pdf)
5. Lexplosion, on the Schedule M compliance extension for manufacturers with turnover below ₹250 crore (2025). [lexplosion.in](https://lexplosion.in/health-ministry-extends-schedule-m-compliance-deadline-for-small-and-medium-manufacturers-with-turnover-below-rs-250-crores-to-31st-december-2025/)
6. ebm-papst, AHU fan retrofit programme. [ebmpapst.com](https://www.ebmpapst.com/ae/en/campaigns/industry-campaigns/ahu-fan.html)
7. Central Electricity Authority, CO₂ Baseline Database v21.0 (December 2025). [cea.nic.in](https://cea.nic.in/wp-content/uploads/baseline/2025/12/User_Guide_V_21.0.pdf)
