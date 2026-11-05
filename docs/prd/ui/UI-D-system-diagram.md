# UI-D: "Inside a Newseed system" diagram (new section)

**Implementer:** haiku (fallback sonnet medium) · **Depends on:** UI-A/B/C
**Request:** the user wants a 3-panel architecture diagram in the spirit of nalarx.com's "Inside the intelligence layer", but **light, and matched to Newseed**. Use the idea only (three panels connected left to right). Nothing is copied: no Nalar copy, assets, colours or code.

## Placement
New component `src/components/SystemDiagram.tsx`, rendered in `App.tsx` directly **after `TimelineFeatureDeck`** and before `CustomerStoriesCarousel`, as `<section id="system">`. Use the same section rhythm as the others: `py-16 sm:py-24 lg:py-24`, the same container width, and `Reveal` / `ImageReveal` usage (copy from PricingSection).

## Copy (new `SYSTEM` export in `landingData.ts`, verbatim)
| key | EN | ID |
|---|---|---|
| heading.lead | Inside a Newseed system. | Di dalam sistem Newseed. |
| heading.accent | Wired into how you already work. | Terhubung dengan cara kerja Anda. |
| sub | Your tools feed one engine. Your team stays in charge of what it does. | Tools Anda terhubung ke satu mesin. Tim Anda tetap memegang kendali. |
| panel1.title | Your tools | Tools Anda |
| panel1.more | Any tool with an API | Tools apa pun dengan API |
| panel1.node1 | Triggers | Pemicu |
| panel1.node2.label | Auto-sync | Auto-sync |
| panel1.node2.title | Automation flows | Alur otomasi |
| panel1.node3 | Your data | Data Anda |
| core.brand | Newseed | Newseed |
| core.title | Core system | Sistem inti |
| core.caption | Runs on your own accounts. You keep every workflow. | Berjalan di akun milik Anda. Semua workflow tetap milik Anda. |
| link.top | Logged · Reviewed · Under NDA | Tercatat · Ditinjau · Di bawah NDA |
| link.bottom | Improves with every run | Makin baik di setiap proses |
| panel3.title | Your team | Tim Anda |
| panel3.owner | You / Owner | Anda / Owner |
| example | Example flow. Built around your tools and process. | Contoh alur. Disesuaikan dengan tools dan proses Anda. |

Panel 1 tools (use `/logos/*.svg`): WhatsApp, Gmail, Google Sheets, HubSpot, Notion, n8n, then the "any tool" row with a plus icon.

Core rows (title / sub):
1. AI agent / Answers, qualifies, books · AI agent / Menjawab, menyaring, menjadwalkan
2. Workflow engine / Steps, schedules, retries · Mesin workflow / Langkah, jadwal, pengulangan
3. Knowledge base / Your guides, prices, policies · Knowledge base / Panduan, harga, kebijakan Anda
4. Guardrails / Rules and human hand-off · Guardrails / Aturan dan eskalasi ke manusia
5. Monitoring / Logs and error alerts · Pemantauan / Log dan notifikasi error

Panel 3 team tree: You (top) → Sales / Leads, Ops / Orders, Support / Chats (ID: Sales / Prospek, Operasional / Pesanan, Support / Chat). Bottom caption cycles with the active node:
- Sales: "Following up new leads" / "Menindaklanjuti prospek baru"
- Ops: "Syncing today's orders" / "Menyinkronkan pesanan hari ini"
- Support: "Handing a case to your team" / "Meneruskan kasus ke tim Anda"

## Design (light, Newseed)
- **Desktop (lg+):** 3 panels in a row at about 4 / 4 / 4 widths, plus a slim connector column between the core and team panels. All panels share the same height. Below lg, stack them vertically with short vertical dashed connectors between panels. No in-SVG text anywhere, so labels stay readable on mobile.
- **Side panels:** `bg-[#F8FAFC]`, `rounded-3xl`, layered soft shadow with a 1px ring, `label`-role title in `ink-tertiary`.
- **Tool rows:** white pills with logo + name in body-sm, like the integrations pills. Dashed `#CBD5E1` connector lines run into a vertical trunk, then to the blue node.
- **Node stack:** two white nodes with the blue middle node between them (accent gradient `from-[#2F6BEA] to-[#0055FF]`, white text, label + title).
- **Centre panel:** the identity piece. Background `/hero-fluid-wave-bg.png` (cover) with rounded-3xl. On it, a white card (concentric radius) with the header row (infinity logo + "Newseed", "Core system" on the right) and 5 divided rows: lucide icon, title in body-sm medium `ink`, sub in caption `ink-tertiary`. Caption below the card in `text-white/90`. Measure its contrast; if it's under 4.5:1 on the image, place the caption inside the white card instead.
- **Link column:** a small white rounded square with a lucide `ShieldCheck` and another with `RefreshCw`, with the `link.top` / `link.bottom` captions in caption role and a dashed horizontal double-arrow line behind them. Below lg, render them as one centred row.
- **Team tree:** white nodes (owner on top, 3 below), thin `#CBD5E1` connector lines. Each node has a small accent-ramp dot, name in body-sm medium and sub in caption. The active node gets a 2px accent ring and a small "Active" / "Aktif" badge, so state isn't carried by motion alone.
- `Example` caption at the bottom of the section, in caption `ink-tertiary`.
- Antislop: every element above has a job. No extra decorative blobs, no eyebrow pill, and the italic gradient is used only in the heading accent, same as other sections.

## Motion
- Dashed connectors: a slow flowing `stroke-dashoffset` (CSS linear, about 2s) only while in view. It's static under reduced motion. Use the existing `data-motion-paused` pattern.
- Active team node cycles Sales → Ops → Support every 2.8s using `useLoopPlayback` (3 cycles, then `LoopReplayButton` in the panel's bottom-right, not covering content). The ring uses a framer `layoutId="systemActiveNode"` spring 500/35, and the caption swaps with `AnimatePresence mode="wait"` (opacity + 6px blur, 0.22s).
- Under reduced motion: no cycling, Sales stays active.
- Panels enter with the existing `StaggerGroup`.

## Also update
- `NAV`: no new item.
- Keep the tool logos local. Vapi isn't used here.

## Acceptance
- Lint and build pass.
- 1440px, 1024px, 390px, 320px in EN and /id: no overflow, no clipped text, connectors line up with their rows, panels equal height on desktop.
- All panel text is at least 12px, and captions pass 4.5:1 (report the centre caption's measured pair).
- Loop stops after 3 cycles, "Play again" restarts it, pauses off-screen.
- All existing `layoutId`s still present.

## Revision after review (main session, screenshot at 1440px)
First build works, but it's too tall (681px panels), too narrow, and has dead space. Layout changes for lg and up:
1. **Width and height:** use the full section container (same outer width as the Integrations card). Target panel height about 500–540px. Grid: `lg:grid-cols-[1.15fr_1.15fr_auto_1fr]`.
2. **Tools panel, 2 columns:** tool pills in the left column; the 3-node stack (Triggers, blue Automation flows, Your data) in the right column, with the pills' dashed lines joining a trunk into the blue node and short dashed links between the 3 nodes. The blue node's output line continues to the core panel. Below lg, keep the stacked layout.
3. **Core panel:** the fluid wave must be visible, since it's the identity piece. The panel gets `p-6 lg:p-8` and the white card keeps its natural height, centred, with no stretched empty area. The caption stays inside the card as its last row. Card radius stays concentric with the panel.
4. **Team panel, a real tree:** owner node centred at the top; a dashed trunk and horizontal bar; Sales, Ops, Support as 3 compact nodes in a row at `xl` and up (dot above name, sub below). Between lg and xl, and below lg, use the current vertical list. Keep the active ring, badge, caption and loop. The tree starts near the top of the panel, with the caption pinned at the bottom.
5. No text under 12px. Don't truncate "Operasional". Keep all motion and accessibility from the first build.

## Navbar at 320px
The EN/ID switch overlaps the "Newseed" wordmark at 320px. Fix in `Navbar.tsx`: below 360px, hide the wordmark text with `max-[359px]:sr-only` and keep the logo image, so the home link keeps its name.
