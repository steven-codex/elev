# PRD 00b: Mockup copy and slot mapping (addendum to 00)

**Status:** APPROVED by user (2026-11-05), including mapping A1–A8. Open questions resolved with the recommended/safe defaults:
- Q2: Grow badge = "Ongoing" / "Berkelanjutan" ("Most chosen" is unverified)
- Q3: keep the infinity mark and change only the wordmark to "Newseed"
- Q4: yes, copy Simple Icons SVGs into public/logos/
- Q5: no URLs given, so remove the social icons
- Q6: still open. Hide the CS1 quote and hide the footer email row until provided
**Why it exists:** the component inventory showed that the existing design has fixed slots that don't match 00 one-to-one. For example, the hero has 4 dock tabs, the FAQ has exactly 4 morphing cards, and pricing has 2 cards plus a banner. This file maps every slot and fills the copy that was missing (the `ID TODO` entries in `landingData.ts`).
**Rule:** all numbers in mockups are illustrative and sit under an "Example" / "Contoh" caption. Fictional names only. Don't use real people, and don't use "Steven".

---

## A. Mapping changes vs 00 (need user OK)

| # | Change | Why |
|---|---|---|
| A1 | The **4 services** go into the **hero dock** (4 tabs). The services heading and sub move to TimelineFeatureDeck. | The hero dock already has 4 tabs, each with an H2 and a paragraph, which is a perfect fit. |
| A2 | The **4 "how it runs" scenes** go into **MinimalistMotionStage** (TimelineFeatureDeck, 16.5s loop). Scene 4 becomes **"Quote sent"** instead of "Report sent", because that stage is an amount count-up. | Keeps the stage motion 1:1. |
| A3 | The **use-case tabs** (Sales / Operations / Customer service) become the **3 modes on the agent card** next to the LiquidOrb. | 3 modes are already there and drive the orb state. |
| A4 | The **4 process steps** become the **4 nodes around the orb** in the ecosystem diagram (ConnectedAppShell), with `id="process"`. | 4 nodes, the orb and the beams are already there. |
| A5 | **FAQ trimmed to 4.** Keep: Will AI replace my team · How long · How much · Is my data safe. Fold "what businesses" into the hero trust line, and "change tools" into the tools ticker sub. | The FAQ morph has exactly 4 card pockets. |
| A6 | **Engagement:** Build and Grow are the 2 cards (Grow carries the highlight badge). **Audit** becomes the full-width banner below them. The billing toggle is removed. | Matches 2 cards + banner. Without prices, the toggle has nothing to switch. |
| A7 | **DemoModal + InteractiveScheduler removed.** Every booking CTA opens Calendly directly. The audit agenda and time zones move into the final CTA block. | A fake calendar shows slots that aren't really available, which is misleading. |
| A8 | **Signal chips** go into MinimalistMotionStage scene 2, as the 3 floating cards that "resolve". | This places them without adding a new element to the hero. |

---

## B. Hero (MultiProductHero)

Email form → two buttons: `hero.cta1` (Calendly) and `hero.cta2` (scrolls to `#services`). The micro-copy row becomes `hero.trust`.
Trust line (updated, absorbs FAQ "what businesses"):
- EN: "Free 30-min audit · Built for education, property, distribution and field services · Your team stays in control"
- ID: "Audit gratis 30 menit · Untuk pendidikan, properti, distribusi, dan layanan lapangan · Kendali tetap di tim Anda"

### Dock tabs (keep icons, order and default tab)
| Old tab → new | Dock label EN / ID | H2 = service title, P = service body (from 00 §5) | Stage visual (same animation, new content) |
|---|---|---|---|
| Velie AI (default) → **AI agents** | AI agent / AI agent | Service 1 | LiveChat, 3 WhatsApp conversations (below) |
| Payments → **Workflows** | Workflows / Workflow | Service 2 | Conveyor: quote flow (below) |
| Notetaker → **Data sync** | Data sync / Sinkron data | Service 3 | 3 stacked cards: sync events (below) |
| Scheduling → **Audit** | Audit / Audit | Service 4 | Calendar loop: booking the free audit (below) |

"Learn more" links → EN "Talk about this" / ID "Diskusikan ini". They open WhatsApp prefilled with "Hi Newseed, I'd like to talk about {service}" / "Halo Newseed, saya ingin diskusi soal {service}".

**LiveChat (3 conversations):**
1. Rina (R): EN "Hi, is the Saturday trial class still open?" → "Yes, 10:00 or 13:00. Shall I book 10:00 for you?" · tag "Trial booked · Qualified" / ID "Halo, kelas percobaan Sabtu masih ada?" → "Masih, jam 10.00 atau 13.00. Mau saya daftarkan yang 10.00?" · tag "Trial terdaftar · Terkualifikasi"
2. Budi (B): EN "Can you send pricing for 20 units?" → "Sent. I've also passed this to our sales team for a custom quote." · tag "20 units · High intent" / ID "Bisa kirim harga untuk 20 unit?" → "Sudah saya kirim. Permintaan ini juga saya teruskan ke tim sales untuk penawaran khusus." · tag "20 unit · Minat tinggi"
3. Maya (M): EN "My order hasn't arrived, can someone help?" → "I've checked. It's delayed, so I'm connecting you to our team now." · tag "Handed to team" / ID "Pesanan saya belum sampai, bisa dibantu?" → "Sudah saya cek, pengirimannya tertunda. Saya hubungkan ke tim kami sekarang." · tag "Diteruskan ke tim"

**Conveyor → quote flow (same 5 scenes, same 11.2s timeline):**
- Header: "Quote automation" / "Otomasi penawaran"
- Amount input counts to 100 → label "Markup %" counting to **18**, done chip "✓ Priced" / "✓ Harga dihitung". The "Payment processor: Stripe" row becomes "Output: PDF proposal" / "Output: Proposal PDF".
- Consultation card → proposal card: "Cool Air HVAC" · "Proposal #1042" · "$2,360" · "Generated in 1m 48s" / "Dibuat dalam 1 mnt 48 dtk" · "PDF · Gmail"
- Toggle "Require payment to book" → "Auto-send to client" / "Kirim otomatis ke klien", active chip "Sent" / "Terkirim"

**Stacked cards → sync events (3, same rotation):**
1. "CRM updated" / "CRM diperbarui" · "New lead from WhatsApp tagged Qualified" / "Prospek baru dari WhatsApp ditandai Terkualifikasi" · "HubSpot · 1.2s" · chip "Synced" / "Tersinkron"
2. "Sheet synced" / "Sheet tersinkron" · "18 new supplier rows matched to database" / "18 baris supplier baru dicocokkan ke database" · "Google Sheets" · chip "Real-time"
3. "Daily brief sent" / "Ringkasan harian terkirim" · "Ops summary delivered to the owner on WhatsApp" / "Ringkasan operasional dikirim ke owner via WhatsApp" · "08:00" · chip "Sent" / "Terkirim"
Header "Live sync log" / "Log sinkron langsung", badge "Auto-sync", status "Syncing..." / "Menyinkronkan..."

**Calendar loop → booking the audit:** month "November 2026", target day **12** (a Thursday), header "Thursday · November 12, 2026" / "Kamis · 12 November 2026", "2 slots open" / "2 slot tersedia", slots "10:00" and "14:00", state "Booked" / "Terjadwal", toast "Audit booked" / "Audit terjadwal".

### Hero bento (3 cards)
- Card 3: H3 EN "Follow-up automation" + grey "that clears the backlog" / ID "Otomasi follow-up" + grey "yang membereskan antrean". Browser URL "newseedglobal.com/flows". Tasks: "Send quote reminder after 48h" / "Kirim pengingat penawaran setelah 48 jam" · "Assigned to Sales · Due today" / "Untuk Sales · Hari ini"; "Post daily ops brief to WhatsApp" / "Kirim ringkasan ops harian ke WhatsApp" · "Runs every day at 08:00" / "Berjalan setiap hari pukul 08.00"
- Card 4: H3 "Smart lead routing" / "Distribusi prospek otomatis"; body EN "Each lead goes to the right person, with the full conversation attached." / ID "Setiap prospek diteruskan ke orang yang tepat, lengkap dengan riwayat percakapannya." Match card: "Best match" / "Paling cocok" · "92% fit" · "Dimas Pratama" · "Sales lead" · "Reply within" / "Balas dalam" "15 min" / "15 mnt"
- Card 5: H3 "Connected tool stack" / "Tools yang saling terhubung"; body EN "Data and actions flow into the tools your team already uses." / ID "Data dan aksi mengalir ke tools yang sudah dipakai tim Anda." Marquee = TOOLS list. Wide pill "+ any tool with an API" / "+ tools apa pun yang punya API"

---

## C. TimelineFeatureDeck (`id="services"`)
- H2: 00 §5 heading. Make the italic gradient part "More room to grow." / "Lebih banyak ruang untuk tumbuh."
- Sub: 00 §5 sub

### MinimalistMotionStage: 4 stages (same durations 4.0/4.5/4.0/4.0)
| Stage | Label / badge EN | Label / badge ID | Content |
|---|---|---|---|
| 1 | Customer asks · 01 Ask | Pelanggan bertanya · 01 Tanya | Calendar header "November 2026", target 12. Slots: "10:00 / Morning class", "13:00 / Recommended", "16:00 / Afternoon class" (ID: "Kelas pagi", "Disarankan", "Kelas sore"). CTA "Book trial" / "Daftar trial". Done: "Trial class booked" / "Kelas percobaan terdaftar" · "Thu, Nov 12 · 13:00" / "Kam, 12 Nov · 13.00" · "WhatsApp" / "Confirmation sent ✓" / "Konfirmasi terkirim ✓" · badge "Booked" / "Terdaftar" |
| 2 | Lead captured · 02 Capture | Prospek tercatat · 02 Catat | H3 "Organizing the inbox" / "Merapikan inbox"; line "Turning chats into leads and tasks." / "Mengubah chat menjadi prospek dan tugas."; 3 floating cards = signal chips from 00 §3 (first 3); progress labels "Leads", "Tasks", "Follow-up" / "Prospek", "Tugas", "Follow-up"; done "All caught up" / "Semua sudah tertangani"; footer "3 of 3 items handled" / "3 dari 3 item tertangani" |
| 3 | Team notified · 03 Notify | Tim diberi tahu · 03 Kabari | H3 "Call summarized" / "Panggilan dirangkum"; line "The voice agent's call is transcribed and sent to your team." / "Panggilan voice agent ditranskrip dan dikirim ke tim Anda."; timecode stays |
| 4 | Quote sent · 04 Quote | Penawaran terkirim · 04 Penawaran | H3 "Proposal ready" / "Proposal siap"; line "Priced from the field request in under 2 minutes." / "Harga dihitung dari permintaan lapangan dalam kurang dari 2 menit."; "Service visit" / "Kunjungan servis" · "Thu, Nov 12" / "Kam, 12 Nov"; label "TOTAL"; amount counts to **$360.00** (ID: same USD, it's a US case); CTA "Send $360.00 quote →" / "Kirim penawaran $360.00 →"; trust "PDF · sent via Gmail" / "PDF · dikirim via Gmail"; badge "Auto" ; done "Quote sent" / "Penawaran terkirim" · "$360.00" · "Copy to CRM" / "Salinan ke CRM" · badge "Sent" / "Terkirim". Replace the unsplash avatars with initials circles (same size). |

### Agent card (was "Meet Velie")
- Title EN "Meet your AI agent" (italic "AI agent") / ID "Kenalan dengan AI agent Anda". Copy chip: `wa.me/6282124747385`, button "Copy" / "Salin" → "Copied!" / "Tersalin!". Subtitle EN "on WhatsApp, answering, qualifying and handing off." / ID "di WhatsApp: menjawab, menyaring, dan meneruskan ke tim."
- 3 modes = use-case tabs from 00 §5: Sales (orb idle), Operations (thinking, default), Customer service (thinking). Under the orb, show the active tab's line (00 §5 use-case table).
- Footer: bold "Human hand-off" / "Eskalasi ke manusia" + EN " – anything unusual goes to your team with the full chat." / ID " – yang tidak biasa diteruskan ke tim lengkap dengan riwayat chat."

### Chart card (was "Your earnings")
- Title "Hours saved" / "Jam dihemat"; tabs "Chats" / "Leads" / "Hand-offs" (ID "Chat" / "Prospek" / "Eskalasi"); big values "31.5 h" / "128" / "9"; dropdown "This week" / "Minggu ini". Bars Mon–Sun (ID Sen–Min):
  - Chats: 3.5, 5.0, 4.2, 6.1, 5.4, 4.0, 3.3 h
  - Leads: 14, 22, 17, 25, 21, 16, 13
  - Hand-offs: 1, 2, 1, 2, 1, 1, 1
- Footer: bold "Example" / "Contoh" + EN " – illustrative numbers for a 6-person team." / ID " – angka ilustrasi untuk tim 6 orang."

---

## D. Logo ticker
- Heading: 00 §4. Sub-line (absorbs FAQ "change tools") EN "No need to switch tools: we connect what you already use." / ID "Tidak perlu ganti tools: kami hubungkan yang sudah Anda pakai."
- 7 wordmarks → 7 tools: WhatsApp, n8n, OpenAI, Claude, Google Sheets, HubSpot, Make. Logo sourcing: see open question Q4.

## E. Integrations (`id="integrations"`)
- H2 EN "Connect Newseed to" + italic "everything you use" / ID "Hubungkan Newseed ke" + italic "semua tools Anda". Sub EN "We build on your existing stack and automate the busywork in between." / ID "Kami membangun di atas tools yang sudah ada dan mengotomasi pekerjaan di antaranya."
- CTA "See tools we work with" / "Lihat tools yang kami pakai" (opens the existing explorer modal)
- Modal title "Tools we build with" / "Tools yang kami gunakan"; sub "Plus anything with an API." / "Plus tools apa pun yang punya API."; search "Search tools..." / "Cari tools..."; categories: All / Messaging / AI models / Data & CRM / Automation (ID: Semua / Pesan / Model AI / Data & CRM / Otomasi); footer "Showing N tools" / "Menampilkan N tools", "Done" / "Selesai". Remove the Connected/Connect toggles (they imply a SaaS).
- Modal entries (15): WhatsApp, Gmail, Slack (messaging); OpenAI, Claude, Gemini (ai); Google Sheets, Notion, HubSpot, Supabase, Airtable (data); n8n, Make, Zapier, Vapi (automation). Each has one desc line, EN/ID, written by the implementer from this pattern: "Answer customers where they already message you" / "Jawab pelanggan di tempat mereka biasa chat". **Reviewer checks these lines.**
- Floating pills (8, same positions): WhatsApp, n8n, Google Sheets / OpenAI, [Newseed centre], HubSpot / Claude, Make, Notion

## F. Engagement (PricingSection, `id="engagement"`)
- H2: 00 §10 heading (italic part "Grow when it pays off." / "Kembangkan saat hasilnya terbukti."). Sub EN "Every engagement starts with a free audit and a fixed scope." / ID "Setiap kerja sama dimulai dengan audit gratis dan cakupan yang disepakati."
- Billing toggle removed.
- **Build** card: price slot "2–4 weeks" / "2–4 minggu", unit "per project" / "per proyek". Tagline = 00 Build text. CTA "Discuss a project" / "Diskusikan proyek" → WhatsApp. Sub "Fixed scope · Milestones" / "Cakupan tetap · Milestone". Heading "Includes:" / "Termasuk:". Features:
  1. Process audit and solution design / Audit proses dan desain solusi
  2. AI agent or workflow built on your tools / AI agent atau workflow di atas tools Anda
  3. Integrations with CRM, Sheets, email / Integrasi dengan CRM, Sheets, email
  4. Testing with real cases / Pengujian dengan kasus nyata
  5. Team training and hand-off docs / Pelatihan tim dan dokumentasi
  6. 30 days of post-launch fixes / 30 hari perbaikan setelah live
  Footer "You own every account and workflow" / "Semua akun dan workflow milik Anda"
- **Grow** card (badge "Most chosen" / "Paling banyak dipilih" **[CONFIRM: is this true? If not, badge = "Ongoing" / "Berkelanjutan"]**): price slot "Monthly" / "Bulanan", unit "retainer". Tagline = 00 Grow text. CTA "Ask about retainers" / "Tanya soal retainer" → WhatsApp. Sub "Cancel anytime" / "Bisa berhenti kapan saja". Heading "Build, plus:" / "Build, ditambah:". Features:
  1. Monitoring and error alerts / Pemantauan dan notifikasi error
  2. Fixes when tools or APIs change / Perbaikan saat tools atau API berubah
  3. New flows each month / Alur baru setiap bulan
  4. Prompt and knowledge-base updates / Pembaruan prompt dan knowledge base
  5. Monthly impact report / Laporan dampak bulanan
  6. Priority WhatsApp support / Dukungan prioritas via WhatsApp
  Footer "Scope reviewed every month" / "Cakupan ditinjau setiap bulan"
- **Audit banner:** EN "Not sure where to start?" / ID "Belum tahu mulai dari mana?" + 00 Audit text + CTA "Book a free audit" / "Jadwalkan audit gratis" → Calendly.

## G. FAQ (4 cards)
Use 00 §11 rows 3, 2, 5, 6 in this order. Tags and badges:
| # | tag EN / ID | badge EN / ID |
|---|---|---|
| 1 Will AI replace my team | Your team / Tim Anda | Human in the loop |
| 2 How long | Timeline / Waktu | 2–4 weeks / 2–4 minggu |
| 3 How much | Pricing / Biaya | Fixed scope / Cakupan tetap |
| 4 Data safe | Data & privacy / Data & privasi | NDA |
- H2 EN "Everything you need to know" + italic "before we start" / ID "Yang perlu Anda tahu" + italic "sebelum mulai"
- Mobile hint "Tap a card" / "Ketuk kartu"; help line EN "Still have a question?" + link "Ask us on WhatsApp" / ID "Masih ada pertanyaan?" + "Tanya via WhatsApp" (WhatsApp link, replaces the dead `#demo`)
- Card logo → Newseed logo (see Q3)

## H. ConnectedAppShellShowcase (`id="process"`)
- Ecosystem nodes (4, same icons) = process steps from 00 §6. Show the step label on each node, and show the active step's line as a caption under the diagram when hovered. Heading above the diagram = 00 §6 heading.
- App shell (all "Example" content):
  - Sidebar logo "Newseed"; nav: Home, Conversations, Workflows, Leads, Reports (ID: Beranda, Percakapan, Workflow, Prospek, Laporan). Upsell card → "Need a new flow?" / "Butuh alur baru?" · "Ask your engineer" / "Tanya engineer Anda".
  - Search "Search chats, leads, or workflows..." / "Cari chat, prospek, atau workflow..."; workspace "Harmoni Studio" / "Workspace"; button "New workflow" / "Workflow baru" (no action, or Calendly).
  - Greeting "Good morning" / "Selamat pagi"; sub "Here's what your automations handled today." / "Ini yang ditangani otomasi Anda hari ini."
  - Metric cards: "Chats handled" 142 ↑20% "today" · "New leads" 28 ↑32% "this week" · "Hours saved" 31.5 ↑18% "this week" · "Hand-offs" 9 "pending" (ID: "Chat ditangani" "hari ini" · "Prospek baru" "minggu ini" · "Jam dihemat" "minggu ini" · "Eskalasi" "menunggu")
  - "Recent runs" / "Proses terbaru" (3 rows, button "View" / "Lihat", reset state "Opened ✓" / "Dibuka ✓"): 09:00 "WhatsApp agent · 142 chats" · 11:00 "Lead sync · 18 new rows" / "Sinkron prospek · 18 baris baru" · 14:00 "Quote flow · 6 PDFs sent" / "Alur penawaran · 6 PDF terkirim". Tool badges instead of Meet/Zoom: WhatsApp, Sheets, Gmail. Avatars → initials.
  - Activity card: "Automation runs" / "Proses otomasi", dropdown "Last 7 days" / "7 hari terakhir", tooltip "412 runs ↑ 40%" / "412 proses ↑ 40%", "Success rate" / "Tingkat sukses" 98%, "Avg. run time" / "Rata-rata durasi" "1m 48s".
- Bottom CTA block = 00 §12: heading, sub, then the agenda as 3 compact rows, then the time-zone row, then the button "Book a free audit" → Calendly and the trust line.

## I. Footer
- H2 EN "Where growing teams" + italic "get their time back" / ID "Tempat tim yang sedang tumbuh" + italic "mendapatkan waktunya kembali"; sub = 00 §13 tagline.
- Columns: **Services** / **Layanan** (4 service titles → #services) · **Company** / **Perusahaan** (Work #work, Process #process, FAQ #faq) · **Contact** / **Kontak** (Book a free audit / Jadwalkan audit gratis → Calendly; WhatsApp; email [CONFIRM]; Back to top / Kembali ke atas)
- Bottom: "© 2026 Newseed". Remove the Privacy/Terms/Cookies dead anchors. Social links: see Q5. The language `<select>` becomes the EN/ID switch (options English / Bahasa Indonesia, wired to `setLang`).

## J. Fills for existing `ID TODO`s
- Process step titles: Audit / Build / Launch / Improve → ID Audit / Bangun / Luncurkan / Tingkatkan
- Engagement names: Audit / Build / Grow stay the same in ID (brand-like). Badges: Free / Project / Retainer → Gratis / Proyek / Retainer
- ROI inputs: "Team members doing admin/ops work" / "Jumlah tim admin/operasional"; "Repetitive hours per person per week" / "Jam kerja repetitif per orang per minggu"; "Average monthly salary" / "Rata-rata gaji bulanan"
- ROI outputs: "Estimated yearly savings" / "Estimasi penghematan per tahun"; "Hours freed per year" / "Jam kerja terbebas per tahun"; "About {x} per month" / "Sekitar {x} per bulan"
- ROI WhatsApp prefill: EN "Hi Newseed, the ROI calculator shows about {cost}/year in savings for my team of {people}. I'd like to talk it through." / ID "Halo Newseed, kalkulator ROI menunjukkan potensi hemat sekitar {cost}/tahun untuk tim saya ({people} orang). Saya ingin diskusi lebih lanjut."
- Demo B columns: Company, Domain, Size, Industry, Contact / Perusahaan, Domain, Ukuran, Industri, Kontak. Companies (fictional): Brightwater Foods, Ironvale Components, Nimbus Retail Group, Alder & Finch, Kestrel Analytics. Filled rows (domain · size · industry · contact role): brightwaterfoods.co · 51–200 · Food & beverage / Makanan & minuman · Head of Procurement; ironvale.io · 201–500 · Manufacturing / Manufaktur · Operations Director; nimbusretail.com · 1,000+ · Retail · VP Partnerships; alderfinch.com · 11–50 · Design agency / Agensi desain · Founder; kestrelanalytics.ai · 51–200 · Data & analytics / Data & analitik · Head of Sales
- Footer headings: see §I.
- FINAL_CTA run-log rows: see §H "Recent runs" (replaces the 00 §12 dashboard list).

---

## Open questions (user)
- **Q1** Approve mapping A1–A8?
- **Q2** Grow badge: "Most chosen" (only if it's true) or "Ongoing"?
- **Q3** Logo: is there a Newseed logo file? If not, keep the current infinity mark and change only the wordmark to "Newseed".
- **Q4** Tool logos: copy official SVGs into `public/logos/` (from the Simple Icons set, CC0) and stop hotlinking Calendly's CDN?
- **Q5** Social links: give real URLs, or remove the icons?
- **Q6** Email for the footer, and consent for the CS1 quote (still open from 00).
