---
title: "AI for Data Center Cooling: How It Works and What It Saves"
description: AI control has cut data center cooling energy by roughly 10–30% in published deployments, from Google to telecom operators. A plain-English guide to how it works, what the evidence shows, and the safety questions to ask before you let software touch your cooling.
date: 2026-10-15
category: AI control
author: Garvata Labs
keywords: [AI data center cooling, AI cooling optimization, machine learning HVAC control, data center energy saving AI, autonomous cooling control]
---

> **Key points.** Conventional cooling controls react to one signal at a time, unit by unit. AI control predicts how the whole room will respond and chooses setpoints for every unit together. Published deployments report roughly **10–30% lower cooling energy**, with Google's well-known results at the top of the range. The deciding factor in practice is safety design: hard limits, the BMS keeping its local loops, and a gradual path from advice to autonomy.

Cooling is the biggest controllable energy cost in a data center, as we showed in [Data Center Cooling Energy in India](/blog/data-center-cooling-energy-india). The equipment is usually capable. The control logic is what holds it back. That is the gap AI-based control is designed to close.

## Why conventional cooling control leaves energy on the table

A typical data hall is cooled by several CRAC or CRAH units. Each runs its own control loop, usually a PID controller holding return-air temperature at a fixed setpoint. This is simple and robust, but it has four built-in limits:

- **It reacts instead of anticipating.** The loop acts only after temperature has drifted. To stay safe despite that lag, operators build in a margin and overcool.
- **It watches the wrong place.** Return air at the unit is not what the servers breathe. The rack inlets that matter are often not part of the loop at all.
- **It moves one lever at a time.** A unit adjusts its fan or its cooling valve, rarely both in a coordinated way, and never with knowledge of what the next unit is doing.
- **It doesn't learn.** The rules are tuned at commissioning. IT load, layout and weather change; the rules stay put.

None of these is a fault in the equipment. They are limits of local, rule-based control, and they are why rooms with good hardware still post mediocre PUEs.

## How AI cooling control works

"AI" covers several techniques, but most production systems follow the same loop:

1. **Sense.** Collect live data from the building management system (BMS) and cooling units: supply and return temperatures, rack-inlet temperatures, humidity, fan speeds, valve positions, chilled-water temperatures, IT load from the DCIM, and outdoor weather.
2. **Model.** A machine learning model, trained on the site's own history, learns how the room responds. It answers questions like: if these three units slow their fans by 10% and that valve opens slightly, what will rack inlets look like in 15 minutes?
3. **Optimise.** An optimiser searches for the combination of setpoints that uses the least energy while keeping every predicted temperature and humidity inside its limits.
4. **Check.** A separate safety layer validates each proposed change against hard limits before it is executed.
5. **Act and learn.** Approved setpoints are sent through the BMS. The system watches the result and keeps updating its model.

The main difference from rule-based control is that the room is optimised **as one system**, against **predicted** conditions at the **server inlets**. That removes the safety margin that reactive control has to carry, and it stops units fighting each other.

Some systems use reinforcement learning, in which a control policy is trained (often in a simulator first) to maximise savings within constraints. Others use model-predictive control with learned models. The architecture matters less than the safety design and the quality of the data.

## What the published evidence shows

Results vary with the starting point. A well-run room has less to give than a neglected one. All of the figures below come from the operators or vendors themselves.

| Deployment | Approach | Reported result |
| --- | --- | --- |
| Google / DeepMind (2016) | ML recommendations, operators applied them | Up to 40% less energy for cooling |
| Google / DeepMind (2018) | Autonomous control with conservative safety bounds | About 30% average savings |
| DeepMind / Trane (2022) | Reinforcement learning on commercial chiller plants | About 9% and 13% in two live buildings |
| Meta (2024) | Simulator-trained reinforcement learning on air-side control | 20% lower supply-fan energy in a pilot region |
| Virgin Media O2 with EkkoSense | AI-driven cooling optimisation across 20 sites | 15% average cooling-energy saving |
| Phaidra (2025) | Autonomous AI control | 10–15% in early pilots |

A realistic expectation for an operating facility is a **10–25% cut in cooling energy**, with more where the existing controls are poorly tuned. Take the 1 MW example from our [energy overview](/blog/data-center-energy-consumption). At a PUE of 1.4, cooling makes up about 0.3 of the 0.4 overhead. A 15% cut in cooling energy is then worth about 0.045 of PUE: roughly 390 MWh, or ₹39 lakh a year at ₹10 per unit.

## The fans matter as much as the software

AI control can only save energy through equipment that can modulate. The biggest single lever on the air side is fan speed, because of the cube law: a fan at 80% speed draws about half the power of one at full speed. That only pays off if the fans can run efficiently at part load.

- **EC (electronically commutated) fans** keep high efficiency across their speed range, report their own speed, power and condition, and take speed commands over Modbus or BACnet.
- **Belt-driven or fixed-speed AC fans** either can't modulate or lose much of the benefit to motor and drive losses at part load.

For older rooms, an EC fan retrofit is often what turns AI control decisions into real kilowatt-hour savings. We cover the options in [EC Fans for Indian Data Centers](/blog/ec-fans-data-centers-india).

## Deploying AI control safely

Cooling protects equipment worth crores and uptime commitments worth far more. No operator should hand control to software without these safeguards:

1. **Hard limits that the AI cannot override.** Temperature, humidity and rate-of-change limits are enforced by a separate safety check, not left to the model's judgement.
2. **The BMS keeps its local loops.** The AI sends supervisory setpoints. Local safety loops, alarms and failsafes stay in the BMS and the units.
3. **Automatic fallback.** If data goes stale, sensors disagree or the model is uncertain, control reverts to the existing BMS logic.
4. **Gradual autonomy.** Start in advisory mode, where the system recommends and operators approve. Move to supervised control on part of the room, and only then to autonomous operation. Google followed the same path, from recommendations in 2016 to autonomous control in 2018.
5. **Operator override, always.** Engineers must be able to see what the system is doing and why, and take control back immediately.

## Questions to ask any AI cooling vendor

- **How will savings be measured?** Insist on an agreed baseline and a measurement method that adjusts for IT load and weather, such as IPMVP Option B or C, rather than a before-and-after comparison.
- **What does it control, and through what?** Setpoints through the BMS, or direct commands to the units? Which points are read and which are written?
- **What happens when it is unsure?** How is model confidence handled, and what triggers a fallback?
- **What data leaves the site?** Where is it processed, and can control run at the edge if the connection drops?
- **What do you need from us?** Sensor coverage, BMS access, DCIM integration and operator time all affect how fast a pilot can start.

## Where Garvata fits

Garvata builds AI control and the equipment it commands. **Garvata Cooling OS** is a supervisory layer that sits between the systems you already run:

1. **DCIM supplies context:** rack locations, IT load per rack, cooling requirements and capacity.
2. **Cooling OS decides:** a digital twin of the room anticipates thermal conditions, an HVAC agent chooses setpoints, and a safety checker validates every change against your limits.
3. **The BMS executes:** it receives the setpoints and keeps its local safety and PID loops, alarms and equipment state.
4. **Equipment closes the loop:** CRAC, CRAH and CDU units, EC fans, valves and pumps respond, and the results flow back as new data.

| Cooling OS reads | Cooling OS sets |
| --- | --- |
| Return and supply air temperature | CRAC and CRAH setpoints |
| Chilled-water inlet and outlet temperature | EC fan speed |
| Relative humidity and CO₂ | Chilled-water valve position |
| Duct pressure | Pump speed |
| Outside conditions | Fresh-air damper position |
| Rack load from the DCIM | |

The optimiser minimises cooling energy while **heavily penalising any deviation from the setpoints** you define, so holding conditions always comes before saving energy. Unlike unit-level controls, which adjust either the fan or the cooling capacity, it moves fans, valves and capacity together.

Cooling OS is **in early access**: we are taking on a small number of pilot sites ahead of general availability. On the equipment side, **Garvata EC fans** (available now) give the control layer efficient, monitored airflow to work with.

*[See how Cooling OS works](/solutions/data-centers) or [apply for the pilot programme](/contact?from=data-centers).*

## Sources

1. DeepMind, "DeepMind AI reduces Google data centre cooling bill by 40%" (2016). [deepmind.google](https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/)
2. DeepMind, "Safety-first AI for autonomous data centre cooling and industrial control" (2018). [deepmind.google](https://deepmind.google/discover/blog/safety-first-ai-for-autonomous-data-centre-cooling-and-industrial-control/)
3. Luo et al., "Controlling Commercial Cooling Systems Using Reinforcement Learning" (DeepMind and Trane, 2022). [arxiv.org](https://arxiv.org/abs/2211.07357)
4. Meta Engineering, "Simulator-based reinforcement learning for data center cooling optimization" (2024). [engineering.fb.com](https://engineering.fb.com/2024/09/10/data-center-engineering/simulator-based-reinforcement-learning-for-data-center-cooling-optimization/)
5. Virgin Media O2, "Virgin Media O2 works with EkkoSense to unlock data centre cooling energy savings". [virginmediao2.co.uk](https://news.virginmediao2.co.uk/virgin-media-o2-works-with-ekkosense-to-unlock-data-centre-cooling-energy-savings-worth-over-1-million-per-year/)
6. GeekWire, on Phaidra's results and funding (2025). [geekwire.com](https://www.geekwire.com/2025/fresh-off-50m-round-this-seattle-startup-cuts-data-center-cooling-energy-and-eyes-a-bigger-prize/)
7. ebm-papst, "Complete guide to EC motors". [ebmpapst.com](https://www.ebmpapst.com/sg/en/blog/technology-innovations/complete-guide-to-ec-motors.html)
