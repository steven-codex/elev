import type { L } from '../i18n';

export interface CaseMetric {
  value: string;
  label: L;
  basis: 'actual' | 'estimated';
}

export interface CaseStudy {
  industry: L;
  title: L;
  problem: L;
  metrics: CaseMetric[];
  builtWith: string[];
  flow?: L<string[]>;
  quote?: { text: L; by: L; confirm: boolean }; // confirm: true hides the quote until consent, PRD 00 open item 1
}

export const SITE = {
  brand: 'Newseed',
  tagline: { en: 'AI automation & growth systems', id: 'Sistem otomasi AI & pertumbuhan bisnis' },
  calendly: 'https://calendly.com/stevenal021200/30min',
  whatsapp: (text: string) => `https://wa.me/6282124747385?text=${encodeURIComponent(text)}`,
  email: '[CONFIRM] contact email', // PRD 00 open item 2
  cta: {
    primary: { en: 'Book a free audit', id: 'Jadwalkan audit gratis' },
    secondary: { en: 'Chat on WhatsApp', id: 'Chat via WhatsApp' },
    see: { en: 'See how it works', id: 'Lihat cara kerjanya' },
  },
  example: { en: 'Example', id: 'Contoh' },
  exampleCaption: {
    en: 'Example flow. Built around your tools and process.',
    id: 'Contoh alur. Disesuaikan dengan tools dan proses Anda.',
  },
  waPrefillDefault: {
    en: "Hi Newseed, I'd like to talk about automating part of my business.",
    id: 'Halo Newseed, saya ingin diskusi otomasi untuk bisnis saya.',
  },
  langSwitch: { en: 'EN · ID', id: 'EN · ID' },
  // Accessible names, titles and control labels (EN / ID).
  a11y: {
    playAgain: { en: 'Play again', id: 'Putar lagi' },
    homeLink: { en: 'Newseed home', id: 'Beranda Newseed' },
    language: { en: 'Language', id: 'Bahasa' },
    menuToggle: { en: 'Toggle navigation menu', id: 'Buka atau tutup menu navigasi' },
    showItem: { en: 'Show item', id: 'Tampilkan item' },
    play: { en: 'Play (Space)', id: 'Putar (Spasi)' },
    pause: { en: 'Pause (Space)', id: 'Jeda (Spasi)' },
    prevStage: { en: 'Previous stage', id: 'Tahap sebelumnya' },
    nextStage: { en: 'Next stage', id: 'Tahap berikutnya' },
    reset: { en: 'Reset to 0:00', id: 'Atur ulang ke 0:00' },
    speed: { en: 'Playback speed (0.25x slow-mo, 0.5x, 1x, 2x)', id: 'Kecepatan putar (0,25x slow-mo, 0,5x, 1x, 2x)' },
    loop: { en: 'Toggle continuous looping', id: 'Aktifkan atau nonaktifkan pengulangan' },
    scrubber: { en: 'Scene timeline', id: 'Linimasa adegan' },
    closeDialog: { en: 'Close', id: 'Tutup' },
    caseStudies: { en: 'Case studies', id: 'Studi kasus' },
  },
  meta: {
    title: {
      en: 'AI Automation & WhatsApp AI Agents for Growing Businesses | Newseed',
      id: 'Otomasi AI & AI Agent WhatsApp untuk Bisnis yang Bertumbuh | Newseed',
    },
    description: {
      en: 'Newseed builds AI agents and workflow automations that answer customers on WhatsApp, follow up every lead and keep your data in sync. Free 30-minute audit.',
      id: 'Newseed membangun AI agent dan otomasi alur kerja yang menjawab pelanggan di WhatsApp, menindaklanjuti setiap prospek, dan menjaga data tetap sinkron. Audit gratis 30 menit.',
    },
    ogLocale: { en: 'en_US', id: 'id_ID' },
    url: { en: 'https://www.newseedglobal.com/', id: 'https://www.newseedglobal.com/id' },
  },
};

export const NAV = {
  items: [
    { label: { en: 'Services', id: 'Layanan' }, href: '#services' },
    { label: { en: 'Work', id: 'Studi kasus' }, href: '#work' },
    { label: { en: 'Process', id: 'Proses' }, href: '#process' },
    { label: { en: 'FAQ', id: 'FAQ' }, href: '#faq' },
  ],
  cta: { en: 'Book a free audit', id: 'Audit gratis' },
};

export const HERO = {
  eyebrow: { en: 'AI automation for growing teams', id: 'Otomasi AI untuk tim yang sedang tumbuh' },
  h1Lead: { en: 'Your business keeps running.', id: 'Bisnis terus jalan.' },
  h1Accent: { en: 'The repetitive work runs itself.', id: 'Kerja repetitif, biar sistem yang urus.' },
  sub: {
    en: 'We build AI agents and automations that answer customers on WhatsApp, follow up every lead, and keep your data in sync, so your team works on what actually grows the business.',
    id: 'Kami membangun AI agent dan otomasi yang menjawab pelanggan di WhatsApp, menindaklanjuti setiap prospek, dan menjaga data tetap sinkron, sehingga tim Anda fokus pada pekerjaan yang benar-benar menumbuhkan bisnis.',
  },
  cta1: { en: 'Book a free audit', id: 'Jadwalkan audit gratis' },
  cta2: { en: 'See how it works', id: 'Lihat cara kerjanya' },
  trust: {
    en: 'Free 30-min audit · Built for education, property, distribution and field services · Your team stays in control',
    id: 'Audit gratis 30 menit · Untuk pendidikan, properti, distribusi, dan layanan lapangan · Kendali tetap di tim Anda',
  },
  chips: [
    { en: '38 chats unanswered', id: '38 chat belum dibalas' },
    { en: 'Lead waiting 4h', id: 'Prospek menunggu 4 jam' },
    { en: '12 orders not synced', id: '12 pesanan belum sinkron' },
    { en: 'Weekly report due', id: 'Laporan mingguan belum dibuat' },
  ],

  // Dock tab labels, keyed by the dock tab id. The tab order, icons and default tab live in the component.
  // Each tab's heading and body come from SERVICES.items (see TAB_SERVICE in MultiProductHero).
  dock: {
    scheduling: { en: 'Audit', id: 'Audit' },
    velie: { en: 'AI agent', id: 'AI agent' },
    notetaker: { en: 'Data sync', id: 'Sinkron data' },
    payments: { en: 'Workflows', id: 'Workflow' },
  },
  talkAbout: { en: 'Talk about this', id: 'Diskusikan ini' },
  // {service} is replaced with the service title.
  talkPrefill: {
    en: "Hi Newseed, I'd like to talk about {service}",
    id: 'Halo Newseed, saya ingin diskusi soal {service}',
  },

  // Stage: AI agent (3 WhatsApp conversations). Avatars are initials.
  chats: [
    {
      avatar: 'R',
      client: { en: 'Hi, is the Saturday trial class still open?', id: 'Halo, kelas percobaan Sabtu masih ada?' },
      reply: { en: 'Yes, 10:00 or 13:00. Shall I book 10:00 for you?', id: 'Masih, jam 10.00 atau 13.00. Mau saya daftarkan yang 10.00?' },
      tag: { en: 'Trial booked · Qualified', id: 'Trial terdaftar · Terkualifikasi' },
    },
    {
      avatar: 'B',
      client: { en: 'Can you send pricing for 20 units?', id: 'Bisa kirim harga untuk 20 unit?' },
      reply: {
        en: "Sent. I've also passed this to our sales team for a custom quote.",
        id: 'Sudah saya kirim. Permintaan ini juga saya teruskan ke tim sales untuk penawaran khusus.',
      },
      tag: { en: '20 units · High intent', id: '20 unit · Minat tinggi' },
    },
    {
      avatar: 'M',
      client: { en: "My order hasn't arrived, can someone help?", id: 'Pesanan saya belum sampai, bisa dibantu?' },
      reply: {
        en: "I've checked. It's delayed, so I'm connecting you to our team now.",
        id: 'Sudah saya cek, pengirimannya tertunda. Saya hubungkan ke tim kami sekarang.',
      },
      tag: { en: 'Handed to team', id: 'Diteruskan ke tim' },
    },
  ],

  // Stage: Workflows (quote flow). Same 5 scenes and 11.2s timeline.
  quote: {
    header: { en: 'Quote automation', id: 'Otomasi penawaran' },
    markup: { en: 'Markup %', id: 'Markup %' },
    priced: { en: '✓ Priced', id: '✓ Harga dihitung' },
    output: { en: 'Output', id: 'Output' },
    outputValue: { en: 'PDF proposal', id: 'Proposal PDF' },
    client: 'Cool Air HVAC',
    proposal: { en: 'Proposal #1042', id: 'Proposal #1042' },
    total: { en: 'Total', id: 'Total' },
    generated: { en: 'Generated in 1m 48s', id: 'Dibuat dalam 1 mnt 48 dtk' },
    channel: { en: 'PDF · Gmail', id: 'PDF · Gmail' },
    autoSend: { en: 'Auto-send to client', id: 'Kirim otomatis ke klien' },
    sent: { en: 'Sent', id: 'Terkirim' },
  },

  // Stage: Data sync (3 stacked sync events).
  sync: {
    header: { en: 'Live sync log', id: 'Log sinkron langsung' },
    badge: { en: 'Auto-sync', id: 'Auto-sync' },
    status: { en: 'Syncing...', id: 'Menyinkronkan...' },
    active: { en: 'Active sync', id: 'Sinkron aktif' },
    events: [
      {
        title: { en: 'CRM updated', id: 'CRM diperbarui' },
        text: { en: 'New lead from WhatsApp tagged Qualified', id: 'Prospek baru dari WhatsApp ditandai Terkualifikasi' },
        subtext: { en: 'HubSpot · 1.2s', id: 'HubSpot · 1.2s' },
        badge: { en: 'Synced', id: 'Tersinkron' },
      },
      {
        title: { en: 'Sheet synced', id: 'Sheet tersinkron' },
        text: { en: '18 new supplier rows matched to database', id: '18 baris supplier baru dicocokkan ke database' },
        subtext: { en: 'Google Sheets', id: 'Google Sheets' },
        badge: { en: 'Real-time', id: 'Real-time' },
      },
      {
        title: { en: 'Daily brief sent', id: 'Ringkasan harian terkirim' },
        text: { en: 'Ops summary delivered to the owner on WhatsApp', id: 'Ringkasan operasional dikirim ke owner via WhatsApp' },
        subtext: { en: '08:00', id: '08:00' },
        badge: { en: 'Sent', id: 'Terkirim' },
      },
    ],
  },

  // Stage: Audit (calendar loop booking the free audit).
  calendar: {
    weekdays: { en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], id: ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'] },
    month: { en: 'November 2026', id: 'November 2026' },
    day: { en: 'Thursday', id: 'Kamis' },
    date: { en: 'November 12, 2026', id: '12 November 2026' },
    slotsOpen: { en: '2 slots open', id: '2 slot tersedia' },
    slots: ['10:00', '14:00'],
    booked: { en: 'Booked', id: 'Terjadwal' },
    toast: { en: 'Audit booked', id: 'Audit terjadwal' },
  },

  // Hero bento (3 cards).
  bento: {
    followUp: {
      title: { en: 'Follow-up automation', id: 'Otomasi follow-up' },
      sub: { en: 'that clears the backlog', id: 'yang membereskan antrean' },
      url: 'newseedglobal.com/flows',
      tasks: [
        {
          text: { en: 'Send quote reminder after 48h', id: 'Kirim pengingat penawaran setelah 48 jam' },
          meta: { en: 'Assigned to Sales · Due today', id: 'Untuk Sales · Hari ini' },
        },
        {
          text: { en: 'Post daily ops brief to WhatsApp', id: 'Kirim ringkasan ops harian ke WhatsApp' },
          meta: { en: 'Runs every day at 08:00', id: 'Berjalan setiap hari pukul 08.00' },
        },
      ],
    },
    routing: {
      title: { en: 'Smart lead routing', id: 'Distribusi prospek otomatis' },
      body: {
        en: 'Each lead goes to the right person, with the full conversation attached.',
        id: 'Setiap prospek diteruskan ke orang yang tepat, lengkap dengan riwayat percakapannya.',
      },
      match: { en: 'Best match', id: 'Paling cocok' },
      fit: { en: '92% fit', id: '92% fit' },
      person: 'Dimas Pratama',
      role: { en: 'Sales lead', id: 'Sales lead' },
      replyIn: { en: 'Reply within', id: 'Balas dalam' },
      replyTime: { en: '15 min', id: '15 mnt' },
      history: { en: 'Full chat attached', id: 'Riwayat chat terlampir' },
    },
    stack: {
      title: { en: 'Connected tool stack', id: 'Tools yang saling terhubung' },
      body: {
        en: 'Data and actions flow into the tools your team already uses.',
        id: 'Data dan aksi mengalir ke tools yang sudah dipakai tim Anda.',
      },
      wide: { en: 'any tool with an API', id: 'tools apa pun yang punya API' },
    },
  },
};

export const TOOLS = {
  heading: {
    en: 'Built on the tools your team already knows',
    id: 'Dibangun di atas tools yang sudah dikenal tim Anda',
  },
  sub: {
    en: 'No need to switch tools: we connect what you already use.',
    id: 'Tidak perlu ganti tools: kami hubungkan yang sudah Anda pakai.',
  },
  items: ['WhatsApp', 'n8n', 'Make', 'OpenAI', 'Claude', 'Gemini', 'Google Sheets', 'Notion', 'HubSpot', 'Supabase', 'Gmail', 'Vapi'],
  // Logo ticker wordmarks (7 of the tools above).
  logos: ['WhatsApp', 'n8n', 'OpenAI', 'Claude', 'Google Sheets', 'HubSpot', 'Make'],
};

export const SERVICES = {
  eyebrow: { en: 'What we build', id: 'Yang kami bangun' },
  // Heading is split so the second sentence can take the italic gradient span.
  heading: {
    lead: { en: 'Less manual work.', id: 'Lebih sedikit kerja manual.' },
    accent: { en: 'More room to grow.', id: 'Lebih banyak ruang untuk tumbuh.' },
  },
  sub: {
    en: "Start with the one process that eats the most time. Connect the rest when you're ready.",
    id: 'Mulai dari satu proses yang paling menyita waktu. Hubungkan sisanya saat Anda siap.',
  },
  items: [
    {
      title: { en: 'AI agents & WhatsApp', id: 'AI agent & WhatsApp' },
      body: {
        en: 'An assistant that knows your business, answers customers around the clock, and hands complex cases to your team with the full conversation.',
        id: 'Asisten yang memahami bisnis Anda, menjawab pelanggan 24 jam, dan meneruskan kasus rumit ke tim lengkap dengan riwayat percakapannya.',
      },
      triggers: [
        { en: 'Answer pricing questions', id: 'Jawab pertanyaan harga' },
        { en: 'Book a trial class', id: 'Daftarkan kelas percobaan' },
      ],
    },
    {
      title: { en: 'Workflow automation', id: 'Otomasi alur kerja' },
      body: {
        en: 'From order intake to recurring reports: repetitive work runs on the rules you set.',
        id: 'Dari input pesanan sampai laporan rutin, pekerjaan berulang berjalan sesuai aturan yang Anda tentukan.',
      },
      triggers: [
        { en: 'Turn a form into a priced PDF quote', id: 'Ubah formulir jadi penawaran PDF' },
        { en: 'Send the daily ops brief', id: 'Kirim ringkasan operasional harian' },
      ],
    },
    {
      title: { en: 'Integrations & data', id: 'Integrasi aplikasi & data' },
      body: {
        en: 'Connect CRM, email, spreadsheets and databases so information moves without copy-paste.',
        id: 'Hubungkan CRM, email, spreadsheet, dan database agar informasi mengalir tanpa copy-paste.',
      },
      triggers: [
        { en: 'Sync 100k rows in real time', id: 'Sinkronkan 100 ribu baris secara real-time' },
        { en: 'Enrich a lead list', id: 'Lengkapi data daftar prospek' },
      ],
    },
    {
      title: { en: 'Audit & AI training', id: 'Audit & pelatihan AI' },
      body: {
        en: "We map your processes, rank what's worth automating, and train your team to use AI in daily work.",
        id: 'Kami petakan proses Anda, urutkan mana yang paling layak diotomasi, dan latih tim memakai AI dalam pekerjaan sehari-hari.',
      },
      triggers: [
        { en: 'Find the top 3 time sinks', id: 'Temukan 3 proses paling boros waktu' },
        { en: 'Team AI workshop', id: 'Workshop AI untuk tim' },
      ],
    },
  ],
};

export const USE_CASES = {
  tabs: [
    {
      name: { en: 'Sales', id: 'Sales' },
      line: {
        en: 'Every lead gets a reply in minutes and lands in your CRM, tagged and ready for follow-up.',
        id: 'Setiap prospek dibalas dalam hitungan menit dan masuk CRM, sudah diberi tag dan siap di-follow-up.',
      },
    },
    {
      name: { en: 'Operations', id: 'Operasional' },
      line: {
        en: 'Orders, stock and reports move between apps on their own, on schedule.',
        id: 'Pesanan, stok, dan laporan berpindah antar aplikasi secara otomatis, sesuai jadwal.',
      },
    },
    {
      name: { en: 'Customer service', id: 'Customer service' },
      line: {
        en: 'Routine questions answered from your own guides. Anything unusual goes to a person.',
        id: 'Pertanyaan rutin dijawab dari panduan bisnis Anda. Yang tidak biasa diteruskan ke manusia.',
      },
    },
  ],
};

export const PROCESS = {
  heading: { en: 'From first call to live system', id: 'Dari obrolan pertama sampai sistem berjalan' },
  steps: [
    {
      num: '01',
      title: { en: 'Audit', id: 'Audit' },
      body: {
        en: 'We map the processes that cost you the most time and agree on what to build first.',
        id: 'Kami petakan proses yang paling menyita waktu dan sepakati apa yang dibangun lebih dulu.',
      },
    },
    {
      num: '02',
      title: { en: 'Build', id: 'Bangun' },
      body: {
        en: 'We build on your existing tools, typically in 2–4 weeks, with you reviewing as we go.',
        id: 'Kami bangun di atas tools yang sudah ada, umumnya 2–4 minggu, dan Anda ikut meninjau prosesnya.',
      },
    },
    {
      num: '03',
      title: { en: 'Launch', id: 'Luncurkan' },
      body: {
        en: 'We test with real cases, train your team, and switch it on with human hand-off in place.',
        id: 'Kami uji dengan kasus nyata, latih tim Anda, lalu aktifkan dengan jalur eskalasi ke manusia.',
      },
    },
    {
      num: '04',
      title: { en: 'Improve', id: 'Tingkatkan' },
      body: {
        en: 'We monitor, fix and adjust the flows as your business changes.',
        id: 'Kami pantau, perbaiki, dan sesuaikan alur saat bisnis Anda berubah.',
      },
    },
  ],
};

export const CASE_STUDIES = {
  eyebrow: { en: 'Work', id: 'Studi kasus' },
  // H2 split so the second part can carry the italic gradient span. Joined with a space.
  headingLead: { en: 'Systems we built,', id: 'Sistem yang kami bangun,' },
  headingAccent: { en: 'running in real businesses', id: 'berjalan di bisnis nyata' },
  footnote: {
    en: 'actual = measured by the client · estimated = our estimate from the before/after process',
    id: 'aktual = diukur oleh klien · estimasi = perkiraan kami dari proses sebelum/sesudah',
  },
  basis: {
    actual: { en: 'actual', id: 'aktual' },
    estimated: { en: 'estimated', id: 'estimasi' },
  },
  // Labels for the detail panel. Not in PRD 00: written for this section, see report.
  labels: {
    problem: { en: 'Problem', id: 'Masalah' },
    builtWith: { en: 'Built with', id: 'Dibangun dengan' },
  },
  demosHeading: { en: 'Try it yourself', id: 'Coba sendiri' },
  items: [
    {
      industry: { en: 'Music school, Indonesia', id: 'Sekolah musik, Indonesia' },
      title: { en: 'WhatsApp AI assistant', id: 'Asisten AI WhatsApp' },
      problem: {
        en: 'Around 100 WhatsApp chats a day from prospective students, all answered by hand: schedules, prices, which class fits. Messages after hours waited until the next day.',
        id: 'Sekitar 100 chat WhatsApp per hari dari calon murid, semuanya dibalas manual: jadwal, harga, kelas yang cocok. Pesan di luar jam kerja baru dibalas keesokan harinya.',
      },
      metrics: [
        { value: '4x', label: { en: 'daily handling capacity', id: 'kapasitas penanganan harian' }, basis: 'actual' },
        { value: '1,050+', label: { en: 'prospects handled', id: 'prospek tertangani' }, basis: 'actual' },
        { value: '400+', label: { en: 'registrations', id: 'pendaftaran' }, basis: 'actual' },
        { value: '~75%', label: { en: 'staff triage time saved', id: 'waktu triase staf dihemat' }, basis: 'estimated' },
      ],
      builtWith: ['n8n', 'WAHA', 'Google Sheets', 'GPT-4o'],
      quote: {
        text: {
          en: 'We used to handle around 100 customers a day on WhatsApp. Now the assistant does, and we focus elsewhere.',
          id: 'Dulu kami menangani sekitar 100 pelanggan per hari di WhatsApp. Sekarang asisten yang menangani, kami fokus ke hal lain.',
        },
        by: { en: 'Director, music school', id: 'Direktur, sekolah musik' },
        confirm: true,
      },
    },
    {
      industry: { en: 'Call operations, international', id: 'Operasional panggilan, internasional' },
      title: { en: 'AI voice agent', id: 'AI voice agent' },
      problem: {
        en: 'Inbound and outbound calls depended on someone being free. After hours nobody picked up, and quality varied by who answered.',
        id: 'Panggilan masuk dan keluar bergantung pada siapa yang sedang senggang. Di luar jam kerja tidak ada yang mengangkat, dan kualitasnya tergantung siapa yang menjawab.',
      },
      metrics: [
        { value: '2-way', label: { en: 'inbound + outbound calls', id: 'panggilan masuk & keluar' }, basis: 'actual' },
        { value: '24/7', label: { en: 'availability', id: 'ketersediaan' }, basis: 'actual' },
      ],
      builtWith: ['n8n', 'Vapi', 'OpenAI'],
    },
    {
      industry: { en: 'Machinery distributor, international', id: 'Distributor mesin, internasional' },
      title: { en: 'Supplier data sync', id: 'Sinkronisasi data supplier' },
      problem: {
        en: 'Supplier data was split between a database and spreadsheets, far more rows than anyone could maintain by hand. When one side changed, the other went stale.',
        id: 'Data supplier terpisah antara database dan spreadsheet, jumlah barisnya jauh melampaui yang bisa dikelola manual. Begitu satu sisi berubah, sisi lain langsung usang.',
      },
      metrics: [
        { value: '100k+', label: { en: 'supplier rows managed', id: 'baris data supplier dikelola' }, basis: 'actual' },
        { value: 'Real-time', label: { en: 'sync', id: 'sinkronisasi' }, basis: 'actual' },
        { value: '~90%', label: { en: 'data-handling time saved', id: 'waktu pengelolaan data dihemat' }, basis: 'estimated' },
      ],
      builtWith: ['n8n', 'Database', 'Google Sheets'],
    },
    {
      industry: { en: 'HVAC field services, US', id: 'Layanan HVAC, AS' },
      title: { en: 'Quotation automation', id: 'Otomasi penawaran harga' },
      problem: {
        en: 'Every field request needed someone in the office to read it, price it, build a proposal and send it. Output was capped by one person\'s speed.',
        id: 'Setiap permintaan dari lapangan harus dibaca, dihitung harganya, dibuatkan proposal, lalu dikirim oleh staf kantor. Jumlah penawaran per hari dibatasi kecepatan satu orang.',
      },
      flow: {
        en: ['Form submitted', 'AI extracts data', 'Pricing + markup', 'PDF generated', 'Sent to client'],
        id: ['Formulir masuk', 'AI ekstrak data', 'Harga + markup dihitung', 'PDF dibuat', 'Dikirim ke klien'],
      },
      metrics: [
        { value: '<2 min', label: { en: 'form to sent proposal', id: 'dari formulir ke proposal terkirim' }, basis: 'actual' },
        { value: '90%', label: { en: 'proposal creation time cut', id: 'waktu pembuatan proposal dipangkas' }, basis: 'actual' },
        { value: '3x', label: { en: 'proposals per technician per day', id: 'proposal per teknisi per hari' }, basis: 'actual' },
      ],
      builtWith: ['n8n', 'Gmail', 'Supabase', 'Google Sheets', 'Gemini'],
    },
  ] as CaseStudy[],
};

// Demo A: chip i plays replies[i]. Reply text is written for the demo (00 §8 names the chips only).
export const DEMO_CHAT = {
  business: 'Harmoni Music Studio', // fictional
  chips: [
    { en: 'Which class suits an 8-year-old?', id: 'Kelas apa yang cocok untuk anak 8 tahun?' },
    { en: 'What are the prices?', id: 'Berapa biayanya?' },
    { en: 'Can I book a trial?', id: 'Bisa daftar kelas percobaan?' },
  ],
  replies: [
    {
      en: 'For an 8-year-old, beginner piano or guitar is a good start: 45 minutes once a week, with a teacher who goes at their pace.',
      id: 'Untuk anak usia 8 tahun, kelas piano atau gitar pemula cocok untuk memulai: 45 menit seminggu sekali, dengan guru yang menyesuaikan tempo belajarnya.',
    },
    {
      // [CONFIRM: fictional price OK] The IDR 450,000 / Rp 450.000 price is fictional. Needs a yes before launch.
      en: 'Trial class is free. Regular classes start from IDR 450,000/month.',
      id: 'Kelas percobaan gratis. Kelas reguler mulai dari Rp 450.000/bulan.',
    },
    {
      en: "We have two trial slots this week: Saturday 10:00 or Tuesday 16:00. I've reserved Saturday 10:00 for you, and your registration is confirmed.",
      id: 'Ada dua slot kelas percobaan minggu ini: Sabtu pukul 10.00 atau Selasa pukul 16.00. Saya sudah pesankan slot Sabtu pukul 10.00 untuk Anda, pendaftaran Anda sudah dikonfirmasi.',
    },
  ] as L[],
  handoff: { en: 'Handed to team: registration confirmed', id: 'Diteruskan ke tim: pendaftaran dikonfirmasi' },
  reset: { en: 'Reset', id: 'Ulangi' },
  caption: { en: 'Scripted demo with fictional data.', id: 'Demo dengan skrip dan data fiktif.' },
};

// Demo B: column 0 is the input and is always filled. Rows fill in turn (see DemoEnrich).
// Fictional companies and values from 00b §J.
export const DEMO_ENRICH = {
  button: { en: 'Enrich list', id: 'Lengkapi data' },
  reset: { en: 'Reset', id: 'Ulangi' },
  counter: { en: 'enriched', id: 'dilengkapi' },
  columns: [
    { en: 'Company', id: 'Perusahaan' },
    { en: 'Domain', id: 'Domain' },
    { en: 'Size', id: 'Ukuran' },
    { en: 'Industry', id: 'Industri' },
    { en: 'Contact', id: 'Kontak' },
  ],
  rows: [
    { company: 'Brightwater Foods', domain: 'brightwaterfoods.co', size: '51–200', industry: { en: 'Food & beverage', id: 'Makanan & minuman' }, contact: 'Head of Procurement' },
    { company: 'Ironvale Components', domain: 'ironvale.io', size: '201–500', industry: { en: 'Manufacturing', id: 'Manufaktur' }, contact: 'Operations Director' },
    { company: 'Nimbus Retail Group', domain: 'nimbusretail.com', size: '1,000+', industry: { en: 'Retail', id: 'Retail' }, contact: 'VP Partnerships' },
    { company: 'Alder & Finch', domain: 'alderfinch.com', size: '11–50', industry: { en: 'Design agency', id: 'Agensi desain' }, contact: 'Founder' },
    { company: 'Kestrel Analytics', domain: 'kestrelanalytics.ai', size: '51–200', industry: { en: 'Data & analytics', id: 'Data & analitik' }, contact: 'Head of Sales' },
  ],
  caption: {
    en: 'Input is just the company name. Every other column fills automatically.',
    id: 'Input hanya nama perusahaan. Kolom lainnya terisi otomatis.',
  },
};

export const ROI = {
  heading: { en: 'What is repetitive work costing you?', id: 'Berapa biaya kerja repetitif di bisnis Anda?' },
  inputs: {
    people: {
      label: { en: 'Team members doing admin/ops work', id: 'Jumlah tim admin/operasional' },
      min: 1,
      max: 50,
      default: 6,
    },
    hours: {
      label: {
        en: 'Hours of repetitive work per person per week',
        id: 'Jam kerja repetitif per orang per minggu',
      },
      min: 2,
      max: 30,
      default: 10,
    },
    salary: {
      label: { en: 'Average monthly salary', id: 'Rata-rata gaji bulanan' },
      currency: { en: 'USD', id: 'IDR' },
      range: {
        en: { min: 500, max: 8000, default: 1500, step: 50 },
        id: { min: 3500000, max: 25000000, default: 6500000, step: 100000 },
      },
    },
  },
  formula: {
    hours: 'hours_saved_per_year = people × hours_per_week × 52 × 0.60',
    cost: 'cost_saved_per_year = people × monthly_salary × 12 × (hours_per_week / 40) × 0.60',
  },
  assumption: {
    en: 'Assumes about 60% of repetitive work can be automated. This is an estimate, not a quote.',
    id: 'Asumsi sekitar 60% kerja repetitif dapat diotomasi. Ini estimasi, bukan penawaran harga.',
  },
  outputs: {
    savings: { en: 'Estimated yearly savings', id: 'Estimasi penghematan per tahun' },
    hours: { en: 'Hours freed per year', id: 'Jam kerja terbebas per tahun' },
    perMonth: { en: 'About {x} per month', id: 'Sekitar {x} per bulan' },
  },
  cta: { en: 'Talk through these numbers', id: 'Bahas angka ini bersama kami' },
  howWeCalculate: { en: 'How we calculate', id: 'Cara menghitung' },
  // {cost} and {people} are filled in at click time.
  waPrefill: {
    en: 'Hi Newseed, the ROI calculator shows about {cost}/year in savings for my team of {people}. I\'d like to talk it through.',
    id: 'Halo Newseed, kalkulator ROI menunjukkan potensi hemat sekitar {cost}/tahun untuk tim saya ({people} orang). Saya ingin diskusi lebih lanjut.',
  },
};

export const ENGAGEMENT = {
  heading: {
    lead: { en: 'Start small.', id: 'Mulai kecil.' },
    accent: { en: 'Grow when it pays off.', id: 'Kembangkan saat hasilnya terbukti.' },
  },
  sub: {
    en: 'Every engagement starts with a free audit and a fixed scope.',
    id: 'Setiap kerja sama dimulai dengan audit gratis dan cakupan yang disepakati.',
  },
  build: {
    name: { en: 'Build', id: 'Build' },
    badge: { en: 'Project', id: 'Proyek' },
    price: { en: '2–4 weeks', id: '2–4 minggu' },
    unit: { en: 'per project', id: 'per proyek' },
    body: {
      en: 'A scoped project with clear milestones, usually live in 2–4 weeks. Fixed scope agreed before we start.',
      id: 'Proyek dengan cakupan dan milestone jelas, umumnya live dalam 2–4 minggu. Cakupan disepakati sebelum mulai.',
    },
    note: { en: 'Fixed scope · Milestones', id: 'Cakupan tetap · Milestone' },
    cta: { en: 'Discuss a project', id: 'Diskusikan proyek' },
    includesHeading: { en: 'Includes:', id: 'Termasuk:' },
    features: [
      { en: 'Process audit and solution design', id: 'Audit proses dan desain solusi' },
      { en: 'AI agent or workflow built on your tools', id: 'AI agent atau workflow di atas tools Anda' },
      { en: 'Integrations with CRM, Sheets, email', id: 'Integrasi dengan CRM, Sheets, email' },
      { en: 'Testing with real cases', id: 'Pengujian dengan kasus nyata' },
      { en: 'Team training and hand-off docs', id: 'Pelatihan tim dan dokumentasi' },
      { en: '30 days of post-launch fixes', id: '30 hari perbaikan setelah live' },
    ],
    footer: { en: 'You own every account and workflow', id: 'Semua akun dan workflow milik Anda' },
  },
  grow: {
    name: { en: 'Grow', id: 'Grow' },
    badge: { en: 'Ongoing', id: 'Berkelanjutan' }, // Q2 resolved: "Most chosen" is unverified
    price: { en: 'Monthly', id: 'Bulanan' },
    unit: { en: 'retainer', id: 'retainer' },
    body: {
      en: 'Monitoring, fixes and new flows each month as your business changes.',
      id: 'Pemantauan, perbaikan, dan alur baru setiap bulan seiring bisnis Anda berubah.',
    },
    note: { en: 'Cancel anytime', id: 'Bisa berhenti kapan saja' },
    cta: { en: 'Ask about retainers', id: 'Tanya soal retainer' },
    includesHeading: { en: 'Build, plus:', id: 'Build, ditambah:' },
    features: [
      { en: 'Monitoring and error alerts', id: 'Pemantauan dan notifikasi error' },
      { en: 'Fixes when tools or APIs change', id: 'Perbaikan saat tools atau API berubah' },
      { en: 'New flows each month', id: 'Alur baru setiap bulan' },
      { en: 'Prompt and knowledge-base updates', id: 'Pembaruan prompt dan knowledge base' },
      { en: 'Monthly impact report', id: 'Laporan dampak bulanan' },
      { en: 'Priority WhatsApp support', id: 'Dukungan prioritas via WhatsApp' },
    ],
    footer: { en: 'Scope reviewed every month', id: 'Cakupan ditinjau setiap bulan' },
  },
  audit: {
    name: { en: 'Audit', id: 'Audit' },
    badge: { en: 'Free', id: 'Gratis' },
    title: { en: 'Not sure where to start?', id: 'Belum tahu mulai dari mana?' },
    body: {
      en: "30-minute call. We map your bottlenecks and tell you what's worth automating, even if it's not us who builds it.",
      id: 'Sesi 30 menit. Kami petakan hambatan Anda dan tunjukkan apa yang layak diotomasi, meski bukan kami yang membangunnya.',
    },
    cta: { en: 'Book a free audit', id: 'Jadwalkan audit gratis' },
  },
};

export const FAQ = {
  heading: {
    lead: { en: 'Everything you need to know', id: 'Yang perlu Anda tahu' },
    accent: { en: 'before we start', id: 'sebelum mulai' },
  },
  mobileHint: { en: 'Tap a card', id: 'Ketuk kartu' },
  help: {
    lead: { en: 'Still have a question?', id: 'Masih ada pertanyaan?' },
    link: { en: 'Ask us on WhatsApp', id: 'Tanya via WhatsApp' },
  },
  // Order = 00b §G (00 §11 rows 3, 2, 5, 6). Image order is set in FaqSection.
  items: [
    {
      tag: { en: 'Your team', id: 'Tim Anda' },
      badge: { en: 'Human in the loop', id: 'Manusia tetap terlibat' }, // ID badge is not in 00b: written here, to confirm
      q: { en: 'Will AI replace my team?', id: 'Apakah AI akan menggantikan tim saya?' },
      a: {
        en: 'No. It takes the repetitive part. Your team keeps the decisions, and every flow has a hand-off to a person.',
        id: 'Tidak. AI mengambil bagian yang repetitif. Keputusan tetap di tim Anda, dan setiap alur punya jalur eskalasi ke manusia.',
      },
      alt: { en: 'Team member working on a laptop in a bright office', id: 'Anggota tim bekerja di depan laptop di kantor yang terang' },
    },
    {
      tag: { en: 'Timeline', id: 'Waktu' },
      badge: { en: '2–4 weeks', id: '2–4 minggu' },
      q: { en: 'How long does a project take?', id: 'Berapa lama pengerjaannya?' },
      a: {
        en: 'Most first systems go live in 2–4 weeks. The audit tells you the real timeline before you commit.',
        id: 'Sebagian besar sistem pertama live dalam 2–4 minggu. Audit akan memberi gambaran waktu yang pasti sebelum Anda memutuskan.',
      },
      alt: { en: 'Laptop on a desk with a project plan on screen', id: 'Laptop di meja dengan rencana proyek di layar' },
    },
    {
      tag: { en: 'Pricing', id: 'Biaya' },
      badge: { en: 'Fixed scope', id: 'Cakupan tetap' },
      q: { en: 'How much does it cost?', id: 'Berapa biayanya?' },
      a: {
        en: 'It depends on scope. After the free audit you get a fixed-scope proposal, so you know the price before anything is built.',
        id: 'Tergantung cakupan. Setelah audit gratis Anda menerima proposal dengan cakupan tetap, jadi harga sudah jelas sebelum apa pun dibangun.',
      },
      alt: { en: 'Person working on a laptop in a coworking space', id: 'Seseorang bekerja di depan laptop di ruang kerja bersama' },
    },
    {
      tag: { en: 'Data & privacy', id: 'Data & privasi' },
      badge: { en: 'NDA', id: 'NDA' },
      q: { en: 'Is my data safe?', id: 'Apakah data saya aman?' },
      a: {
        en: 'We work under NDA, use your own accounts where possible, and only access what the flow needs.',
        id: 'Kami bekerja di bawah NDA, memakai akun milik Anda bila memungkinkan, dan hanya mengakses data yang dibutuhkan alur.',
      },
      alt: { en: 'Professional taking a call at a standing desk by a window', id: 'Profesional menerima telepon di meja berdiri dekat jendela' },
    },
  ],
};

export const FINAL_CTA = {
  heading: { en: 'Book a 30-minute audit', id: 'Jadwalkan audit 30 menit' },
  sub: {
    en: "Talk directly with the engineer who'd build it. No sales script.",
    id: 'Bicara langsung dengan engineer yang akan membangunnya. Tanpa naskah sales.',
  },
  agenda: [
    { en: 'Map your bottlenecks', id: 'Petakan hambatan proses' },
    {
      en: 'Pick the right approach: workflow, AI agent or direct integration',
      id: 'Tentukan pendekatan: workflow, AI agent, atau integrasi langsung',
    },
    { en: 'Leave with a scoped plan and timeline', id: 'Pulang dengan rencana dan estimasi waktu yang jelas' },
  ],
  timeZones: ['Jakarta (WIB)', 'Singapore (SGT)', 'Dubai (GST)', 'London', 'New York'],
  trust: { en: 'NDA on request · Free · 30 minutes', id: 'NDA bila diperlukan · Gratis · 30 menit' },
};

// App shell mockup copy (Example content), 00b §H. Used by ConnectedAppShellShowcase.
export const APP_SHELL = {
  nav: {
    home: { en: 'Home', id: 'Beranda' },
    conversations: { en: 'Conversations', id: 'Percakapan' },
    workflows: { en: 'Workflows', id: 'Workflow' },
    leads: { en: 'Leads', id: 'Prospek' },
    reports: { en: 'Reports', id: 'Laporan' },
  },
  upsell: {
    title: { en: 'Need a new flow?', id: 'Butuh alur baru?' },
    sub: { en: 'Ask your engineer', id: 'Tanya engineer Anda' },
  },
  search: { en: 'Search chats, leads, or workflows...', id: 'Cari chat, prospek, atau workflow...' },
  workspaceName: { en: 'Harmoni Studio', id: 'Harmoni Studio' }, // ID kept as EN: 00b gives "Workspace" for the label only
  workspaceLabel: { en: 'Workspace', id: 'Workspace' },
  newWorkflow: { en: 'New workflow', id: 'Workflow baru' },
  greeting: { en: 'Good morning', id: 'Selamat pagi' },
  greetingSub: { en: "Here's what your automations handled today.", id: 'Ini yang ditangani otomasi Anda hari ini.' },
  // Example numbers, illustrative only (under the "Example" caption).
  metrics: [
    { label: { en: 'Chats handled', id: 'Chat ditangani' }, value: '142', delta: '↑ 20%', note: { en: 'today', id: 'hari ini' } },
    { label: { en: 'New leads', id: 'Prospek baru' }, value: '28', delta: '↑ 32%', note: { en: 'this week', id: 'minggu ini' } },
    { label: { en: 'Hours saved', id: 'Jam dihemat' }, value: '31.5 h', delta: '↑ 18%', note: { en: 'this week', id: 'minggu ini' } },
    { label: { en: 'Hand-offs', id: 'Eskalasi' }, value: '9', note: { en: 'pending', id: 'menunggu' } },
  ],
  runs: {
    heading: { en: 'Recent runs', id: 'Proses terbaru' },
    view: { en: 'View', id: 'Lihat' },
    opened: { en: 'Opened ✓', id: 'Dibuka ✓' },
    items: [
      { time: '09:00', label: { en: 'WhatsApp agent · 142 chats', id: 'WhatsApp agent · 142 chat' }, tool: 'WhatsApp', initials: ['RA', 'BP'] },
      { time: '11:00', label: { en: 'Lead sync · 18 new rows', id: 'Sinkron prospek · 18 baris baru' }, tool: 'Sheets', initials: ['MS', 'DK'] },
      { time: '14:00', label: { en: 'Quote flow · 6 PDFs sent', id: 'Alur penawaran · 6 PDF terkirim' }, tool: 'Gmail', initials: ['SL', 'NY'] },
    ],
  },
  activity: {
    title: { en: 'Automation runs', id: 'Proses otomasi' },
    range: { en: 'Last 7 days', id: '7 hari terakhir' },
    tooltip: { en: '412 runs', id: '412 proses' },
    success: { en: 'Success rate', id: 'Tingkat sukses' },
    avgRun: { en: 'Avg. run time', id: 'Rata-rata durasi' },
    runTime: '1m 48s',
  },
  days: {
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    id: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
  },
  a11y: {
    sidebar: { en: 'Toggle sidebar', id: 'Buka atau tutup sidebar' },
    notifications: { en: 'Notifications', id: 'Notifikasi' },
  },
};

export const FOOTER = {
  heading: {
    lead: { en: 'Where growing teams', id: 'Tempat tim yang sedang tumbuh' },
    accent: { en: 'get their time back', id: 'mendapatkan waktunya kembali' },
  },
  tagline: {
    en: 'AI automation & growth systems for teams that would rather grow than copy-paste.',
    id: 'Sistem otomasi AI untuk tim yang lebih memilih tumbuh daripada copy-paste.',
  },
  headings: {
    services: { en: 'Services', id: 'Layanan' },
    company: { en: 'Company', id: 'Perusahaan' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
  bookAudit: { en: 'Book a free audit', id: 'Jadwalkan audit gratis' },
  whatsapp: { en: 'WhatsApp', id: 'WhatsApp' },
  email: { en: 'Email', id: 'Email' }, // row stays hidden until SITE.email is set (00b header, Q6)
  backToTop: { en: 'Back to top', id: 'Kembali ke atas' },
  language: { en: 'Language', id: 'Bahasa' },
  languages: [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Bahasa Indonesia' },
  ],
  copyright: '© 2026 Newseed',
};

// ---------------------------------------------------------------------------
// Services deck (TimelineFeatureDeck + MinimalistMotionStage), PRD 03 / 00b §C.
// Stage keys match the PRODUCT_STAGES ids in MinimalistMotionStage.tsx.
// ---------------------------------------------------------------------------
const NOV_12 = { en: 'Thu, Nov 12', id: 'Kam, 12 Nov' };

export const DECK = {
  stages: {
    scheduling: {
      label: { en: 'Customer asks', id: 'Pelanggan bertanya' },
      badge: { en: '01 Ask', id: '01 Tanya' },
      tick: { en: 'Ask', id: 'Tanya' },
    },
    velie: {
      label: { en: 'Lead captured', id: 'Prospek tercatat' },
      badge: { en: '02 Capture', id: '02 Catat' },
      tick: { en: 'Capture', id: 'Catat' },
    },
    notetaker: {
      label: { en: 'Team notified', id: 'Tim diberi tahu' },
      badge: { en: '03 Notify', id: '03 Kabari' },
      tick: { en: 'Notify', id: 'Kabari' },
    },
    payments: {
      label: { en: 'Quote sent', id: 'Penawaran terkirim' },
      badge: { en: '04 Quote', id: '04 Penawaran' },
      tick: { en: 'Quote', id: 'Penawaran' },
    },
  },

  // Scene 1: booking. Target day is 12 (Thursday). Weekday headers come from HERO.calendar.
  booking: {
    month: HERO.calendar.month,
    dayLine: NOV_12,
    chip: { en: 'Thu · Nov 12 ✓', id: 'Kam · 12 Nov ✓' },
    selectDate: { en: 'Select a date', id: 'Pilih tanggal' },
    selectedSlot: { en: 'Selected slot', id: 'Jadwal dipilih' },
    availableTimes: { en: 'Available times', id: 'Jadwal tersedia' },
    cta: { en: 'Book trial', id: 'Daftar trial' },
    slots: [
      { time: '10:00', label: { en: 'Morning class', id: 'Kelas pagi' } },
      { time: '13:00', label: { en: 'Recommended', id: 'Disarankan' } },
      { time: '16:00', label: { en: 'Afternoon class', id: 'Kelas sore' } },
    ],
    done: {
      title: { en: 'Trial class booked', id: 'Kelas percobaan terdaftar' },
      channel: { en: 'WhatsApp', id: 'WhatsApp' },
      confirm: { en: 'Confirmation sent ✓', id: 'Konfirmasi terkirim ✓' },
      badge: { en: 'Booked', id: 'Terdaftar' },
    },
  },

  // Scene 2: capture. The first 3 signal chips from HERO.chips (00 §3) sit on the floating cards.
  capture: {
    title: { en: 'Organizing the inbox', id: 'Merapikan inbox' },
    line: { en: 'Turning chats into leads and tasks.', id: 'Mengubah chat menjadi prospek dan tugas.' },
    chips: HERO.chips.slice(0, 3),
    progress: [
      { en: 'Leads', id: 'Prospek' },
      { en: 'Tasks', id: 'Tugas' },
      { en: 'Follow-up', id: 'Follow-up' },
    ],
    analyzing: { en: 'Analyzing and organizing...', id: 'Menganalisis dan merapikan...' },
    done: { en: 'All caught up', id: 'Semua sudah tertangani' },
    doneFooter: { en: '3 of 3 items handled', id: '3 dari 3 item tertangani' },
    wait: { en: 'This may take a few moments.', id: 'Ini mungkin butuh beberapa saat.' },
  },

  // Scene 3: notify.
  notify: {
    title: { en: 'Call summarized', id: 'Panggilan dirangkum' },
    line: {
      en: "The voice agent's call is transcribed and sent to your team.",
      id: 'Panggilan voice agent ditranskrip dan dikirim ke tim Anda.',
    },
  },

  // Scene 4: quote. The amount counts up to `amount` (USD in both languages).
  quote: {
    amount: 360,
    title: { en: 'Proposal ready', id: 'Proposal siap' },
    line: {
      en: 'Priced from the field request in under 2 minutes.',
      id: 'Harga dihitung dari permintaan lapangan dalam kurang dari 2 menit.',
    },
    job: { en: 'Service visit', id: 'Kunjungan servis' },
    date: NOV_12,
    total: { en: 'TOTAL', id: 'TOTAL' },
    cta: {
      en: (amount: string) => `Send $${amount} quote →`,
      id: (amount: string) => `Kirim penawaran $${amount} →`,
    },
    trust: { en: 'PDF · sent via Gmail', id: 'PDF · dikirim via Gmail' },
    auto: { en: 'Auto', id: 'Auto' },
    done: { en: 'Quote sent', id: 'Penawaran terkirim' },
    doneCard: { en: 'Copy to CRM', id: 'Salinan ke CRM' },
    sent: { en: 'Sent', id: 'Terkirim' },
  },

  // Agent card. The 3 modes are USE_CASES.tabs.
  agent: {
    title: { en: 'Meet your', id: 'Kenalan dengan' },
    accent: { en: 'AI agent', id: 'AI agent' },
    suffix: { en: '', id: 'Anda' },
    chip: 'wa.me/6282124747385',
    copy: { en: 'Copy', id: 'Salin' },
    copied: { en: 'Copied!', id: 'Tersalin!' },
    sub: {
      en: 'on WhatsApp, answering, qualifying and handing off.',
      id: 'di WhatsApp: menjawab, menyaring, dan meneruskan ke tim.',
    },
    handoffLead: { en: 'Human hand-off', id: 'Eskalasi ke manusia' },
    handoffRest: {
      en: ' – anything unusual goes to your team with the full chat.',
      id: ' – yang tidak biasa diteruskan ke tim lengkap dengan riwayat chat.',
    },
  },

  // Chart card. Totals shown big are computed from each set.
  chart: {
    title: { en: 'Hours saved', id: 'Jam dihemat' },
    range: { en: 'This week', id: 'Minggu ini' },
    days: {
      en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      id: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    },
    sets: [
      { id: 'chats', label: { en: 'Chats', id: 'Chat' }, values: [3.5, 5.0, 4.2, 6.1, 5.4, 4.0, 3.3], hours: true },
      { id: 'leads', label: { en: 'Leads', id: 'Prospek' }, values: [14, 22, 17, 25, 21, 16, 13], hours: false },
      { id: 'handoffs', label: { en: 'Hand-offs', id: 'Eskalasi' }, values: [1, 2, 1, 2, 1, 1, 1], hours: false },
    ],
    footerLead: { en: 'Example', id: 'Contoh' },
    footerRest: { en: ' – illustrative numbers for a 6-person team.', id: ' – angka ilustrasi untuk tim 6 orang.' },
  },
};

// ---------------------------------------------------------------------------
// Integrations section, PRD 03 / 00b §E.
// ---------------------------------------------------------------------------
export const INTEGRATIONS = {
  heading: {
    lead: { en: 'Connect Newseed to', id: 'Hubungkan Newseed ke' },
    accent: { en: 'everything you use', id: 'semua tools Anda' },
  },
  sub: {
    en: 'We build on your existing stack and automate the busywork in between.',
    id: 'Kami membangun di atas tools yang sudah ada dan mengotomasi pekerjaan di antaranya.',
  },
  cta: { en: 'See tools we work with', id: 'Lihat tools yang kami pakai' },
  modal: {
    title: { en: 'Tools we build with', id: 'Tools yang kami gunakan' },
    sub: { en: 'Plus anything with an API.', id: 'Plus tools apa pun yang punya API.' },
    search: { en: 'Search tools...', id: 'Cari tools...' },
    categories: [
      { id: 'all', label: { en: 'All', id: 'Semua' } },
      { id: 'messaging', label: { en: 'Messaging', id: 'Pesan' } },
      { id: 'ai', label: { en: 'AI models', id: 'Model AI' } },
      { id: 'data', label: { en: 'Data & CRM', id: 'Data & CRM' } },
      { id: 'automation', label: { en: 'Automation', id: 'Otomasi' } },
    ],
    showing: {
      en: (n: number) => `Showing ${n} tools`,
      id: (n: number) => `Menampilkan ${n} tools`,
    },
    done: { en: 'Done', id: 'Selesai' },
  },
  // icon: file in public/logos/ (Simple Icons, CC0). null renders a letter circle.
  items: [
    { name: 'WhatsApp', category: 'messaging', icon: '/logos/whatsapp.svg', desc: { en: 'Answer customers where they already message you', id: 'Jawab pelanggan di tempat mereka biasa chat' } },
    { name: 'Gmail', category: 'messaging', icon: '/logos/gmail.svg', desc: { en: 'Send quotes and follow-ups from your own inbox', id: 'Kirim penawaran dan follow-up dari inbox Anda sendiri' } },
    { name: 'Slack', category: 'messaging', icon: '/logos/slack.svg', desc: { en: 'Post alerts and hand-offs to the channel your team uses', id: 'Kirim notifikasi dan eskalasi ke channel yang dipakai tim' } },
    { name: 'OpenAI', category: 'ai', icon: '/logos/openai.svg', desc: { en: 'Models for classifying, drafting and summarising messages', id: 'Model untuk memilah, menyusun, dan merangkum pesan' } },
    { name: 'Claude', category: 'ai', icon: '/logos/anthropic.svg', desc: { en: 'Long-context reasoning for policies, guides and replies', id: 'Penalaran konteks panjang untuk kebijakan, panduan, dan balasan' } },
    { name: 'Gemini', category: 'ai', icon: '/logos/googlegemini.svg', desc: { en: 'Models that read documents, images and voice notes', id: 'Model yang membaca dokumen, gambar, dan voice note' } },
    { name: 'Google Sheets', category: 'data', icon: '/logos/googlesheets.svg', desc: { en: 'Keep rows in sync between your sheets and systems', id: 'Jaga data di sheet tetap sinkron dengan sistem Anda' } },
    { name: 'Notion', category: 'data', icon: '/logos/notion.svg', desc: { en: 'Read and write pages, databases and task lists', id: 'Baca dan tulis halaman, database, dan daftar tugas' } },
    { name: 'HubSpot', category: 'data', icon: '/logos/hubspot.svg', desc: { en: 'Log leads, contacts and deal stages automatically', id: 'Catat prospek, kontak, dan tahap deal secara otomatis' } },
    { name: 'Supabase', category: 'data', icon: '/logos/supabase.svg', desc: { en: 'Store flows, logs and records in your own Postgres', id: 'Simpan alur, log, dan data di Postgres milik Anda' } },
    { name: 'Airtable', category: 'data', icon: '/logos/airtable.svg', desc: { en: 'Use bases as a simple CRM or request tracker', id: 'Pakai base sebagai CRM sederhana atau pelacak permintaan' } },
    { name: 'n8n', category: 'automation', icon: '/logos/n8n.svg', desc: { en: 'Open-source workflows you can host and inspect yourself', id: 'Workflow open-source yang bisa Anda host dan periksa sendiri' } },
    { name: 'Make', category: 'automation', icon: '/logos/make.svg', desc: { en: 'Visual scenarios for multi-step data and app flows', id: 'Skenario visual untuk alur data dan aplikasi multi-langkah' } },
    { name: 'Zapier', category: 'automation', icon: '/logos/zapier.svg', desc: { en: 'Connect your apps with ready-made triggers and actions', id: 'Hubungkan aplikasi lewat trigger dan aksi siap pakai' } },
    { name: 'Vapi', category: 'automation', icon: null, desc: { en: 'Voice agents that take and place phone calls', id: 'Voice agent untuk menerima dan melakukan panggilan telepon' } },
  ],
};

// Architecture diagram (UI-D). Logos live in public/logos/.
export const SYSTEM = {
  heading: {
    lead: { en: 'Inside a Newseed system.', id: 'Di dalam sistem Newseed.' },
    accent: { en: 'Wired into how you already work.', id: 'Terhubung dengan cara kerja Anda.' },
  },
  sub: {
    en: 'Your tools feed one engine. Your team stays in charge of what it does.',
    id: 'Tools Anda terhubung ke satu mesin. Tim Anda tetap memegang kendali.',
  },
  panel1: {
    title: { en: 'Your tools', id: 'Tools Anda' },
    more: { en: 'Any tool with an API', id: 'Tools apa pun dengan API' },
    node1: { en: 'Triggers', id: 'Pemicu' },
    node2: {
      label: { en: 'Auto-sync', id: 'Auto-sync' },
      title: { en: 'Automation flows', id: 'Alur otomasi' },
    },
    node3: { en: 'Your data', id: 'Data Anda' },
    tools: [
      { name: 'WhatsApp', icon: '/logos/whatsapp.svg' },
      { name: 'Gmail', icon: '/logos/gmail.svg' },
      { name: 'Google Sheets', icon: '/logos/googlesheets.svg' },
      { name: 'HubSpot', icon: '/logos/hubspot.svg' },
      { name: 'Notion', icon: '/logos/notion.svg' },
      { name: 'n8n', icon: '/logos/n8n.svg' },
    ],
  },
  core: {
    brand: { en: 'Newseed', id: 'Newseed' },
    title: { en: 'Core system', id: 'Sistem inti' },
    caption: {
      en: 'Runs on your own accounts. You keep every workflow.',
      id: 'Berjalan di akun milik Anda. Semua workflow tetap milik Anda.',
    },
    rows: [
      { title: { en: 'AI agent', id: 'AI agent' }, sub: { en: 'Answers, qualifies, books', id: 'Menjawab, menyaring, menjadwalkan' } },
      { title: { en: 'Workflow engine', id: 'Mesin workflow' }, sub: { en: 'Steps, schedules, retries', id: 'Langkah, jadwal, pengulangan' } },
      { title: { en: 'Knowledge base', id: 'Knowledge base' }, sub: { en: 'Your guides, prices, policies', id: 'Panduan, harga, kebijakan Anda' } },
      { title: { en: 'Guardrails', id: 'Guardrails' }, sub: { en: 'Rules and human hand-off', id: 'Aturan dan eskalasi ke manusia' } },
      { title: { en: 'Monitoring', id: 'Pemantauan' }, sub: { en: 'Logs and error alerts', id: 'Log dan notifikasi error' } },
    ],
  },
  link: {
    top: { en: 'Logged · Reviewed · Under NDA', id: 'Tercatat · Ditinjau · Di bawah NDA' },
    bottom: { en: 'Improves with every run', id: 'Makin baik di setiap proses' },
  },
  panel3: {
    title: { en: 'Your team', id: 'Tim Anda' },
    owner: { en: 'You / Owner', id: 'Anda / Owner' },
    active: { en: 'Active', id: 'Aktif' },
    nodes: [
      {
        name: { en: 'Sales', id: 'Sales' },
        sub: { en: 'Leads', id: 'Prospek' },
        caption: { en: 'Following up new leads', id: 'Menindaklanjuti prospek baru' },
      },
      {
        name: { en: 'Ops', id: 'Operasional' },
        sub: { en: 'Orders', id: 'Pesanan' },
        caption: { en: "Syncing today's orders", id: 'Menyinkronkan pesanan hari ini' },
      },
      {
        name: { en: 'Support', id: 'Support' },
        sub: { en: 'Chats', id: 'Chat' },
        caption: { en: 'Handing a case to your team', id: 'Meneruskan kasus ke tim Anda' },
      },
    ],
  },
  example: {
    en: 'Example flow. Built around your tools and process.',
    id: 'Contoh alur. Disesuaikan dengan tools dan proses Anda.',
  },
};
