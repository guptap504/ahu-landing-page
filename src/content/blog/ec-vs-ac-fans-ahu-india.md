---
title: "EC vs AC Fans for AHUs: An Indian Buyer's Guide"
description: Belt-driven AC blowers, AC motors with a VFD, or EC plug fans? How each one wastes or saves energy in an Indian air handling unit, what each costs to run at ₹10 per unit, and when each one makes sense.
date: 2026-10-15
category: EC fans
author: Garvata Labs
keywords: [EC vs AC fan, EC fan AHU, EC motor vs induction motor, belt driven AHU fan, plug fan vs blower, AHU fan energy India]
---

> **Key points.** An AHU fan can lose energy in four places: the motor, the drive (belts or a VFD), the impeller and the control. Belt-driven AC blowers lose it in all four. **EC plug fans** remove the belt, use an IE5-equivalent motor that stays efficient at part load, and have speed control built in. That last point matters most, because fan power falls with the **cube** of speed.

Most air handling units in Indian offices, IT parks, hospitals and factories were specified for the lowest first cost: a forward-curved blower in a scroll housing, driven by belts from an induction motor and run at one speed. They work. They also waste a lot of electricity, at a time when commercial supply costs around ₹10 per unit and many AHUs run 24x7. This guide compares the three ways to drive an AHU fan and explains when each makes sense.

## The three options

**1. Belt-driven AC fan.** An induction (AC) motor drives a forward-curved or backward-curved blower through V-belts and pulleys. Speed is set by the pulley ratio, so changing airflow means changing pulleys or adding a VFD. This is the most common arrangement in older Indian AHUs.

**2. Direct-drive AC fan with a VFD.** A plug fan sits directly on the shaft of an induction motor, and a separate variable frequency drive (VFD) controls its speed. The belt is gone, but the motor and the drive are still two components with their own losses, wiring and settings.

**3. EC plug fan.** A backward-curved plug impeller is mounted directly on an EC motor: a permanent-magnet motor with the drive electronics built in. Speed control from 0 to 100% is part of the fan, and the fan can report its speed, power and faults to a BMS or controller.

## Where each one loses energy

| Loss | Belt-driven AC | Direct AC + VFD | EC plug fan |
| --- | --- | --- | --- |
| Motor | Induction motor, typically IE2 (India's legal minimum) or IE3 | Induction motor, IE3 or better | Permanent-magnet EC motor, IE5-equivalent |
| Drive | V-belts are 95–98% efficient when new and can lose up to 5% more as they wear | VFD losses, a few percent | Integrated electronics, no separate drive |
| Impeller | Often forward-curved in a scroll housing | Backward-curved plug | Backward-curved plug |
| Part load | Fixed speed, or motor efficiency falls at reduced load | Speed varies; induction motor efficiency falls at low load | Stays efficient across the speed range |
| Maintenance | Belt tensioning and replacement, pulley alignment, bearings | Motor bearings, VFD | Sealed bearings; no belts |

Each stage multiplies the next. A slightly less efficient motor, a worn belt and a less efficient impeller, all running at a fixed speed, add up to a large share of wasted power.

## Why speed control matters most

Fans follow the **affinity laws**: airflow is proportional to speed, pressure to speed squared and power to speed **cubed**.

| Fan speed | Airflow | Power (ideal) |
| --- | --- | --- |
| 100% | 100% | 100% |
| 90% | 90% | 73% |
| 80% | 80% | 51% |
| 70% | 70% | 34% |
| 60% | 60% | 22% |

In real systems, with filters, coils and fixed static pressure, the savings are smaller than the ideal cube law. They are still large. Most AHUs are sized for the hottest afternoon at full occupancy, and they spend most of their hours below that. A fan that runs at 80% when the load allows saves around half its power for those hours.

A fixed-speed belt drive can't capture any of this. An AC motor with a VFD can, though induction motors lose some efficiency as load drops. EC motors are designed to stay efficient across their speed range.

To be fair to AC: against a good IE3 motor on a VFD, an EC fan's part-load advantage is a few percent. Most of the savings in a typical Indian retrofit come from **removing the belt, fixing an oversized or inefficient fan, and adding speed control**. EC fans deliver all three in one component, with monitoring built in.

## What it means in rupees

Take one AHU fan that draws 6 kW at its fixed speed and runs 24x7, as many IT park, hospital and pharma AHUs do:

- **Today:** 6 kW × 8,760 hours = 52,560 kWh a year, or about **₹5.3 lakh** at ₹10 per unit.
- **Every 10% saved** is about 5,256 kWh, or **₹52,600 a year** for that one fan.

An IT park with 40 such AHUs spends about ₹2.1 crore a year on AHU fans alone. We work through retrofit savings and payback in [EC Fan Retrofit for AHUs in India: Cost, Savings and Payback](/blog/ec-fan-retrofit-ahu-india).

## When each option makes sense

- **Keep belt-driven AC** only for fans that run a few hours a day, or for AHUs due for full replacement soon. The energy is small and so is the case for spending.
- **Choose AC motor plus VFD** for very large single fans above the power range of EC plug fans, or where an existing direct-drive fan and motor are in good condition and only speed control is missing.
- **Choose EC plug fans** for AHUs that run long hours, where airflow should vary with load, and where you want monitoring and BMS integration without separate drives. Large AHUs can use several EC fans in parallel (a "fan array" or "fan wall"), which also adds redundancy: if one fan fails, the others carry the load.

## What to check before you switch

1. **Duty point.** Measure the airflow and static pressure the AHU actually needs. Don't just copy the old motor's kW rating.
2. **Fit.** Plug fans need clear space around the inlet. Check that the fan section can take the new fan, or that an array of smaller fans fits better.
3. **Supply and harmonics.** Ask for IEEE 519 compliance or built-in power-factor correction, especially when many fans share one feeder.
4. **Control.** Decide what will set the fan speed: the BMS, a dedicated controller or AI control. Without it, an EC fan installed at a fixed speed only gives you the efficiency savings, not the cube-law savings.

## Sources

1. US DOE, *Replace V-Belts with Notched or Synchronous Belt Drives*, Motor Systems Tip Sheet #5. [energy.gov](https://www1.eere.energy.gov/manufacturing/tech_assistance/pdfs/replace_vbelts_motor_systemts5.pdf)
2. IEC TS 60034-30-2:2016, *Efficiency classes of variable speed AC motors (IE-code)*, which defines IE5 for variable-speed motors.
3. ebm-papst, "Complete guide to EC motors". [ebmpapst.com](https://www.ebmpapst.com/sg/en/blog/technology-innovations/complete-guide-to-ec-motors.html)
4. ebm-papst, AHU fan retrofit programme. [ebmpapst.com](https://www.ebmpapst.com/ae/en/campaigns/industry-campaigns/ahu-fan.html)
5. Bureau of Indian Standards, IS 12615:2018 and the Energy Efficient Induction Motors Quality Control Order. [bis.gov.in](https://services.bis.gov.in/tmp/ETD_IS_12615_10012019.pdf)
