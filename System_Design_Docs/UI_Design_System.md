# UI Design System: Fantasy Hammer

## Brand Identity
- **Name:** Fantasy Hammer
- **Tagline:** Executive Auction Engine
- **Core Values:** Strength, Decisiveness, Finality, Professionalism.
- **Target Audience:** Team owners, analysts, league administrators.

## Visual Language
- **Tone:** Executive, Confident, Disciplined.
- **Style:** Flat design, subtle gradients, high contrast, minimalist.
- **Imagery:** Abstract textures (subtle cricket pitch patterns), clean iconography. No cartoonish elements.

## Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Zinc 900** | `#18181b` | Main Background |
| **Zinc 800** | `#27272a` | Card/Container Backgrounds |
| **Zinc 700** | `#3f3f46` | Borders, Hover States |
| **Zinc 400** | `#a1a1aa` | Secondary Text, Icons |
| **Zinc 100** | `#f4f4f5` | Primary Text, Headings |
| **Amber 600** | `#d97706` | Brand Accent (Muted Gold) |
| **Emerald 600**| `#059669` | Success, Active Status |

## Typography
- **Font Family:** 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Headings:** Bold weights (700), clean spacing, strong hierarchy.
- **Body:** Medium weight (500), high readability.
- **Labels:** Uppercase, bold (600), letter-spacing (0.05em).

## Component: Player Dashboard

### Layout
- **Structure:**
  - **Sidebar:** Fixed left navigation (250px).
  - **Main Content:** Flex container, sticky header.
- **Theme:** Dark mode by default.

### Sidebar Navigation
- **Style:** Clean, vertical list.
- **Colors:** Zinc 900 Background, Zinc 700 Border.
- **Interactions:** Hover highlights with Zinc 800 and Zinc 100 text.

### Auction Cards
- **Structure:**
  - Header: Title and Sport/Category.
  - Body: Grid of key information (Time, Venue, Creator).
  - Footer: Status badge.
- **Style:**
  - Background: Zinc 800.
  - Border: Zinc 700 (1px).
  - Accent: Amber 600 on hover/active.
  - Hover Effect: Slight lift, border color change to Amber.
- **Typography:**
  - Title: 18px, Bold.
  - Details: 14px, Medium.

## Component: Viewer Auction Page

### Layout
- **Structure:**
  - Full-screen layout with gradient background (Zinc 950 to Zinc 900).
  - Centered content with max-width constraint (1200px).
  - Vertical stacking: Header, Bid Display, Player Profile.
- **Theme:** Dark mode optimized for viewing.

### Header Section
- **Auction Title Badge:**
  - Background: Zinc 800, bordered container with rounded corners (12px).
  - Contains: Live indicator (pulsing red dot) + Auction name.
  - Typography: 28px, Bold, Uppercase, Letter-spaced.
  - Shadow: Elevated with subtle drop shadow.

### Current Bid Section
- **Style:**
  - Background: Linear gradient from Amber 700 to Amber 500.
  - Large, prominent display with shimmer animation overlay.
  - Border: 2px white with 10% opacity.
  - Shadow: Amber glow effect (0.3 opacity).
- **Typography:**
  - Label: 14px, Uppercase, Bold, White with 90% opacity.
  - Amount: 56px, Extra Bold, White, Text shadow for depth.
- **Animation:** Continuous shimmer effect for visual interest.

### Player Profile Section
- **Container:** Max-width 800px, centered, with card styling.
- **Card Design:**
  - Background: Zinc 800.
  - Border: Zinc 700 (1px solid).
  - Player image: Circular, 100px, bordered with Amber accent.
  - Stats layout: Horizontal grid with dividers.
- **Loading State:**
  - Skeleton animation with dashed border.
  - Text: Waiting message in secondary color.
  - Subtle pulsing background.

### Animations
- **Live Indicator:** Pulsing animation (2s infinite) with expanding shadow.
- **Shimmer Effect:** Diagonal gradient sweep on bid display (3s infinite).
- **Skeleton Loading:** Alternating background color (1s infinite).

## CSS Architecture
- **Methodology:** Component-scoped SCSS.
- **Variables:** Defined in SCSS for consistency (`$bg-dark`, `$accent-gold`, etc.).
- **Responsiveness:** Flex/Grid layouts adapting to screen size.
