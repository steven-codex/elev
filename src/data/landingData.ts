import {
  WorkflowTab,
  FeatureCard,
  IntegrationItem,
  PricingPlan,
  Testimonial,
  FaqItem,
  NavMenuSection
} from '../types';

export const NAV_MENU_SECTIONS: NavMenuSection[] = [
  {
    label: 'Product',
    dropdown: {
      items: [
        {
          title: 'Routing Forms',
          description: 'Qualify, route, and book leads directly from website forms.',
          icon: 'GitFork',
          badge: 'New'
        },
        {
          title: 'Availability & Buffers',
          description: 'Set custom working hours, time zones, and buffer times.',
          icon: 'Clock'
        },
        {
          title: 'Automated Workflows',
          description: 'Send custom email and SMS reminders, follow-ups, and surveys.',
          icon: 'Zap'
        },
        {
          title: 'Team Scheduling',
          description: 'Round-robin distribution, collective, and group meeting pools.',
          icon: 'Users'
        },
        {
          title: 'Integrations & Webhooks',
          description: 'Sync seamlessly with Google, Outlook, Salesforce, and Zoom.',
          icon: 'Layers'
        }
      ],
      featured: {
        tag: 'Product Highlight',
        title: 'Instant Lead Routing 2.0',
        description: 'Match inbound prospects to the exact right account executive in under 1.2 seconds.',
        linkText: 'Explore Routing Forms →'
      }
    }
  },
  {
    label: 'Solutions',
    dropdown: {
      items: [
        {
          title: 'Sales & Revenue',
          description: 'Shorten deal cycles and prevent pipeline slippage with instant booking.',
          icon: 'TrendingUp'
        },
        {
          title: 'Recruiting & Talent',
          description: 'Coordinate panel interviews and candidate screeners without delay.',
          icon: 'UserCheck'
        },
        {
          title: 'Customer Success',
          description: 'Accelerate client onboarding and run quarterly business reviews.',
          icon: 'HeartHandshake'
        },
        {
          title: 'Marketing & Demand Gen',
          description: 'Convert web traffic into booked qualified demos instantly.',
          icon: 'Megaphone'
        },
        {
          title: 'Information Technology',
          description: 'Centralized admin controls, SSO, SCIM provisioning, and audit logs.',
          icon: 'ShieldCheck'
        }
      ]
    }
  },
  {
    label: 'Enterprise',
    href: '#pricing'
  },
  {
    label: 'Pricing',
    href: '#pricing'
  },
  {
    label: 'Resources',
    dropdown: {
      items: [
        {
          title: 'Customer Stories',
          description: 'See how 100k+ global teams scale meetings with elev.',
          icon: 'BookOpen'
        },
        {
          title: 'Help Center & Docs',
          description: 'Guides, tutorials, and setup documentation.',
          icon: 'HelpCircle'
        },
        {
          title: 'ROI Calculator',
          description: 'Calculate hours and money saved by automating scheduling.',
          icon: 'Calculator'
        },
        {
          title: 'Security & Compliance',
          description: 'SOC 2 Type II, HIPAA, and GDPR compliance details.',
          icon: 'Lock'
        }
      ]
    }
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
      'Personalized elev booking link (elev.io/yourname)',
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
    quote: 'Elev transformed our inbound sales conversion. Prospects now book demos right from our demo request page instead of waiting 24 hours. Our show rate jumped from 61% to 89% in week one.',
    author: 'Elena Rostova',
    role: 'VP of Global Revenue',
    company: 'CloudScale Technologies',
    metric: '+48%',
    metricLabel: 'Increase in qualified pipeline velocity',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
  },
  {
    quote: 'Our recruiting team coordinates 200+ panel interviews across 4 time zones every month. Elev automated all the collective availability math. We saved over 18 hours per recruiter each month.',
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
    answer: 'Elev connects directly to your Google Calendar, Microsoft Outlook, or Office 365 accounts in real time. Whenever someone visits your booking link, elev checks your real-time busy slots across all connected accounts and only displays truly available times. When an event is scheduled, elev immediately blocks the time slot across your calendars and sends calendar invites to both parties.'
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
    answer: 'Yes! Elev integrates natively with Zoom, Google Meet, Microsoft Teams, Webex, and GoToMeeting. When a meeting is confirmed, elev automatically provisions a unique, secure video conference link and inserts it directly into the calendar event and reminder messages.'
  }
];
