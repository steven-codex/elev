---
name: motionfields
description: Provider-agnostic creative direction and execution orchestration for premium product motion, UI films, 2.5D/3D motion, reference-informed reconstruction, and coded launch films using HyperFrames, GSAP, DOM/CSS/SVG, Canvas, Three.js, and WebGL.
version: 2.0.0
---
# MotionFields — V2
Use this skill when the user wants premium motion design, product launch films, UI animation, kinetic typography, spatial/3D motion, website-to-film, or a new piece inspired by one or more references.
The goal is not to maximize animation. The goal is to control attention over time with a coherent story, strong composition, deliberate camera language, readable UI, and motion that explains or reveals something.
## Prime directive
Never jump from a vague brief directly into code.
Always separate these roles:
1. **Director** — understands intent, reference, narrative, hierarchy, motion language, pacing, depth, and the dominant creative idea.
2. **Planner** — converts direction into a beat map and shot plan with timing, objects, camera behavior, transitions, and technical routing.
3. **Builder** — implements the approved plan with the simplest capable technology.
4. **Reviewer** — inspects rendered states, scores quality, identifies weak moments, and requests targeted repairs.
The Builder must not invent a new concept while coding unless execution constraints make the plan impossible. If that happens, return to the Planner.
## Default behavior
Operate autonomously unless the user explicitly asks for approvals between stages.
Make reasonable creative inferences from the brief, assets, brand, and references instead of asking unnecessary questions.
## Stage 0 — Classify the task
Choose one primary workflow:
- `reference-reconstruction` — a reference exists and the user wants comparable motion grammar.
- `spatial-product-journey` — the piece should feel like one continuous camera journey through a product world.
- `agentic-product-story` — the product performs work and motion must show intent → action → evidence → result.
- `brand-claim-proof` — brand statements alternate with product proof.
- `pattern-led-film` — the piece is assembled from a curated motion vocabulary while retaining one Concept Spine.
- `original-product-film` — no strict reference; build from the brand/product brief.
Load the matching file in `workflows/`.
## Stage 1 — Read intent before style
Determine:
- what the audience must understand;
- what they should feel;
- what single idea should remain after the film ends;
- what the hero is: message, UI, object, logo, number, person, environment, or transformation;
- desired energy: restrained, confident, playful, kinetic, dramatic, experimental;
- target duration, aspect ratio, and platform if available.
Read `references/creative-direction.md`.
## Stage 2 — Analyze references into Motion DNA
If one or more references exist, do not copy scenes literally by default.
Read `references/reference-analysis.md` and extract `motion-dna.json` using `schemas/motion-dna.schema.json`.
Separate:
- **transferable grammar** — pacing, hierarchy, camera behavior, transition logic, depth, typography behavior, visual punctuation, and motion personality;
- **content-specific material** — logos, copy, UI, product assets, branded shapes;
- **signature elements** — recognizable branded devices that should not be duplicated unless the user owns them or explicitly requests reconstruction of their own work.
When multiple references exist, identify:
- common DNA;
- contradictory traits;
- which reference leads each dimension: narrative, camera, transitions, UI choreography, 3D depth, typography, or pacing.
## Stage 3 — Choose a Story Archetype
Read `references/story-archetypes.md`.
Choose one primary archetype before choosing transitions or easing:
### A. Spatial Product Journey
Use when camera continuity and spatial navigation are the main storytelling device.
### B. Agentic Product Story
Use when the product performs a multi-step task and the viewer must understand causality.
### C. Brand Claim → Product Proof
Use when brand language and proof moments should alternate in a clear rhythm.
### D. Pattern-led Motion System
Use when multiple motion motifs are useful, but keep one narrative spine and one attention hierarchy.
Do not blend all four equally. One must lead; others may support.
## Stage 4 — Create the Concept Spine
Read `references/concept-spine.md`.
Write one concise concept that connects every major beat.
A valid Concept Spine contains:
- communication thesis;
- visual metaphor or transformation logic;
- emotional arc;
- dominant motion idea;
- ending resolution.
Reject concepts that are only collections of effects.
## Stage 5 — Establish the motion system
Read:
- `references/motion-language.md`
- `references/attention-budget.md`
- `references/cinematography.md`
- `references/spatial-3d.md`
- `references/anti-slop.md`
Define:
- pacing curve;
- motion hierarchy;
- attention budget;
- camera grammar;
- depth grammar;
- typography behavior;
- transition grammar;
- visual punctuation / breathing moments;
- material/lighting language where relevant;
- one dominant motif plus limited supporting motifs.
Prefer fewer, stronger ideas over many unrelated effects.
## Stage 6 — Enforce the Attention Budget
At any single moment, prefer:
- one dominant motion;
- zero or one supporting motion;
- micro-motion only when it reinforces the dominant action.
Avoid simultaneous camera movement + large UI movement + kinetic type + decorative background motion unless the scene has been intentionally composed for high energy.
Default rhythm:
`MOVE → HOLD → MOVE`
and at scene level:
`BUILD → BREATHE → RESOLVE`
The viewer must receive enough hold time to read important UI or copy.
## Stage 7 — Build a beat map and shot plan
Use `schemas/shot-plan.schema.json`.
Every beat must specify:
- time range;
- narrative purpose;
- hero object;
- claim or proof role where applicable;
- starting state;
- ending state;
- dominant motion;
- supporting motion;
- camera behavior;
- depth relationship;
- transition in/out;
- hold/read time;
- technical route;
- verification target.
The plan must be understandable without implementation code.
## Stage 8 — Route to the simplest capable technology
Read `references/technical-routing.md`.
Default hierarchy:
1. DOM/CSS for crisp interface and typography.
2. SVG for vector paths, masks, diagrams, and logos.
3. GSAP for deterministic choreography and timeline control.
4. CSS 3D transforms for 2.5D UI worlds and camera-like travel.
5. Canvas for procedural 2D systems.
6. Three.js/WebGL for real spatial depth, camera motion, particles, lighting, shaders, or 3D objects.
7. External generated footage only when code-based rendering cannot reasonably create the desired visual.
Use **2.5D before 3D** for software/product motion unless true 3D materially improves the idea.
Do not use Three.js merely to make simple 2D motion sound more advanced.
## Stage 9 — HyperFrames execution contract
When HyperFrames is available:
- use it as the deterministic render/timeline environment;
- keep render-critical motion seekable;
- avoid wall-clock-dependent behavior;
- avoid uncontrolled randomness;
- prefer seeded/procedural deterministic variation;
- separate layout correctness from animation;
- build the strongest hero/end state before adding motion;
- use GSAP timelines for orchestrated motion where appropriate;
- verify at meaningful timestamps, not only at t=0.
If an official HyperFrames skill is installed, follow its current runtime/CLI contract for framework details. This skill owns creative decisions, not framework internals.
## Stage 10 — Creative review
Read `references/review-rubric.md` and score with `schemas/review-score.schema.json`.
Review at minimum:
- concept clarity;
- narrative causality;
- composition;
- visual hierarchy;
- motion hierarchy;
- pacing;
- hold/read time;
- timing/weight;
- camera language;
- depth quality;
- transition continuity;
- visual punctuation;
- typography legibility;
- brand fidelity;
- originality;
- reference-DNA alignment where applicable;
- AI-slop risk.
Technical correctness is necessary but insufficient.
## Stage 11 — Targeted repair loop
If any major quality dimension is below target, repair the weakest specific moments instead of rewriting the whole composition.
Repair order:
1. concept / narrative / hierarchy failure;
2. composition / depth failure;
3. camera continuity failure;
4. timing / pacing / hold-time failure;
5. transition discontinuity;
6. polish / material / easing issues.
Re-render representative timestamps after each repair group.
Stop when:
- the story reads without explanation;
- motion directs attention intentionally;
- causality is clear when the product performs work;
- claim and proof are balanced when using that archetype;
- the piece has breathing room;
- spatial effects have actual depth logic;
- no section looks like a generic motion preset;
- the ending resolves the Concept Spine.
## Non-negotiable anti-slop rules
Never default to all of the following together: dark background, purple/blue neon gradient, floating glass cards, random particles, glow, giant centered headline, and orbiting camera.
Never make every object animate with the same direction, duration, delay, and easing.
Never use motion to compensate for weak composition.
Never animate everything just because it can move.
Never use a hard cut when spatial continuity or a shared-object transition would communicate the idea better.
Never use continuous movement without readable holds.
Never claim a shot is 3D when it only scales flat layers. Real spatial motion requires meaningful depth relationships such as perspective, Z-separation, occlusion, rotation, camera/world movement, or lighting/material response.
Never copy a reference's branded content when transferring its motion grammar is enough.
## Default quality target
For premium product motion:
- concept clarity: >= 8/10
- narrative causality: >= 8/10 when applicable
- composition: >= 8/10
- hierarchy: >= 8/10
- pacing: >= 8/10
- camera continuity: >= 8/10 for spatial journeys
- transition continuity: >= 8/10
- hold/readability: >= 8/10
- brand fidelity: >= 8/10
- AI-slop risk: <= 3/10
If a reference benchmark is supplied, Motion DNA alignment should usually be >= 8/10 without literal scene copying.
## Output artifacts
For a full run, produce or maintain:
- `motion-dna.json` when references are used;
- `concept-spine.md`;
- `shot-plan.json`;
- implementation files;
- `review-score.json`;
- final render or preview when rendering tools are available.
Keep chat updates concise. Surface the concept, archetype choice, major execution decisions, and meaningful review findings rather than low-level implementation noise.
