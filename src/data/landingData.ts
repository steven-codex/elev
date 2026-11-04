import {
  WorkflowTab,
  FeatureCard,
  IntegrationItem,
  PricingPlan,
  Testimonial,
  FaqItem,
  NavMenuSection
} from '../types';
import type { L } from '../i18n';

export const NAV_MENU_SECTIONS: NavMenuSection[] = [
  {
    label: 'Features',
    href: '#features'
  },
  {
    label: 'Integrations',
    href: '#integrations'
  },
  {
    label: 'Pricing',
    href: '#pricing'
  },
  {
    label: 'FAQ',
    href: '#faq'
  }
];

export const WORKFLOW_TABS: WorkflowTab[] = [
  {
    id: 'sales',
    name: 'Sales & Revenue',
    category: 'Sales Pipeline',
    headline: 'Speed to lead: Convert qualified inbound buyers in seconds',
    description: 'Eliminate the friction of delayed follow-ups. Embed scheduling directly into inbound forms, route leads based on Salesforce fields, and ensure top reps get booked instantly while intent is peaked.',
    stats: {
      value: '+320%',
      label: 'Faster inbound response time'
    },
    features: [
      'Automatic routing based on company size, geography, or budget',
      'Instant calendar booking right on the "Thank You" submission page',
      'Bi-directional Salesforce & HubSpot CRM auto-logging'
    ],
    mockupType: 'sales'
  },
  {
    id: 'recruiting',
    name: 'Recruiting',
    category: 'Talent Acquisition',
    headline: 'Hire top candidates before competitors make an offer',
    description: 'Coordinate multiple hiring managers, panel interviews, and time zone differences effortlessly. Send candidate-friendly links that only show mutually open slots.',
    stats: {
      value: '4.5 hrs',
      label: 'Saved per recruiter each week'
    },
    features: [
      'Multi-interviewer collective availability synchronization',
      'Automated candidate prep reminders with candidate briefing pack',
      'Integration with Greenhouse, Lever, and Workday ATS'
    ],
    mockupType: 'recruiting'
  },
  {
    id: 'cs',
    name: 'Customer Success',
    category: 'Client Retention',
    headline: 'Deliver white-glove onboarding and continuous engagement',
    description: 'Make it effortless for customers to book onboarding milestones, technical support escalations, and executive reviews. Keep customers delighted and renewals predictable.',
    stats: {
      value: '99.4%',
      label: 'Customer retention rate'
    },
    features: [
      'Round-robin distribution to assign available CS reps evenly',
      'Automated survey links and feedback follow-ups after meetings',
      'Dedicated VIP booking links with priority buffer times'
    ],
    mockupType: 'cs'
  },
  {
    id: 'revops',
    name: 'RevOps & Admin',
    category: 'Operations & IT',
    headline: 'Standardize scheduling across the entire organization',
    description: 'Ensure uniform branding, compliant data handling, and automated calendar governance. Manage team templates, permissions, and security from a unified admin console.',
    stats: {
      value: '100%',
      label: 'Calendar governance & SOC 2 compliance'
    },
    features: [
      'Enterprise SAML Single Sign-On (Okta, Azure AD, OneLogin)',
      'Automated user provisioning via SCIM',
      'Company-wide meeting templates and brand governance'
    ],
    mockupType: 'revops'
  }
];

export const CORE_FEATURES: FeatureCard[] = [
  {
    id: 'availability',
    title: 'Advanced Availability Controls',
    description: 'Fine-tune your schedule with custom meeting buffers, daily booking maximums, minimum notice limits, and automatic time-zone detection for worldwide attendees.',
    icon: 'Sliders',
    tag: 'Control',
    visualHighlight: '15m buffer before & after'
  },
  {
    id: 'team-pooling',
    title: 'Round-Robin & Team Pooling',
    description: 'Distribute incoming meetings fairly among team members based on availability, sales quotas, or priority weighting so no single rep gets overwhelmed.',
    icon: 'Shuffle',
    badge: 'Popular',
    tag: 'Distribution',
    visualHighlight: 'Equal distribution across 8 reps'
  },
  {
    id: 'automated-workflows',
    title: 'Automated Reminders & Workflows',
    description: 'Cut no-shows by up to 85% with automated, personalized SMS and email reminders, custom cancellation rescheduling policies, and instant post-meeting agendas.',
    icon: 'Sparkles',
    badge: 'High Impact',
    tag: 'Automation',
    visualHighlight: '85% drop in no-shows'
  },
  {
    id: 'payments',
    title: 'Frictionless Payment Collection',
    description: 'Collect client deposits, consulting fees, or service payments before an appointment is booked using native Stripe and PayPal integrations.',
    icon: 'CreditCard',
    tag: 'Monetization',
    visualHighlight: 'Secure Stripe & PayPal checkouts'
  },
  {
    id: 'lead-routing',
    title: 'Intelligent Lead Routing Forms',
    description: 'Ask qualification questions on your website. High-value enterprise prospects book straight into your senior VP calendar, while smaller tiers receive self-serve demos.',
    icon: 'Compass',
    tag: 'Conversion',
    visualHighlight: 'Dynamic logic branching'
  },
  {
    id: 'security-admin',
    title: 'Enterprise Security & Compliance',
    description: 'Protect sensitive company data with SOC 2 Type II certification, GDPR compliance, HIPAA compliance BAA, domain controls, and audit logs.',
    icon: 'Shield',
    tag: 'Security',
    visualHighlight: 'SOC 2 Type II & HIPAA'
  }
];

export const INTEGRATIONS_LIST: IntegrationItem[] = [
  {
    name: 'Google Calendar',
    category: 'calendars',
    description: 'Real-time two-way synchronization prevents double bookings instantly.',
    icon: 'Calendar',
    popular: true
  },
  {
    name: 'Microsoft Outlook',
    category: 'calendars',
    description: 'Native sync with Outlook, Office 365, and Exchange calendars.',
    icon: 'CalendarDays',
    popular: true
  },
  {
    name: 'Zoom Video',
    category: 'video',
    description: 'Auto-generates unique, password-protected Zoom video links for each booking.',
    icon: 'Video',
    popular: true
  },
  {
    name: 'Google Meet',
    category: 'video',
    description: 'Embeds dynamic Google Meet conference links directly in the invite.',
    icon: 'Tv',
    popular: true
  },
  {
    name: 'Microsoft Teams',
    category: 'video',
    description: 'Instantly provisions Teams meetings with dial-in audio numbers.',
    icon: 'VideoIcon'
  },
  {
    name: 'Salesforce CRM',
    category: 'crm',
    description: 'Automatically creates or updates leads, contacts, and opportunities upon booking.',
    icon: 'Database',
    popular: true
  },
  {
    name: 'HubSpot',
    category: 'crm',
    description: 'Log meeting activities, track pipeline stages, and update deals automatically.',
    icon: 'Workflow',
    popular: true
  },
  {
    name: 'Stripe',
    category: 'payments',
    description: 'Charge for appointments, client consultations, or coaching sessions before booking.',
    icon: 'CreditCard',
    popular: true
  },
  {
    name: 'Slack',
    category: 'messaging',
    description: 'Receive real-time Slack notifications when someone books, reschedules, or cancels.',
    icon: 'MessageSquare',
    popular: true
  },
  {
    name: 'Zapier',
    category: 'messaging',
    description: 'Connect elev to 5,000+ business apps and custom webhook pipelines.',
    icon: 'Share2'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Basic',
    tagline: 'For individuals starting out with simple personal scheduling.',
    monthlyPrice: 0,
    annualPrice: 0,
    seatType: 'Always free',
    ctaText: 'Sign up free',
    ctaVariant: 'outline',
    features: [
      '1 connected calendar account (Google or Outlook)',
      '1 active event type (e.g. 30-min call)',
      'Unlimited one-on-one meetings',
      'Personalized elev booking link (elevglobal.com/yourname)',
      'Automated email confirmations and calendar invites',
      'Web, iOS, and Android access'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'For professionals needing multi-calendar flexibility and custom branding.',
    monthlyPrice: 12,
    annualPrice: 10,
    seatType: 'per seat / month, billed annually',
    ctaText: 'Start 14-day free trial',
    ctaVariant: 'outline',
    features: [
      'Connect up to 6 calendars per user',
      'Unlimited active event types',
      'Custom branding (remove elev watermark)',
      'Automated email & SMS reminder workflows',
      'Collective one-off group booking links',
      'Payment collection via Stripe & PayPal',
      'Google Meet, Zoom, and Teams native video'
    ]
  },
  {
    id: 'teams',
    name: 'Teams',
    tagline: 'For sales, CS, and recruiting teams that need automated routing.',
    monthlyPrice: 20,
    annualPrice: 16,
    popular: true,
    seatType: 'per seat / month, billed annually',
    ctaText: 'Try Teams free for 14 days',
    ctaVariant: 'primary',
    features: [
      'Everything in Standard, plus:',
      'Round-robin and collective team scheduling',
      'Routing Forms to qualify & distribute inbound leads',
      'Salesforce & HubSpot CRM bi-directional sync',
      'Admin management with centralized team billing',
      'Team availability pools and shift schedules',
      'Advanced reporting on booking velocity & show rates',
      'Priority live chat support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organizations needing enterprise security and governance.',
    monthlyPrice: 0,
    annualPrice: 0,
    seatType: 'Custom volume pricing (30+ seats)',
    ctaText: 'Contact enterprise sales',
    ctaVariant: 'secondary',
    features: [
      'Everything in Teams, plus:',
      'SAML Single Sign-On (Okta, Azure, Ping)',
      'SCIM automated user provisioning and deprovisioning',
      'Custom terms of service, SLA & Security Review',
      'Audit logs and domain verification',
      'Dedicated Enterprise Customer Success Manager',
      'Custom onboarding, training, and API rate limits',
      'HIPAA compliance BAA support'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'elev transformed our inbound sales conversion. Prospects now book demos right from our demo request page instead of waiting 24 hours. Our show rate jumped from 61% to 89% in week one.',
    author: 'Elena Rostova',
    role: 'VP of Global Revenue',
    company: 'CloudScale Technologies',
    metric: '+48%',
    metricLabel: 'Increase in qualified pipeline velocity',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
  },
  {
    quote: 'Our recruiting team coordinates 200+ panel interviews across 4 time zones every month. elev automated all the collective availability math. We saved over 18 hours per recruiter each month.',
    author: 'Marcus Chen',
    role: 'Head of Talent Acquisition',
    company: 'HyperGrowth Systems',
    metric: '18 hrs',
    metricLabel: 'Saved per recruiter per month',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
  },
  {
    quote: 'The automated SMS and email reminders alone reduced our client onboarding no-shows to practically zero. Our customers constantly remark on how smooth the whole booking experience is.',
    author: 'Sarah Linwood',
    role: 'Director of Customer Success',
    company: 'Aura Data',
    metric: '91%',
    metricLabel: 'Reduction in onboarding no-shows',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'General',
    question: 'How does elev prevent double bookings across multiple calendars?',
    answer: 'elev connects directly to your Google Calendar, Microsoft Outlook, or Office 365 accounts in real time. Whenever someone visits your booking link, elev checks your real-time busy slots across all connected accounts and only displays truly available times. When an event is scheduled, elev immediately blocks the time slot across your calendars and sends calendar invites to both parties.'
  },
  {
    category: 'Teams & Routing',
    question: 'What is Round-Robin scheduling and how does it work in elev?',
    answer: 'Round-robin scheduling automatically distributes incoming appointments among multiple team members. You can configure distribution based on equal availability, priority weighting, or specific qualification rules (e.g. territory or deal size). This ensures leads are served immediately without overloading any individual team member.'
  },
  {
    category: 'Pricing',
    question: 'Can I start with the free plan and upgrade later?',
    answer: 'Yes, absolutely. The Basic plan is free forever and includes 1 connected calendar and unlimited 1-on-1 meetings. You can start with the free plan, invite your team, and test our Teams plan features with a risk-free 14-day trial without needing to enter a credit card.'
  },
  {
    category: 'Security',
    question: 'How secure is elev with enterprise calendar data?',
    answer: 'Security is paramount at elev. We maintain SOC 2 Type II certification, adhere strictly to GDPR regulations, support HIPAA BAA execution for healthcare, and encrypt all data in transit and at rest with TLS 1.3 and AES-256. We never view or store the contents of your emails or private notes.'
  },
  {
    category: 'Integrations',
    question: 'Does elev work with Zoom, Google Meet, and Microsoft Teams?',
    answer: 'Yes! elev integrates natively with Zoom, Google Meet, Microsoft Teams, Webex, and GoToMeeting. When a meeting is confirmed, elev automatically provisions a unique, secure video conference link and inserts it directly into the calendar event and reminder messages.'
  }
];

// ---------------------------------------------------------------------------
// Newseed EN/ID content. Source: docs/prd/00-content-source.md (approved copy).
// Copy is verbatim. Entries marked "ID TODO" have no Indonesian text in PRD 00
// yet; the English is repeated in `id` as a placeholder until copy is approved.
// The old exports above stay until PRD 06 removes them.
// ---------------------------------------------------------------------------

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
  quote?: { text: L; by: L; confirm: true }; // [CONFIRM] consent, PRD 00 open item 1
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
  heading: { en: 'Less manual work. More room to grow.', id: 'Lebih sedikit kerja manual. Lebih banyak ruang untuk tumbuh.' },
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
      title: { en: 'Build', id: 'Build' },
      body: {
        en: 'We build on your existing tools, typically in 2–4 weeks, with you reviewing as we go.',
        id: 'Kami bangun di atas tools yang sudah ada, umumnya 2–4 minggu, dan Anda ikut meninjau prosesnya.',
      },
    },
    {
      num: '03',
      title: { en: 'Launch', id: 'Launch' },
      body: {
        en: 'We test with real cases, train your team, and switch it on with human hand-off in place.',
        id: 'Kami uji dengan kasus nyata, latih tim Anda, lalu aktifkan dengan jalur eskalasi ke manusia.',
      },
    },
    {
      num: '04',
      title: { en: 'Improve', id: 'Improve' },
      body: {
        en: 'We monitor, fix and adjust the flows as your business changes.',
        id: 'Kami pantau, perbaiki, dan sesuaikan alur saat bisnis Anda berubah.',
      },
    },
  ],
};

export const CASE_STUDIES = {
  eyebrow: { en: 'Work', id: 'Studi kasus' },
  heading: { en: 'Systems we built, running in real businesses', id: 'Sistem yang kami bangun, berjalan di bisnis nyata' },
  footnote: {
    en: 'actual = measured by the client · estimated = our estimate from the before/after process',
    id: 'aktual = diukur oleh klien · estimasi = perkiraan kami dari proses sebelum/sesudah',
  },
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

export const DEMO_CHAT = {
  business: 'Harmoni Music Studio', // fictional
  chips: [
    { en: 'Which class suits an 8-year-old?', id: 'Kelas apa yang cocok untuk anak 8 tahun?' },
    { en: 'What are the prices?', id: 'Berapa biayanya?' },
    { en: 'Can I book a trial?', id: 'Bisa daftar kelas percobaan?' },
  ],
  handoff: { en: 'Handed to team: registration confirmed', id: 'Diteruskan ke tim: pendaftaran dikonfirmasi' },
  caption: { en: 'Scripted demo with fictional data.', id: 'Demo dengan skrip dan data fiktif.' },
};

export const DEMO_ENRICH = {
  button: { en: 'Enrich list', id: 'Lengkapi data' },
  // ID TODO: column names are the same in both languages until copy is approved.
  columns: [
    { en: 'Domain', id: 'Domain' },
    { en: 'Size', id: 'Size' },
    { en: 'Industry', id: 'Industry' },
    { en: 'Contact role', id: 'Contact role' },
  ],
  caption: {
    en: 'Input is just the company name. Every other column fills automatically.',
    id: 'Input hanya nama perusahaan. Kolom lainnya terisi otomatis.',
  },
};

export const ROI = {
  heading: { en: 'What is repetitive work costing you?', id: 'Berapa biaya kerja repetitif di bisnis Anda?' },
  // ID TODO: input labels have no Indonesian text in PRD 00. EN is repeated as a placeholder.
  inputs: {
    people: {
      label: { en: 'Team members doing admin/ops work', id: 'Team members doing admin/ops work' },
      min: 1,
      max: 50,
      default: 6,
    },
    hours: {
      label: {
        en: 'Hours of repetitive work per person per week',
        id: 'Hours of repetitive work per person per week',
      },
      min: 2,
      max: 30,
      default: 10,
    },
    salary: {
      label: { en: 'Average monthly salary', id: 'Average monthly salary' },
      currency: { en: 'USD', id: 'Rp' },
      range: {
        en: { min: 500, max: 8000, default: 1500 },
        id: { min: 3500000, max: 25000000, default: 6500000 },
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
  cta: { en: 'Talk through these numbers', id: 'Bahas angka ini bersama kami' },
};

export const ENGAGEMENT = {
  heading: { en: 'Start small. Grow when it pays off.', id: 'Mulai kecil. Kembangkan saat hasilnya terbukti.' },
  plans: [
    {
      name: { en: 'Audit', id: 'Audit' },
      badge: { en: 'Free', id: 'Gratis' },
      body: {
        en: '30-minute call. We map your bottlenecks and tell you what\'s worth automating, even if it\'s not us who builds it.',
        id: 'Sesi 30 menit. Kami petakan hambatan Anda dan tunjukkan apa yang layak diotomasi, meski bukan kami yang membangunnya.',
      },
      cta: { en: 'Book audit', id: 'Jadwalkan audit' },
    },
    {
      name: { en: 'Build', id: 'Build' },
      badge: { en: 'Project', id: 'Proyek' },
      highlight: true,
      body: {
        en: 'A scoped project with clear milestones, usually live in 2–4 weeks. Fixed scope agreed before we start.',
        id: 'Proyek dengan cakupan dan milestone jelas, umumnya live dalam 2–4 minggu. Cakupan disepakati sebelum mulai.',
      },
      cta: { en: 'Discuss a project', id: 'Diskusikan proyek' },
    },
    {
      name: { en: 'Grow', id: 'Grow' },
      badge: { en: 'Retainer', id: 'Retainer' },
      body: {
        en: 'Monitoring, fixes and new flows each month as your business changes.',
        id: 'Pemantauan, perbaikan, dan alur baru setiap bulan seiring bisnis Anda berubah.',
      },
      cta: { en: 'Ask about retainers', id: 'Tanya soal retainer' },
    },
  ],
};

export const FAQ = {
  items: [
    {
      q: { en: 'What kind of businesses do you work with?', id: 'Bisnis seperti apa yang cocok?' },
      a: {
        en: "Small and mid-sized teams with a lot of repeated work: customer chats, lead follow-up, order and data handling. We've built for education, property, distribution and field services.",
        id: 'Tim kecil hingga menengah dengan banyak pekerjaan berulang: chat pelanggan, follow-up prospek, pengelolaan pesanan dan data. Kami sudah membangun untuk pendidikan, properti, distribusi, dan layanan lapangan.',
      },
    },
    {
      q: { en: 'How long does a project take?', id: 'Berapa lama pengerjaannya?' },
      a: {
        en: 'Most first systems go live in 2–4 weeks. The audit tells you the real timeline before you commit.',
        id: 'Sebagian besar sistem pertama live dalam 2–4 minggu. Audit akan memberi gambaran waktu yang pasti sebelum Anda memutuskan.',
      },
    },
    {
      q: { en: 'Will AI replace my team?', id: 'Apakah AI akan menggantikan tim saya?' },
      a: {
        en: 'No. It takes the repetitive part. Your team keeps the decisions, and every flow has a hand-off to a person.',
        id: 'Tidak. AI mengambil bagian yang repetitif. Keputusan tetap di tim Anda, dan setiap alur punya jalur eskalasi ke manusia.',
      },
    },
    {
      q: { en: 'Do I need to change my tools?', id: 'Apakah saya harus ganti tools?' },
      a: {
        en: 'Usually not. We connect what you already use: WhatsApp, Sheets, your CRM, email.',
        id: 'Umumnya tidak. Kami hubungkan yang sudah Anda pakai: WhatsApp, Sheets, CRM, email.',
      },
    },
    {
      q: { en: 'How much does it cost?', id: 'Berapa biayanya?' },
      a: {
        en: 'It depends on scope. After the free audit you get a fixed-scope proposal, so you know the price before anything is built.',
        id: 'Tergantung cakupan. Setelah audit gratis Anda menerima proposal dengan cakupan tetap, jadi harga sudah jelas sebelum apa pun dibangun.',
      },
    },
    {
      q: { en: 'Is my data safe?', id: 'Apakah data saya aman?' },
      a: {
        en: 'We work under NDA, use your own accounts where possible, and only access what the flow needs.',
        id: 'Kami bekerja di bawah NDA, memakai akun milik Anda bila memungkinkan, dan hanya mengakses data yang dibutuhkan alur.',
      },
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
  dashboard: {
    // Illustrative run log. ID TODO: no Indonesian text in PRD 00, EN repeated as placeholder.
    rows: [
      { en: 'WhatsApp agent · 142 chats handled today', id: 'WhatsApp agent · 142 chats handled today' },
      { en: 'Lead sync · 18 new rows', id: 'Lead sync · 18 new rows' },
      { en: 'Quote flow · 6 PDFs sent', id: 'Quote flow · 6 PDFs sent' },
      { en: 'Handed to team · 9', id: 'Handed to team · 9' },
    ],
  },
};

export const FOOTER = {
  tagline: {
    en: 'AI automation & growth systems for teams that would rather grow than copy-paste.',
    id: 'Sistem otomasi AI untuk tim yang lebih memilih tumbuh daripada copy-paste.',
  },
  // ID TODO: column headings have no Indonesian text in PRD 00.
  headings: {
    services: { en: 'Services', id: 'Services' },
    company: { en: 'Company', id: 'Company' },
    contact: { en: 'Contact', id: 'Contact' },
  },
  // ID TODO: "Book audit" ID text is not in PRD 00. Using the approved "Jadwalkan audit" wording.
  bookAudit: { en: 'Book audit', id: 'Jadwalkan audit' },
  whatsapp: { en: 'WhatsApp', id: 'WhatsApp' },
  email: { en: 'Email', id: 'Email' },
  copyright: '© 2026 Newseed',
};
