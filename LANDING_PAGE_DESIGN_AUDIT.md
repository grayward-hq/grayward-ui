# Figma Design to Code Audit: Landing Pages & Waitlist

**Project**: VulnWatch / Grayward  
**Figma File**: [VulnWatch (`ouCjjeI7mo6TW17go7HdZk`)](https://www.figma.com/design/ouCjjeI7mo6TW17go7HdZk/VulnWatch?node-id=4183-20082)  
**Target Page**: `End to End (Dev Ready)` (`node-id=4183:20082`)  
**Target Screens**:
1. **Desktop Landing Page**: `9312:7173` (1440 x 7884px)
2. **Mobile Landing Page**: `9312:7716` (390 x 10848px)
3. **Waitlist Landing Page**: `9312:10066` (1440 x 5978px)
4. **External Subpages Reference**: `5604:11843` (About Us, How It Works, FAQs, Contact, Legal Docs, Press)  
**Target Codebase**: `grayward-ui` (`src/app/(home)`, `src/features/landing`, `src/features/waitlist`)  
**Date**: November 2026  
**Audit Status**: **Complete — Actionable Implementation Plan Included**

---

## Executive Summary

An exhaustive comparative audit was conducted between the Figma **End to End (Dev Ready)** design specification and the active **`grayward-ui`** web codebase.

| Category | Implementation Status | Overall Fidelity Score |
| :--- | :--- | :---: |
| **Landing Page Structure** | All 8 core sections exist in codebase | **78%** |
| **Hero Section & Scan Action** | Scan input replaced with waitlist redirect; static PNG used | **60%** |
| **Features Section** | Implemented with 6 cards; minor token differences | **90%** |
| **How It Works Section** | Implemented with 3 steps & alternating layout | **92%** |
| **Why Choose Section** | Significant visual drift (border-accent cards vs rounded cards with icons) | **55%** |
| **Pricing Section** | Fully built component but **commented out** in `page.tsx` | **0% rendered** (85% code ready) |
| **Testimonials Section** | Bi-directional marquee implemented | **88%** |
| **FAQ Section** | Accordion + support card implemented cleanly | **95%** |
| **Trust & Transparency Banner** | Implemented cleanly | **90%** |
| **Footer & Badges** | Implemented with SOC 2 / non-intrusive badges | **92%** |
| **Waitlist Screen (`9312:10066`)** | Dedicated `/waitlist` page with all 6 sections & forms | **92%** |
| **Mobile Responsiveness (`9312:7716`)** | Mobile viewport classes present; minor layout quirks | **82%** |

---

## Top Critical Blockers & High-Priority Findings

### 1. Pricing Section Is Disabled in Production
In `src/features/landing/pages/(home)/page.tsx` (line 26), the `<PricingSection />` component is commented out:
```tsx
{/* <PricingSection /> */}
```
In Figma (`Frame 2147232072` / `9312:7344`), the Pricing section is an essential part of the landing page between "Why Choose" and "Testimonials". The component code already exists in `src/features/la

### 2. Hero Interactive Scan Form Replaced by Waitlist CTA
In Figma (`9312:7572`), the hero section contains a functional search/input bar for domain scanning:
- Placeholder: *"Scan my Website"* / domain input
- CTA button: *"Scan"* with an integrated scan radar icon

In the codebase (`src/features/landing/components/hero/HeroScanForm.tsx`), this was completely replaced with a single button:
```tsx
<button onClick={() => router.push(`${ROUTES.WAITLIST}#waitlist-form`)}>
  Join waitlist <ArrowRight />
</button>
```
**Decision Required**: If the product is in pre-launch waitlist mode, this substitution may be intentional; however, if the goal is to align with the Dev Ready design, the domain input form with insta

### 3. Why Choose Section Visual Style Drift
In Figma (`9312:7294`), the 4 cards are full rounded containers (`rounded-[30px]`, background `#F4F4F5`, padding `40px`) each featuring a dedicated top icon badge (`vuesax/linear/cpu`, `vuesax/linear/

In the codebase (`src/features/landing/components/why-choose/WhyChoose.tsx`), these cards were built as flat text blocks with a thick left-border accent (`border-l-[8px] border-[#C0D7FF]` / `border-[#

### 4. Header Actions Suppressed on Landing Page
In `src/features/landing/components/header/HeaderActions.tsx`:
```ts
const isCtaSuppressedPage = pathname === ROUTES.HOME || pathname === ROUTES.WAITLIST;
const showJoinWaitlist = FEATURE_FLAGS.SHOW_JOIN_WAITLIST_BUTTON && !isCtaSuppressedPage;
```
This logic completely strips the CTA buttons from the desktop header on the home page! In Figma (`9312:7575`), the header explicitly displays **"Log in"** (outlined button) and **"Start Free Trial"** 

### 5. Hero Dashboard Graphic: Flat PNG vs Layered Mockup
In Figma (`9312:7600`), the hero graphic consists of:
1. A central Macbook mockup (`9913:5896`) displaying the core application dashboard (`9913:5905`).
2. Floating card on left (`9312:7602`): Scan execution summary preview.
3. Floating card on right (`9312:7601`): Vulnerability assessment breakdown preview.
4. Soft background glow ellipses.

In the codebase (`src/features/landing/components/hero/HeroDashboardPreview.tsx`), this is rendered as a single pre-baked static image (`hero-section-desktop.png`). While performant, it prevents respo

---

## Detailed Section-by-Section Gap Analysis

### 1. Header & Navigation (`Header_desk` - Node `9312:7575`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Container** | Height: 72px, Max-W: 1440px, Padding: 22px 120px, BG: `#FFFFFF`, bottom border `#E4E4E7` | `h-[72px] max-w-[1280px] px-4 md:px-6 lg:px-8`, shadow inset | **Aligned**. Container paddi
| **Logo** | `Logo 2` (`8930:7419`): Shield icon (28.78 x 34.05px) + text "**Gray**Ward" (`#0F264F`) | Uses raster Image `/images/logo.png` (160 x 40px) | **Minor mismatch**: Recommend migrating to in
| **Nav Links** | 4 items: `Home`, `About Us`, `How It Works`, `FAQ` (16px, Geist Regular, `#414141`, active `#0F264F`) | `NAV_LINKS` with matching 4 items in `nav-links.ts` | **Aligned** (100%). |
| **Login CTA** | White button, border `#0F264F`, text `#2A2A2A` (16px Geist Medium), rounded 12px | Built in `HeaderActions.tsx` with identical styling | **Flag-gated**: Controlled by `FEATURE_FLAGS.
| **Primary CTA** | Navy `#0F264F` button, border `#C0D7FF`, text "Start Free Trial" with arrow icon | Label is "Join Waitlist"; **suppressed on home page** via `isCtaSuppressedPage` | **Fix needed**:
| **Mobile Header** | Logo + Hamburger button (390px viewport) | Built with `Menu` / `X` Lucide icons + `MobileMenu` drawer | **Aligned** (100%). |

---

### 2. Hero Section (`Hero Section V` - Node `9312:7572`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Headline** | `Spot Your Website’s Vulnerabilities Before a Hacker Does.` (56px / 64px, Geist SemiBold) | `HERO_HEADLINE` in `hero-content.ts` | **Aligned** (100%). |
| **Subtitle** | `Type your domain name. Vulnwatch scans your website for potential threats...` (20px, Geist Regular) | `HERO_DESCRIPTION` using "Grayward" | **Aligned** (Copy improvement accepted). |
| **Domain Scan Bar** | Container width ~600px with text input + "Scan" button with radar icon | Replaced with single "Join waitlist" button linking to `/waitlist#waitlist-form` | **Major functional g
| **Macbook & Floating Cards** | Layered artwork: Macbook (1200px) + Left Card (627px) + Right Card (628px) | Flattened single PNG `hero-section-desktop.png` | **Visual gap**: Keep PNG for fast initia
| **Background Glow** | Dual radial gradients (`#FFFFFF` to `#C0D7FF`) | Handled via `HeroBackgroundGlow.tsx` and linear-gradient background | **Aligned** (95%). |

---

### 3. Features Section (`Frame 2147231949` - Node `9312:7206`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Pill Badge** | "Features" (`#FAFAFA` bg, border `#E0E0E0`, text `#2B2B2B` 18px) | Implemented with matching classes in `features.tsx` | **Aligned** (100%). |
| **Heading** | "Everything you need to **stay protected**" (48px, `#2B2B2B`, highlighted text in `#0F264F`) | Implemented with matching text and highlight | **Aligned** (100%). |
| **Subheading** | "One platform with everything. Every layer of your webstack backed up by real-time threat intelligence" | Implemented in `features.tsx` | **Aligned** (100%). |
| **6 Feature Cards** | 1. Malware Detection<br>2. SSL/TLS Review<br>3. DNS & Domain Health<br>4. Security Headers<br>5. Dark Web Exposure<br>6. Uptime & Performance | All 6 cards defined in `Features
| **Card Styling** | Rounded 24px, border `#EFEFEF`, navy icon badge (48 x 48px) | `rounded-xl border-2 border-[#EFEFEF] p-6`, icon container `h-12 w-12 rounded-lg bg-[#0F264F]` | **Minor tweak**: Cha

---

### 4. How It Works Section (`Frame 2147232070` - Node `9312:7261`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Pill Badge & Header** | "Quick Start" / "From Curious to Confident" / "No installs, no agents..." | Implemented in `HowItWorks.tsx` | **Aligned** (100%). |
| **3 Alternating Steps** | - 01: Add Your Domain<br>- 02: Scan Your Website<br>- 03: Get Report | Implemented in `steps` array with alternating row layout | **Aligned** (100%). |
| **Card Corners** | Asymmetric rounded corners (e.g. `md:rounded-tr-[40px] md:rounded-br-[40px]`) | Implemented with custom radius classes | **Aligned** (95%). |
| **Step Copy** | Steps 01 and 02 in Figma contain placeholder e-commerce text ("sales and profit reports") | Codebase contains that same text | **Content Task**: Align with product team to replace mo

---

### 5. Why Choose Section (`Frame 2147231967` - Node `9312:7294`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Header** | "Why Choose VulnWatch AI" / "See risks clearly, fix them faster..." | Implemented in `WhyChoose.tsx` with "Why Choose Grayward" | **Aligned**. |
| **Card Presentation** | 4 full cards, `rounded-[30px]`, background `#F4F4F5`, padding 40px | 4 border-left accented text rows (`border-l-[8px] px-8 py-2`) | **Action Required**: Refactor `WhyChoose.
| **Card Icons** | Dedicated SVG icons: `cpu`, `note-text`, `row-vertical`, `key` | No icons currently rendered in `WhyChoose.tsx` | **Action Required**: Add Lucide or Vuesax icons (`Cpu`, `FileText`,

---

### 6. Pricing Section (`Frame 2147232072` - Node `9312:7344`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Visibility** | Prominently displayed between Why Choose and Testimonials | **Commented out** in `src/features/landing/pages/(home)/page.tsx` | **Blocker**: Uncomment `<PricingSection />` in `page.
| **3 Tiers** | Essential ($28/mo), Professional ($19/mo - Most Popular), Premium ($29/mo) | Data configured in `constants.ts` | **Aligned**. |
| **"Most Popular" Banner** | Navy banner `#0F264F` on top of middle card | Built in `PricingCard.tsx` | **Aligned** (100%). |
| **Checkmark Asset** | Clean vector checkmark | Uses JPEG `/images/checkbox-circle-line.jpg` | **Fix needed**: Replace `.jpg` with an inline Lucide `Check` or SVG asset. |
| **CTA Button** | "Try Demo" (`h-[48px]`, `#0F264F` filled button) | Implemented with "Try Demo" button in `PricingCard.tsx` | **Aligned** (100%). |

---

### 7. Testimonials Section (`Frame 2147231969` - Node `9312:7438`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Header** | "Testimonials" / "Trusted by over **12,000+** teams worldwide" | Implemented in `Testimonials.tsx` | **Aligned** (100%). |
| **Display Mode** | Two rows of customer review cards with avatars, author, company, and quote | Bi-directional animated marquee (`ScrollingRow.tsx`) | **Aligned & Enhanced**. |

---

### 8. FAQ Section (`Frame 8` - Node `9312:7513`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Layout** | 2-column layout on desktop: Left column has title + "More questions? Contact support" card; Right column has accordion | Implemented in `Faqs.tsx` | **Aligned** (100%). |
| **Support Card** | User avatar stack + "Contact support" primary button linking to `/contact` | Implemented in `Faqs.tsx` with `UserAvatarCascade` | **Aligned** (100%). |
| **Accordion Behavior** | Collapsible items with chevron indicators | Implemented with `FaqAccordion.tsx` | **Aligned** (100%). |

---

### 9. Trust & Transparency Banner (`Frame 2147232071` - Node `9312:7563`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Pill Badge** | "Trust & Transparency" | Implemented in `TrustTransparency.tsx` | **Aligned** (100%). |
| **Headline** | "Your **Website** could be compromised **right now**" | Implemented with white/navy color highlights | **Aligned** (100%). |
| **Subheading** | "Find out in under 60 seconds" | Implemented (fixed Figma typo "secondss") | **Aligned** (100%). |
| **CTA Button** | "Start Free Scan" (with arrow icon) | Implemented with button linking to waitlist form | **Aligned** (100%). |
| **Background Color** | Soft cornflower blue (`#C0D7FF`) | Implemented with `bg-[#C0D7FF]` | **Aligned** (100%). |

---

### 10. Footer & Compliance Badges (`Frame 23` - Node `9312:7174`)

| Element | Figma Design Spec | Codebase Implementation | Status & Remediation |
| :--- | :--- | :--- | :--- |
| **Brand Info** | Logo + description: *"Website security in plain English. Non-intrusive scans, severity-ranked findings..."* | Implemented in `FooterBrand.tsx` | **Aligned** (100%). |
| **Columns** | Product (About Us, Contact), Company (Press), Legal (Legal Docs) | Implemented in `FooterLinks.tsx` & `footer-links.ts` | **Aligned** (100%). |
| **Bottom Bar** | Dark Navy `#0F264F` bar with copyright on left, 3 compliance badges on right | Implemented in `FooterBottomBar.tsx` | **Aligned** (100%). |
| **3 Badges** | 1. "SOC 2 aligned process"<br>2. "No credentials required"<br>3. "No exploit attempts performed" | Exact text matches in `FOOTER_BOTTOM_BAR.badges` | **Aligned** (100%). |

---

## Waitlist Page Audit (`Waitlist ` - Node `9312:10066`)

The Waitlist page in Figma is represented on route `/waitlist` (`WaitlistLandingPage.tsx`).

| Section | Figma Node & Content | Codebase Implementation | Status |
| :--- | :--- | :--- | :---: |
| **1. Hero** | "Stop Shipping Known Vulnerabilities" (`9312:10131`) | `HeroSection.tsx` | **100% Match** |
| **2. Capabilities** | 4 cards: GitHub OAuth, Trivy Deep Scanning, Zero-day CVE, AI Explanations (`9312:10156`) | `CapabilitiesSection.tsx` | **100% Match** |
| **3. How It Works** | 3-step Quick Start (`9990:17064`) | Reused `<HowItWorks />` component | **100% Match** |
| **4. Intelligence** | "Not just a list of CVEs. A plan to fix them." + lodash CVE mock card (`9312:10201`) | `IntelligenceSection.tsx` | **98% Match** |
| **5. Testimonials** | Beta tester quotes from Sarah K. & Marcus T. (`9312:10258`) | `TestimonialsSection.tsx` | **100% Match** |
| **6. Waitlist Form** | 3 value cards on left ("Be first in line", etc.) + Interactive form on right (`9312:10285`) | `WaitlistFormSection.tsx` & `WaitlistForm.tsx` | **95% Match** |

---

## Prioritized Implementation Roadmap

### Phase 1: High Priority (Immediate)
- [ ] **Uncomment Pricing Section**: Open `src/features/landing/pages/(home)/page.tsx` and uncomment `<PricingSection />`.
- [ ] **Enable Header CTA on Home**: Update `isCtaSuppressedPage` in `HeaderActions.tsx` so desktop visitors see the "Start Free Trial" (or "Join Waitlist") button in the navigation bar.
- [ ] **Fix Checkmark Asset**: Replace `/images/checkbox-circle-line.jpg` in `PricingCard.tsx` with a lightweight SVG or Lucide `Check` component.

### Phase 2: Medium Priority (Visual & Structural Alignment)
- [ ] **Refactor `WhyChoose.tsx`**:
  - Replace the left-border accent styling with rounded cards (`rounded-[24px]` or `rounded-[30px]`, background `#F4F4F5`, padding `p-8` to `p-10`).
  - Add top-left icon badges (`Cpu`, `FileText`, `SlidersHorizontal`, `ShieldAlert`).
- [ ] **Hero Scan Form Alignment**:
  - If instant domain scanning is ready, implement the input field + "Scan" button with radar icon as shown in Figma.
  - If the project is remaining in waitlist-only mode, adjust the copy to transparently communicate waitlist access.
- [ ] **Layered Hero Artwork**:
  - Replace the monolithic `hero-section-desktop.png` with independent components: central Macbook mockup frame and absolute-positioned floating cards with subtle hover/motion.

### Phase 3: Polish & Quality Assurance
- [ ] **Copy Clean-up**: Update mock copy in `HowItWorks` (remove "sales and profit reports", replace with security scanning copy).
- [ ] **Vector Logo**: Export Figma `Logo 2` (`8930:7419`) directly to an SVG asset in `/public/images/logo.svg` to guarantee crisp rendering.
- [ ] **Responsive Verification**: Run end-to-end checks across standard viewports (390px, 768px, 1024px, 1440px).
