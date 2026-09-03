export interface NavDropdownItem {
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface NavMenuSection {
  label: string;
  href?: string;
  dropdown?: {
    items: NavDropdownItem[];
    featured?: {
      title: string;
      description: string;
      linkText: string;
      tag: string;
    };
  };
}

export interface WorkflowTab {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  stats: {
    value: string;
    label: string;
  };
  features: string[];
  mockupType: 'sales' | 'recruiting' | 'cs' | 'revops';
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  tag: string;
  visualHighlight: string;
}

export interface IntegrationItem {
  name: string;
  category: 'calendars' | 'video' | 'crm' | 'payments' | 'messaging';
  description: string;
  icon: string;
  popular?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'outline';
  features: string[];
  seatType: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface BookingSlot {
  time: string;
  period: 'AM' | 'PM';
  available: boolean;
}
