export interface ContactLine {
  text: string;
  href?: string;
}

export interface ContactCard {
  icon: 'phone' | 'mail' | 'pin';
  title: string;
  subtitle?: string;
  lines: ContactLine[];
}

export interface ContactInfo {
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaLink: string;
  cards: ContactCard[];
  businessHours: { day: string; hours: string; closed?: boolean }[];
  mapEmbedUrl: string;
}