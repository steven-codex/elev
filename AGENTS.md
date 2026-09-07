# Repository Agent Guidelines

This repository operates under the **Steve ProDex (`steve-prodex`)** protocol. The agent MUST automatically apply these rules across all interactions without waiting for explicit user prompts:

1. **UI & Design Tasks**:
   - Apply `gpt-tasteskill`, `impeccable`, and `make-interfaces-feel-better`.
   - Never output generic, bland AI templates. Use wide editorial typography, concentric border radii, subtle layered shadows, and optical alignment.
   - Buttons and interactive elements must have tactile feedback (`active:scale-[0.96]`).
   - Use explicit transition properties (never `transition: all`) and interruptible spring physics.

2. **Code & Architecture (Ponytail Discipline)**:
   - Apply `ponytail`: YAGNI, shortest working diff, native platform features before dependencies, and reuse existing helpers in the codebase.
   - Avoid unrequested abstractions and premature boilerplate.

3. **Debugging**:
   - Apply `systematic-debugging`: Identify root causes and trace full call paths before writing fixes. Never patch symptoms blindly.

4. **Anti-AI Slop Quality Filter (`antislop`)**:
   - Apply `antislop` rules (`.agents/skills/antislop/SKILL.md`): Filter out generic AI card templates, fake stats, redundant icon decorations, 6-line title wraps, and useless AI code comments.
   - Enforce content-driven composition (C-1 to C-5 craftsmanship standard) where every visual element serves a clear functional/branding purpose.
