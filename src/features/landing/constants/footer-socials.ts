export type SocialIconName = "x" | "instagram" | "linkedin";

export interface SocialLink {
  /** Accessible name — announced by screen readers in place of the icon. */
  label: string;
  href: string;
  icon: SocialIconName;
}

export const FOOTER_SOCIALS: SocialLink[] = [
  {
    label: "Grayward on X",
    href: "https://x.com/_grayward",
    icon: "x",
  },
  {
    label: "Grayward on Instagram",
    href: "https://www.instagram.com/_grayward",
    icon: "instagram",
  },
  {
    label: "Grayward on LinkedIn",
    href: "https://www.linkedin.com/company/grayward/",
    icon: "linkedin",
  },
];
