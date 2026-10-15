---
title: "IE2 to IE5 and ECBC: India's Efficiency Rules for HVAC Fans and Motors"
description: What Indian law actually requires of AHU fans and motors, what the Energy Conservation Building Code asks for at each tier, where EC fans fit, and why the legal minimum is a poor guide to what you should buy.
date: 2026-10-15
category: Regulation
author: Garvata Labs
keywords: [IE3 motor India, IS 12615, ECBC fan efficiency, ECSBC 2024, IE5 EC motor, motor efficiency class India, BEE HVAC]
---

> **Key points.** The legal minimum for three-phase induction motors in India is **IE2**, under IS 12615 and a BIS quality control order. The **Energy Conservation Building Code (ECBC)** sets stricter tiers for AHU fans in covered buildings: **60% / 65% / 70%** fan efficiency with **IE2 / IE3 / IE4** motors. EC fans sit largely outside the motor rules, and are rated **IE5-equivalent** against an IEC benchmark for variable-speed motors. In practice, at ₹10 per unit, the economics push you well past any legal minimum.

Facility heads and consultants often ask us what the rules require when they specify or replace AHU fans. The answer is a patchwork of a BIS motor standard, a building code that states adopt individually, and international efficiency classes. This guide sets out what applies, as of October 2026.

## The efficiency classes: IE1 to IE5

The **IE (International Efficiency) classes** are defined by the International Electrotechnical Commission:

- **IEC 60034-30-1** covers motors that run directly on the mains (line-operated), from IE1 (standard) to IE4 (super premium). Its second edition, published in December 2025, adds **IE5** (ultra premium).
- **IEC TS 60034-30-2** covers variable-speed motors that can't run directly on the mains, such as permanent-magnet and synchronous reluctance motors, again up to IE5.

Each step up cuts losses by roughly a fifth compared with the class below. The gap is largest for small motors, which is where most AHU fans sit.

## What Indian law requires: IS 12615 and the motor QCO

- **IS 12615:2018** is the Indian standard for energy-efficient three-phase squirrel-cage induction motors from 0.12 to 1,000 kW. It defines the IE2, IE3 and IE4 classes in Indian terms.
- Under the **Energy Efficient Induction Motors Quality Control Order (2017)**, these motors must carry BIS certification. BIS has told buyers to procure only certified motors.
- The **legal floor is IE2**. Despite claims on some supplier websites, we found no official notification making IE3 mandatory. BIS is revising IS 12615 to align with the new IEC edition, including IE5, but at the time of writing the revision is in draft.

**Where EC fans fit.** IS 12615 covers line-operated induction motors. EC motors are permanent-magnet motors with integrated electronics, so they sit outside the standard and the QCO. We found no BEE or BIS efficiency mandate specific to EC fans or AHU fans.

**Why "IE5-equivalent".** IEC TS 60034-30-2 excludes motors built so completely into a machine, such as a fan, that they can't be tested on their own. Most external-rotor EC fan motors fall into this group. That is why reputable makers, ebm-papst and Garvata among them, describe their EC motors as **IE5-equivalent**: benchmarked against the IE5 limits, not certified under the standard. Treat a plain "IE5 certified" claim on an integrated EC fan with caution.

## What the building code asks for: ECBC 2017

The **Energy Conservation Building Code 2017**, issued by the Bureau of Energy Efficiency (BEE), applies to commercial buildings with a **connected load of 100 kW or more, or a contract demand of 120 kVA or more**, once a state notifies it. It has three tiers of increasing stringency. For supply, return and exhaust fans above 0.37 kW in AHUs:

| Tier | Minimum fan efficiency | Minimum motor class |
| --- | --- | --- |
| ECBC | 60% | IE2 |
| ECBC+ | 65% | IE3 |
| SuperECBC | 70% | IE4 |

Other clauses that affect AHU fans:

- **Motor sizing.** Motors must not be more than 20% larger than the calculated load. Check this when replacing motors in older AHUs, where oversizing is common.
- **Variable-air-volume fans (SuperECBC).** Fan power at 50% airflow must be no more than **30%** of design power. Only well-controlled variable-speed fans can meet this.
- **Dampers.** Supply and exhaust systems with a VFD need dampers that close automatically when the system is off.

Unducted units, healthcare fans with HEPA filters and fans inside energy-recovery units are exempt from the fan efficiency table.

**State adoption.** ECBC binds only where a state has notified it, and enforcement varies. In 2024 BEE published the **Energy Conservation and Sustainable Building Code (ECSBC)**, which updates ECBC for new commercial buildings and adds sustainability requirements. It too applies once states notify it. Check your state's status with the State Designated Agency.

## What doesn't cover data centers and IT parks (yet)

- **PAT (Perform, Achieve and Trade)** sets energy targets for designated consumers. Its commercial building coverage extends to hotels, not to data centers or IT parks.
- **India's carbon credit trading scheme** places compliance obligations on heavy industry, such as aluminium, cement, refineries and textiles. Commercial buildings and data centers are not obligated entities.

The pressure on these sectors comes instead from tariffs, customer and investor ESG requirements, and the government's cooling targets. The **India Cooling Action Plan** aims to cut cooling energy needs by 25–40% by 2037-38.

## The minimum is not the target

Compliance sets a floor, not the economic optimum. Take an AHU fan drawing 5 kW and running 24x7 at ₹10 per unit. It costs about ₹4.4 lakh a year. Moving from an IE2 motor and a worn belt drive to an IE5-equivalent direct-drive EC fan with speed control can cut that by a third to a half. The savings from the motor class alone are a few percent. Most come from removing the belt, using a better impeller and, above all, varying the speed. We work through the numbers in [EC Fan Retrofit for AHUs in India](/blog/ec-fan-retrofit-ahu-india).

When you specify AHU fans:

1. **Meet SuperECBC levels on new projects**: 70% fan efficiency and IE4 or better, even where your state hasn't notified it.
2. **Specify input power at the duty point**, not just a motor class.
3. **Require variable speed and a control strategy**, so the SuperECBC part-load clause is met in practice, not just on paper.
4. **Ask EC fan suppliers how efficiency was established**: the IE5-equivalent basis and the airflow test standard (ISO 5801 or AMCA 210).

*Garvata EC fans are rated IE5-equivalent and are controlled by GarvataAI AHU Control. [See the products](/products) or [talk to us about a specification](/contact?from=products).*

## Sources

1. Bureau of Indian Standards, circular on IS 12615:2018 certification (2019). [bis.gov.in](https://services.bis.gov.in/tmp/ETD_IS_12615_10012019.pdf)
2. IEA policy database, "IS 12615:2018 MEPS for industrial motors". [iea.org](https://www.iea.org/policies/19325-is-12615-2018-meps-for-industrial-motors)
3. IEC 60034-30-1:2025, edition 2.0. [iec.ch](https://webstore.iec.ch/en/publication/110705)
4. IEC TS 60034-30-2:2016, preview including scope and exclusions. [vde-verlag.de](https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iects60034-30-2%7Bed1.0%7Den.pdf)
5. Bureau of Energy Efficiency, *Energy Conservation Building Code 2017* (mirrored by LBNL). [lbl.gov](https://datacenters.lbl.gov/sites/default/files/ECBC_22June2017_printed_Nov2019%20Final1%20(4).pdf)
6. IEA policy database, "Energy Conservation and Sustainable Building Code 2024". [iea.org](https://www.iea.org/policies/26523)
7. Bureau of Energy Efficiency, PAT scheme. [beeindia.gov.in](https://beeindia.gov.in/en/node/39347)
8. ICAP, "Compliance obligations under India's Carbon Credit Trading Scheme enter force for seven sectors". [icapcarbonaction.com](https://icapcarbonaction.com/en/news/compliance-obligations-under-indias-carbon-credit-trading-scheme-enter-force-seven-sectors)
9. IEA policy database, India Cooling Action Plan (2019). [iea.org](https://www.iea.org/policies/7455-india-cooling-action-plan-icap)
