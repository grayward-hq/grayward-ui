export type SocialIconName = "x" | "instagram" | "linkedin";

export interface SocialLink {
  /** Accessible name — announced by screen readers in place of the icon. */
  label: string;
  href: string;
  icon: SocialIconName;
}

export const FOOTER_SOCIALS: SocialLink[] = [
  {
    label: "VulnWatch AI on X",
    href: "https://x.com/_vulnwatch",
    icon: "x",
  },
  {
    label: "VulnWatch AI on Instagram",
    href: "https://www.instagram.com/_vulnwatch",
    icon: "instagram",
  },
  {
    label: "VulnWatch AI on LinkedIn",
    href: "https://www.linkedin.com/company/vulnwatch/",
    icon: "linkedin",
  },
];
