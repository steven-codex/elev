# PRD 00: Content source (EN/ID copy deck)

**Status:** APPROVED by user (2026-11-04). The [CONFIRM] items (CS1 quote consent, footer email) are still open. Render them as placeholders, and they block launch, not coding.
**Owner:** main session (copy). **Implementer:** none. Its content is used by PRDs 01–06.

## Goal
One approved set of all user-facing copy and data, in English and Indonesian. Coding agents copy it as written and don't write or translate copy themselves.

## Voice
- Plain, specific and calm. Write like an engineer talking to an owner, not like a hype deck.
- Name concrete things: WhatsApp, leads, orders, spreadsheets, CRM. Avoid "revolutionize", "unlock", "seamless", "next-gen".
- ID uses natural business Indonesian (Anda), not a literal translation, and doesn't mix in English except for product names and common terms (AI, CRM, workflow).

## Data rules
- Use only the 4 case studies below. Client names are anonymised by industry.
- `actual` = measured by the client. `estimated` = our estimate from the before/after process. The label is always shown.
- Mockup UI numbers (chips, dashboards, chat) are illustrative scene content, not claims. Each mockup has a small "Example" / "Contoh" caption.
- Items marked **[CONFIRM]** need a yes from the user before launch.

---

## 1. Meta / global

| key | EN | ID |
|---|---|---|
| brand | Newseed | Newseed |
| tagline | AI automation & growth systems | Sistem otomasi AI & pertumbuhan bisnis |
| cta.primary | Book a free audit | Jadwalkan audit gratis |
| cta.secondary | Chat on WhatsApp | Chat via WhatsApp |
| cta.see | See how it works | Lihat cara kerjanya |
| example.caption | Example flow. Built around your tools and process. | Contoh alur. Disesuaikan dengan tools dan proses Anda. |
| wa.prefill.default | Hi Newseed, I'd like to talk about automating part of my business. | Halo Newseed, saya ingin diskusi otomasi untuk bisnis saya. |
| lang.switch | EN · ID | EN · ID |

## 2. Navbar
| key | EN | ID |
|---|---|---|
| nav.services | Services | Layanan |
| nav.work | Work | Studi kasus |
| nav.process | Process | Proses |
| nav.faq | FAQ | FAQ |
| nav.cta | Book a free audit | Audit gratis |

Remove Login / Sign up completely.

## 3. Hero
| key | EN | ID |
|---|---|---|
| hero.eyebrow | AI automation for growing teams | Otomasi AI untuk tim yang sedang tumbuh |
| hero.h1 | Your business keeps running. The repetitive work runs itself. | Bisnis terus jalan. Kerja repetitif, biar sistem yang urus. |
| hero.sub | We build AI agents and automations that answer customers on WhatsApp, follow up every lead, and keep your data in sync, so your team works on what actually grows the business. | Kami membangun AI agent dan otomasi yang menjawab pelanggan di WhatsApp, menindaklanjuti setiap prospek, dan menjaga data tetap sinkron, sehingga tim Anda fokus pada pekerjaan yang benar-benar menumbuhkan bisnis. |
| hero.cta1 | Book a free audit | Jadwalkan audit gratis |
| hero.cta2 | See how it works | Lihat cara kerjanya |
| hero.trust | Free 30-min audit · Built on tools you already use · Your team stays in control | Audit gratis 30 menit · Pakai tools yang sudah Anda gunakan · Kendali tetap di tim Anda |

### Hero signal chips (Nalar-style, illustrative)
| EN | ID |
|---|---|
| 38 chats unanswered | 38 chat belum dibalas |
| Lead waiting 4h | Prospek menunggu 4 jam |
| 12 orders not synced | 12 pesanan belum sinkron |
| Weekly report due | Laporan mingguan belum dibuat |

### Hero scenes
These replace the existing scenes one-for-one, in the same order and with the same timing. PRD 02 maps them to the components.

| # | Scene label EN / ID | What the mockup shows |
|---|---|---|
| 1 | Customer asks / Pelanggan bertanya | WhatsApp chat: customer "Hi, is the Saturday class still open?" / "Halo, kelas hari Sabtu masih ada slot?" → AI reply with 2 slots + "Shall I book it?" / "Mau saya daftarkan?" |
| 2 | Lead captured / Prospek tercatat | CRM / Sheets row animating in: Name · Source: WhatsApp · Interest · Status "Qualified" / "Terkualifikasi" |
| 3 | Team notified / Tim diberi tahu | Notification card: "New qualified lead, follow up today" / "Prospek baru terkualifikasi, follow-up hari ini" with assignee avatar + task |
| 4 | Report sent / Laporan terkirim | Daily summary card: chats handled, leads, handed to team (illustrative numbers) |

## 4. Logo ticker (tools, not clients)
Heading EN: "Built on the tools your team already knows" / ID: "Dibangun di atas tools yang sudah dikenal tim Anda"
Items: WhatsApp, n8n, Make, OpenAI, Claude, Gemini, Google Sheets, Notion, HubSpot, Supabase, Gmail, Vapi

## 5. Services (TimelineFeatureDeck, 4 cards)
Section eyebrow EN "What we build" / ID "Yang kami bangun"
Heading EN: "Less manual work. More room to grow." / ID: "Lebih sedikit kerja manual. Lebih banyak ruang untuk tumbuh."
Sub EN: "Start with the one process that eats the most time. Connect the rest when you're ready." / ID: "Mulai dari satu proses yang paling menyita waktu. Hubungkan sisanya saat Anda siap."

| # | Title EN / ID | Body EN | Body ID | Example triggers (EN / ID) |
|---|---|---|---|---|
| 1 | AI agents & WhatsApp / AI agent & WhatsApp | An assistant that knows your business, answers customers around the clock, and hands complex cases to your team with the full conversation. | Asisten yang memahami bisnis Anda, menjawab pelanggan 24 jam, dan meneruskan kasus rumit ke tim lengkap dengan riwayat percakapannya. | "Answer pricing questions" / "Jawab pertanyaan harga"; "Book a trial class" / "Daftarkan kelas percobaan" |
| 2 | Workflow automation / Otomasi alur kerja | From order intake to recurring reports: repetitive work runs on the rules you set. | Dari input pesanan sampai laporan rutin, pekerjaan berulang berjalan sesuai aturan yang Anda tentukan. | "Turn a form into a priced PDF quote" / "Ubah formulir jadi penawaran PDF"; "Send the daily ops brief" / "Kirim ringkasan operasional harian" |
| 3 | Integrations & data / Integrasi aplikasi & data | Connect CRM, email, spreadsheets and databases so information moves without copy-paste. | Hubungkan CRM, email, spreadsheet, dan database agar informasi mengalir tanpa copy-paste. | "Sync 100k rows in real time" / "Sinkronkan 100 ribu baris secara real-time"; "Enrich a lead list" / "Lengkapi data daftar prospek" |
| 4 | Audit & AI training / Audit & pelatihan AI | We map your processes, rank what's worth automating, and train your team to use AI in daily work. | Kami petakan proses Anda, urutkan mana yang paling layak diotomasi, dan latih tim memakai AI dalam pekerjaan sehari-hari. | "Find the top 3 time sinks" / "Temukan 3 proses paling boros waktu"; "Team AI workshop" / "Workshop AI untuk tim" |

### Use-case tabs (Nalar-style, inside Services or Hero; PRD 03 decides placement)
| Tab EN / ID | Line EN | Line ID |
|---|---|---|
| Sales / Sales | Every lead gets a reply in minutes and lands in your CRM, tagged and ready for follow-up. | Setiap prospek dibalas dalam hitungan menit dan masuk CRM, sudah diberi tag dan siap di-follow-up. |
| Operations / Operasional | Orders, stock and reports move between apps on their own, on schedule. | Pesanan, stok, dan laporan berpindah antar aplikasi secara otomatis, sesuai jadwal. |
| Customer service / Customer service | Routine questions answered from your own guides. Anything unusual goes to a person. | Pertanyaan rutin dijawab dari panduan bisnis Anda. Yang tidak biasa diteruskan ke manusia. |

## 6. Process (4 steps)
Heading EN "From first call to live system" / ID "Dari obrolan pertama sampai sistem berjalan"
| # | EN | ID |
|---|---|---|
| 01 Audit | We map the processes that cost you the most time and agree on what to build first. | Kami petakan proses yang paling menyita waktu dan sepakati apa yang dibangun lebih dulu. |
| 02 Build | We build on your existing tools, typically in 2–4 weeks, with you reviewing as we go. | Kami bangun di atas tools yang sudah ada, umumnya 2–4 minggu, dan Anda ikut meninjau prosesnya. |
| 03 Launch | We test with real cases, train your team, and switch it on with human hand-off in place. | Kami uji dengan kasus nyata, latih tim Anda, lalu aktifkan dengan jalur eskalasi ke manusia. |
| 04 Improve | We monitor, fix and adjust the flows as your business changes. | Kami pantau, perbaiki, dan sesuaikan alur saat bisnis Anda berubah. |

## 7. Case studies (4)
Eyebrow EN "Work" / ID "Studi kasus". Heading EN "Systems we built, running in real businesses" / ID "Sistem yang kami bangun, berjalan di bisnis nyata"
Footnote EN: "actual = measured by the client · estimated = our estimate from the before/after process" / ID: "aktual = diukur oleh klien · estimasi = perkiraan kami dari proses sebelum/sesudah"

**CS1: Music school, Indonesia · WhatsApp AI assistant** (Sekolah musik, Indonesia · Asisten AI WhatsApp)
- Problem EN: Around 100 WhatsApp chats a day from prospective students, all answered by hand: schedules, prices, which class fits. Messages after hours waited until the next day.
- Problem ID: Sekitar 100 chat WhatsApp per hari dari calon murid, semuanya dibalas manual: jadwal, harga, kelas yang cocok. Pesan di luar jam kerja baru dibalas keesokan harinya.
- Metrics: **4x** daily handling capacity / kapasitas penanganan harian (actual) · **1,050+** prospects handled / prospek tertangani (actual) · **400+** registrations / pendaftaran (actual) · **~75%** staff triage time saved / waktu triase staf dihemat (estimated)
- Built with: n8n, WAHA, Google Sheets, GPT-4o
- Quote **[CONFIRM consent]**: EN "We used to handle around 100 customers a day on WhatsApp. Now the assistant does, and we focus elsewhere." / ID "Dulu kami menangani sekitar 100 pelanggan per hari di WhatsApp. Sekarang asisten yang menangani, kami fokus ke hal lain." (Director, music school / Direktur, sekolah musik)

**CS2: Call operations, international · AI voice agent** (Operasional panggilan, internasional · AI voice agent)
- Problem EN: Inbound and outbound calls depended on someone being free. After hours nobody picked up, and quality varied by who answered.
- Problem ID: Panggilan masuk dan keluar bergantung pada siapa yang sedang senggang. Di luar jam kerja tidak ada yang mengangkat, dan kualitasnya tergantung siapa yang menjawab.
- Metrics: **2-way** inbound + outbound calls / panggilan masuk & keluar (actual) · **24/7** availability / ketersediaan (actual)
- Built with: n8n, Vapi, OpenAI

**CS3: Machinery distributor, international · Supplier data sync** (Distributor mesin, internasional · Sinkronisasi data supplier)
- Problem EN: Supplier data was split between a database and spreadsheets, far more rows than anyone could maintain by hand. When one side changed, the other went stale.
- Problem ID: Data supplier terpisah antara database dan spreadsheet, jumlah barisnya jauh melampaui yang bisa dikelola manual. Begitu satu sisi berubah, sisi lain langsung usang.
- Metrics: **100k+** supplier rows managed / baris data supplier dikelola (actual) · **Real-time** sync / sinkronisasi (actual) · **~90%** data-handling time saved / waktu pengelolaan data dihemat (estimated)
- Built with: n8n, Database, Google Sheets

**CS4: HVAC field services, US · Quotation automation** (Layanan HVAC, AS · Otomasi penawaran harga)
- Problem EN: Every field request needed someone in the office to read it, price it, build a proposal and send it. Output was capped by one person's speed.
- Problem ID: Setiap permintaan dari lapangan harus dibaca, dihitung harganya, dibuatkan proposal, lalu dikirim oleh staf kantor. Jumlah penawaran per hari dibatasi kecepatan satu orang.
- Flow: Form submitted → AI extracts data → Pricing + markup → PDF generated → Sent to client / Formulir masuk → AI ekstrak data → Harga + markup dihitung → PDF dibuat → Dikirim ke klien
- Metrics: **<2 min** form to sent proposal / dari formulir ke proposal terkirim (actual) · **90%** proposal creation time cut / waktu pembuatan proposal dipangkas (actual) · **3x** proposals per technician per day / proposal per teknisi per hari (actual)
- Built with: n8n, Gmail, Supabase, Google Sheets, Gemini

## 8. Interactive demos (scripted, no API)
**Demo A: WhatsApp assistant** (uses the CS1 pattern, fictional business "Harmoni Music Studio")
Suggested chips: "Which class suits an 8-year-old?" / "Kelas apa yang cocok untuk anak 8 tahun?" · "What are the prices?" / "Berapa biayanya?" · "Can I book a trial?" / "Bisa daftar kelas percobaan?"
Each chip plays one scripted reply (PRD 04 holds the full script). Last step shows "Handed to team: registration confirmed" / "Diteruskan ke tim: pendaftaran dikonfirmasi".
Caption: "Scripted demo with fictional data." / "Demo dengan skrip dan data fiktif."

**Demo B: Lead enrichment table**
Input column: 5 fictional company names. Button "Enrich list" / "Lengkapi data". Rows fill in turn: Domain · Size · Industry · Contact role.
Caption EN: "Input is just the company name. Every other column fills automatically." / ID: "Input hanya nama perusahaan. Kolom lainnya terisi otomatis."

## 9. ROI calculator
Heading EN "What is repetitive work costing you?" / ID "Berapa biaya kerja repetitif di bisnis Anda?"
Inputs: Team members doing admin/ops work (1–50, default 6) · Hours of repetitive work per person per week (2–30, default 10) · Average monthly salary (EN: USD 500–8,000, default 1,500 · ID: Rp 3.500.000–25.000.000, default 6.500.000)
Formula (shown): `hours_saved_per_year = people × hours_per_week × 52 × 0.60` and `cost_saved_per_year = people × monthly_salary × 12 × (hours_per_week / 40) × 0.60`
Assumption line EN: "Assumes about 60% of repetitive work can be automated. This is an estimate, not a quote." / ID: "Asumsi sekitar 60% kerja repetitif dapat diotomasi. Ini estimasi, bukan penawaran harga."
CTA: "Talk through these numbers" / "Bahas angka ini bersama kami". It opens WhatsApp prefilled with the result in the active language.

## 10. Engagement (replaces 4-plan pricing, 3 cards, no prices)
Heading EN "Start small. Grow when it pays off." / ID "Mulai kecil. Kembangkan saat hasilnya terbukti."
| Card | EN | ID | CTA |
|---|---|---|---|
| Audit (Free / Gratis) | 30-minute call. We map your bottlenecks and tell you what's worth automating, even if it's not us who builds it. | Sesi 30 menit. Kami petakan hambatan Anda dan tunjukkan apa yang layak diotomasi, meski bukan kami yang membangunnya. | Book audit / Jadwalkan audit |
| Build (Project / Proyek), highlighted | A scoped project with clear milestones, usually live in 2–4 weeks. Fixed scope agreed before we start. | Proyek dengan cakupan dan milestone jelas, umumnya live dalam 2–4 minggu. Cakupan disepakati sebelum mulai. | Discuss a project / Diskusikan proyek |
| Grow (Retainer / Retainer) | Monitoring, fixes and new flows each month as your business changes. | Pemantauan, perbaikan, dan alur baru setiap bulan seiring bisnis Anda berubah. | Ask about retainers / Tanya soal retainer |

## 11. FAQ (6)
| Q EN / ID | A EN | A ID |
|---|---|---|
| What kind of businesses do you work with? / Bisnis seperti apa yang cocok? | Small and mid-sized teams with a lot of repeated work: customer chats, lead follow-up, order and data handling. We've built for education, property, distribution and field services. | Tim kecil hingga menengah dengan banyak pekerjaan berulang: chat pelanggan, follow-up prospek, pengelolaan pesanan dan data. Kami sudah membangun untuk pendidikan, properti, distribusi, dan layanan lapangan. |
| How long does a project take? / Berapa lama pengerjaannya? | Most first systems go live in 2–4 weeks. The audit tells you the real timeline before you commit. | Sebagian besar sistem pertama live dalam 2–4 minggu. Audit akan memberi gambaran waktu yang pasti sebelum Anda memutuskan. |
| Will AI replace my team? / Apakah AI akan menggantikan tim saya? | No. It takes the repetitive part. Your team keeps the decisions, and every flow has a hand-off to a person. | Tidak. AI mengambil bagian yang repetitif. Keputusan tetap di tim Anda, dan setiap alur punya jalur eskalasi ke manusia. |
| Do I need to change my tools? / Apakah saya harus ganti tools? | Usually not. We connect what you already use: WhatsApp, Sheets, your CRM, email. | Umumnya tidak. Kami hubungkan yang sudah Anda pakai: WhatsApp, Sheets, CRM, email. |
| How much does it cost? / Berapa biayanya? | It depends on scope. After the free audit you get a fixed-scope proposal, so you know the price before anything is built. | Tergantung cakupan. Setelah audit gratis Anda menerima proposal dengan cakupan tetap, jadi harga sudah jelas sebelum apa pun dibangun. |
| Is my data safe? / Apakah data saya aman? | We work under NDA, use your own accounts where possible, and only access what the flow needs. | Kami bekerja di bawah NDA, memakai akun milik Anda bila memungkinkan, dan hanya mengakses data yang dibutuhkan alur. |

## 12. Final CTA (AppShell section)
Heading EN "Book a 30-minute audit" / ID "Jadwalkan audit 30 menit"
Sub EN "Talk directly with the engineer who'd build it. No sales script." / ID "Bicara langsung dengan engineer yang akan membangunnya. Tanpa naskah sales."
Agenda:
1. EN "Map your bottlenecks" / ID "Petakan hambatan proses"
2. EN "Pick the right approach: workflow, AI agent or direct integration" / ID "Tentukan pendekatan: workflow, AI agent, atau integrasi langsung"
3. EN "Leave with a scoped plan and timeline" / ID "Pulang dengan rencana dan estimasi waktu yang jelas"
Time zones row: Jakarta (WIB) · Singapore (SGT) · Dubai (GST) · London · New York
Trust line EN "NDA on request · Free · 30 minutes" / ID "NDA bila diperlukan · Gratis · 30 menit"

Dashboard mockup (illustrative, "Example" caption): run log rows such as "WhatsApp agent · 142 chats handled today", "Lead sync · 18 new rows", "Quote flow · 6 PDFs sent", "Handed to team · 9".

## 13. Footer
Tagline EN "AI automation & growth systems for teams that would rather grow than copy-paste." / ID "Sistem otomasi AI untuk tim yang lebih memilih tumbuh daripada copy-paste."
Columns: Services (4 service titles) · Company (Work, Process, FAQ) · Contact (Book audit, WhatsApp, email **[CONFIRM address]**)
Bottom: "© 2026 Newseed"

## Open items for the user
1. Client quote in CS1: is there consent to use it (role only, no name)?
2. Contact email for the footer.
3. Copy approval for sections 1–13 as a whole.
