---
name: Legal Integrity System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#444653'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#003272'
  on-tertiary: '#ffffff'
  tertiary-container: '#00489e'
  on-tertiary-container: '#9cbbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  stack-xl: 48px
---

## Brand & Style

The design system is engineered for a premium LegalTech environment where precision, speed, and trust are paramount. The aesthetic is rooted in **Minimalism** and **Modern Corporate** styles, drawing inspiration from high-performance developer tools to provide a "pro-grade" experience for legal professionals.

The visual narrative prioritizes clarity over decoration. It utilizes expansive whitespace to reduce cognitive load during complex document reviews and litigation workflows. The interface remains quiet and functional, allowing the user's data to take center stage, while subtle high-fidelity details—such as micro-interactions and refined border treatments—signal the premium nature of the platform.

**Emotional Response:**
- **Authority:** Through structured layouts and stable typography.
- **Efficiency:** Through densified data views and lightning-fast transitions.
- **Security:** Through a disciplined, sober color palette and crisp geometric shapes.

## Colors

The palette is anchored in a spectrum of blues to evoke the traditional reliability of the legal profession, modernized for a SaaS context. 

- **Primary & Secondary:** Used for high-priority actions, active states, and brand presence. These should be used sparingly to maintain the minimal aesthetic.
- **Neutral Scale:** We use a sophisticated slate-tinted neutral scale. The background (`#F8FAFC`) provides a cool, clinical canvas that makes white cards (`#FFFFFF`) feel elevated and distinct.
- **Semantic Colors:** Success, Warning, and Danger colors are calibrated to be legible against white backgrounds while maintaining high saturation for immediate recognition.
- **Borders:** Crisp, low-contrast borders are the primary method for defining hierarchy, replacing heavy shadows.

## Typography

This design system relies exclusively on **Inter** to achieve a systematic, utilitarian look that remains highly legible across high-density data grids and long-form legal documents.

- **Tracking:** Headlines use slight negative letter-spacing (`-0.01em` to `-0.02em`) to create a tighter, more "designed" appearance. Small labels use increased tracking for legibility.
- **Hierarchy:** Contrast is created primarily through font weight and color (Heading vs. Muted) rather than drastic size changes.
- **Usage:** 
    - `Display` and `Headline-lg` are reserved for marketing or dashboard overviews.
    - `Body-sm` is the workhorse for data tables and sidebars.
    - `Label-sm` (Uppercase) is used for section headers within menus and metadata titles.

## Layout & Spacing

The design system employs a **Fluid Grid** with fixed maximum constraints to ensure readability on ultra-wide monitors common in legal offices. 

- **The 4px Rule:** All spacing increments are multiples of 4px. This ensures a mathematical harmony across the UI.
- **Sidebar Architecture:** A fixed-width left navigation (240px - 280px) is standard for the desktop application, providing persistent access to core modules like Cases, Documents, and Billing.
- **Density:** The system supports "Standard" and "Compact" views. Compact view reduces `stack` spacing and padding by one level (e.g., 16px becomes 12px) for data-heavy table views.
- **Breakpoints:**
    - Mobile: < 768px (Single column, 16px margins)
    - Tablet: 768px - 1024px (Reduced margins, collapsible sidebar)
    - Desktop: > 1024px (Full multi-column layout, 40px margins)

## Elevation & Depth

To maintain a crisp, professional feel, the design system avoids heavy drop shadows. Instead, it utilizes **Low-contrast outlines** and **Tonal layers**.

- **Z-Index 0 (Canvas):** The base background (`#F8FAFC`).
- **Z-Index 1 (Cards/Surfaces):** White backgrounds with a 1px border (`#E5E7EB`).
- **Z-Index 2 (Popovers/Modals):** White background with a subtle, diffused shadow: `0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.05)`.
- **Interactive States:** On hover, cards may transition from a default border to a Primary-tinted border (`#DBEAFE`) or gain a very slight elevation increase.

## Shapes

The shape language is "Soft-Modern." It avoids the clinical feel of sharp corners while remaining more professional than fully rounded/playful systems.

- **Standard (8px):** Applied to buttons, input fields, and small cards.
- **Large (16px):** Applied to main content containers and large modals.
- **Extra Large (24px):** Reserved for marketing sections or featured "empty state" illustrations.
- **Strictness:** All icons and decorative elements must follow the same corner radius logic to ensure visual cohesion.

## Components

### Buttons
- **Primary:** Solid `#1E40AF` with white text. High contrast, sharp execution.
- **Secondary:** White background, `#E5E7EB` border, `#111827` text.
- **Ghost:** No background or border, `#6B7280` text, turns `#111827` on hover.
- **Padding:** 10px 16px for standard; 12px 20px for large.

### Input Fields
- **Default:** 1px border (`#E5E7EB`), white background. 
- **Focus:** 1px border (`#3B82F6`) with a 2px semi-transparent sky-blue ring (`ring-offset-2`).
- **Typography:** Labels are `label-md` in `#111827`.

### Cards
- Always use white backgrounds.
- Borders are mandatory (`1px solid #E5E7EB`).
- Padding should be generous (typically `stack-lg` or 24px).

### Chips & Badges
- Used for status (e.g., "Pending", "Active").
- Utilize a light tinted background with dark text (e.g., Success: Background `#D1FAE5`, Text `#065F46`).
- Border-radius: `rounded-lg` for a modern, contained look.

### Data Tables
- Header row: `#F8FAFC` background, `label-sm` text color `#6B7280`.
- Row height: 52px (Standard), 40px (Compact).
- Divider: 1px horizontal line `#F1F5F9`.

### Iconography
- Use **Lucide** icons.
- Stroke width: 2px for standard UI; 1.5px for large dashboard icons.
- Color: Inherits text color or uses Primary for emphasis.