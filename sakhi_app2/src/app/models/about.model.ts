export interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio?: string;
  linkedin?: string;
  email?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutData {
  preview: {
    eyebrow: string;
    heading: string;
    subheading: string;
    pillars: Pillar[];
    ctaLabel: string;
    ctaLink: string;
  };
  full: {
    heroHeading: string;
    heroSubheading: string;
    stats: Stat[];
    story: {
      title: string;
      paragraphs: string[];
    };
  };
  teamHeading: string;
  teamSubheading: string;
  team: TeamMember[];
}