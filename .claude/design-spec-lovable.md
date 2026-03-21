# ShifuHealth Lovable Design Specification

> Extracted from https://pretty-health-makeover.lovable.app/

---

## 1. FONTS

### Font Families
- **Headings (serif):** `"Noto Serif", Georgia, serif`
- **Body (sans-serif):** `"DM Sans", system-ui, sans-serif`

### Typography Scale

| Element | Font | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing | Color |
|---------|------|---------------|---------------|--------|-------------|----------------|-------|
| **H1 (hero)** | Noto Serif | 3.4rem (54.4px) | 2.25rem (text-4xl) | 600 (semibold) | 1.1 | -1.36px (tracking-tight) | `rgb(34, 31, 27)` |
| **H2 (section)** | Noto Serif | 2.25rem (36px) | 1.875rem (text-3xl) | 600 (semibold) | 40px | normal | `rgb(34, 31, 27)` |
| **H2 (newsletter)** | Noto Serif | 1.875rem (30px) | 1.5rem (text-2xl) | 600 (semibold) | 36px | normal | `rgb(34, 31, 27)` |
| **H3 (card title)** | Noto Serif | 1.25rem (20px) | 1.25rem (20px) | 600 (semibold) | 28px | normal | `rgb(34, 31, 27)` |
| **Body (hero desc)** | DM Sans | 18px (text-lg) | 18px | 400 | 1.625 (29.25px) | normal | `rgb(96, 89, 82)` |
| **Body (section subtitle)** | DM Sans | 16px | 16px | 400 | 24px | normal | `rgb(96, 89, 82)` |
| **Body (card text)** | DM Sans | 16px | 16px | 400 | 24px | normal | `rgb(42, 38, 34)` |
| **Blog excerpt** | DM Sans | 14px (text-sm) | 14px | 400 | 22.75px | normal | `rgb(96, 89, 82)` |
| **Nav links** | DM Sans | 14px | hidden (hamburger) | 400 | 20px | normal | `rgb(138, 128, 117)` |
| **Logo** | Noto Serif | 20px | 18px (footer) | 600 (semibold) | -- | -0.5px | `rgb(42, 38, 34)` |
| **Badges (category)** | DM Sans | 12px | 12px | 600 | -- | normal | `rgb(59, 104, 83)` |
| **Reading time** | DM Sans | 12px | 12px | 400 | -- | normal | `rgb(138, 128, 117)` |
| **Check items (hero)** | DM Sans | 14px | 14px | 500 | -- | normal | `rgb(59, 104, 83)` |
| **"Weiterlesen" link** | DM Sans | 14px | 14px | 500 | -- | normal | `rgb(59, 104, 83)` |
| **Footer copyright** | DM Sans | 12px | 12px | 400 | -- | normal | `rgb(138, 128, 117)` |
| **Footer links** | DM Sans | 14px | 14px | 400 | -- | normal | `rgb(138, 128, 117)` |

### Tailwind Class Patterns
- H1: `text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-tight text-balance`
- H2: `text-3xl md:text-4xl font-semibold`
- H3: `font-serif text-xl font-semibold`
- Body large: `text-lg leading-relaxed`
- Body: `text-base leading-relaxed` or `text-sm leading-relaxed`

---

## 2. COLOR PALETTE

### CSS Custom Properties (HSL values)
```
--background:          35 33% 96%     /* Page background */
--foreground:          30 10% 15%     /* Main text */
--card:                35 30% 98%     /* Card background */
--card-foreground:     30 10% 15%     /* Card text */
--primary:             152 28% 32%    /* Green primary (sage) */
--primary-foreground:  40 30% 96%     /* Text on primary */
--secondary:           30 25% 90%     /* Warm secondary */
--secondary-foreground:30 10% 20%     /* Text on secondary */
--muted:               30 15% 92%     /* Muted backgrounds */
--muted-foreground:    30 8% 50%      /* Muted text */
--accent:              24 60% 52%     /* Terracotta accent */
--accent-foreground:   40 30% 96%     /* Text on accent */
--border:              30 18% 86%     /* Border color */
--ring:                152 28% 32%    /* Focus ring */
--radius:              .625rem        /* 10px base radius */
```

### Computed RGB Values

| Role | RGB | Hex (approx) | Usage |
|------|-----|------|-------|
| **Page background** | `rgb(248, 245, 241)` | `#F8F5F1` | Main body background |
| **Surface warm** | `rgb(244, 240, 235)` | `#F4F0EB` | Alternating section backgrounds |
| **Card background** | `rgb(251, 250, 248)` | `#FBFAF8` | Cards, newsletter box |
| **Primary green** | `rgb(59, 104, 83)` | `#3B6853` | CTA buttons, badges, links, icons |
| **Primary green 10%** | `rgba(59, 104, 83, 0.1)` | -- | Icon backgrounds, badge backgrounds |
| **Primary green 15%** | `rgba(59, 104, 83, 0.15)` | -- | Hover states |
| **Primary foreground** | `rgb(248, 246, 242)` | `#F8F6F2` | Text on green buttons |
| **Foreground (dark)** | `rgb(42, 38, 34)` | `#2A2622` | Primary body text, logo |
| **Heading text** | `rgb(34, 31, 27)` | `#221F1B` | H1, H2, H3, card titles |
| **Secondary text** | `rgb(96, 89, 82)` | `#605952` | Descriptions, subtitles |
| **Muted text** | `rgb(138, 128, 117)` | `#8A8075` | Reading time, footer links, chips |
| **Button text (secondary)** | `rgb(56, 51, 46)` | `#38332E` | Outline button text |
| **Border** | `rgb(226, 219, 213)` | `#E2DBD5` | Card borders, input borders, dividers |
| **Border light** | `rgba(226, 219, 213, 0.5)` | -- | Nav bottom border, footer top border |
| **Border lighter** | `rgba(226, 219, 213, 0.4)` | -- | Newsletter card border |
| **Chat bubble bg** | `rgba(236, 230, 223, 0.6)` | -- | Chat message background |
| **Five Elements colors** | | | Holz=green, Feuer=`rgb(212, 74, 53)`, Erde=`rgb(200, 151, 65)`, Metall=`rgb(126, 136, 154)`, Wasser=`rgb(56, 102, 148)` |

---

## 3. LAYOUT & SPACING

### Container
- **Max width:** `max-w-6xl` = `1152px`
- **Horizontal padding:** `px-6` (24px)
- **Centered:** `mx-auto`

### Section Spacing
- **Hero:** `pt-28 pb-20 md:pt-36 md:pb-28` (top: 112px mobile / 144px desktop; bottom: 80px / 112px)
- **Standard sections:** `py-24` = 96px top and bottom
- **Alternating backgrounds:** Every other section uses `surface-warm` (`rgb(244, 240, 235)`)

### Grid Layouts
- **Hero:** `grid md:grid-cols-2 gap-12 md:gap-16 items-center` (stacks on mobile)
- **TCM Principles cards:** `grid md:grid-cols-3 gap-8` (3-col desktop, 1-col mobile)
- **Shifu Qi section:** `grid md:grid-cols-2 gap-16 items-center` (stacks on mobile)
- **Blog cards:** `grid md:grid-cols-3 gap-8` (3-col desktop, 1-col mobile)
- **Five Elements detail grid:** `grid grid-cols-2 md:grid-cols-4 gap-4` (2-col mobile, 4-col desktop)

---

## 4. NAVIGATION

### Header/Nav
- **Position:** `fixed` (sticky top)
- **Height:** 64px (`h-16`)
- **Background:** `rgba(248, 245, 241, 0.8)` (80% opacity)
- **Backdrop filter:** `blur(12px)` (glassmorphism effect)
- **Border bottom:** `1px solid rgba(226, 219, 213, 0.5)`
- **Layout:** Flex, space-between, items-center

### Logo
- Font: Noto Serif, 20px, semibold
- Color: `rgb(42, 38, 34)`
- Letter-spacing: -0.5px

### Nav Links (desktop)
- Font: DM Sans, 14px, weight 400
- Color: `rgb(138, 128, 117)` (muted)
- Hidden on mobile (`md:hidden` hamburger shown instead)

### Nav CTA Button
- Background: `rgb(59, 104, 83)` (primary green)
- Text: `rgb(248, 246, 242)`, 14px, weight 500
- Padding: `8px 20px`
- Border-radius: `10px`
- No shadow

### Mobile Navigation
- Hamburger button: visible below `md` breakpoint
- Class: `md:hidden text-foreground active:scale-95 transition-transform`

---

## 5. BUTTONS

### Primary Button (Green CTA)
- **Background:** `rgb(59, 104, 83)`
- **Text:** `rgb(248, 246, 242)`, DM Sans, 16px, weight 500
- **Padding:** `12px 28px`
- **Border-radius:** `10px` (0.625rem)
- **Box-shadow:** `rgba(59, 104, 83, 0.2) 0px 4px 6px -1px, rgba(59, 104, 83, 0.2) 0px 2px 4px -2px` (green-tinted shadow)
- **Transition:** `color 0.2s, background-color 0.2s, border-color 0.2s` (ease-in-out)
- **Tailwind:** `bg-primary text-primary-foreground font-medium rounded-lg shadow-primary/20`

### Secondary Button (Outline)
- **Background:** transparent
- **Border:** `1px solid rgb(226, 219, 213)`
- **Text:** `rgb(56, 51, 46)`, DM Sans, 16px, weight 500
- **Padding:** `12px 28px` (same as primary)
- **Border-radius:** `10px`
- **No shadow**

### "Alle Artikel" Button (outline, centered)
- Same as secondary button style
- Padding: `12px 24px`

### Newsletter "Anmelden" Button
- Same as primary green but padding: `12px 24px`
- Font-size: 14px

---

## 6. CARDS

### TCM Principle Cards (3-column)
- **Background:** `rgb(251, 250, 248)` (card)
- **Border-radius:** `16px` (rounded-2xl)
- **Padding:** `32px` (p-8)
- **Box-shadow:** `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` (shadow-sm)
- **Hover:** `hover:shadow-md` with `transition-shadow duration-300`
- **No border**
- **Icon:** 48x48px, `rgba(59, 104, 83, 0.1)` bg, `border-radius: 12px`
- **Quote text:** italic, DM Sans

### Blog Article Cards
- **Background:** `rgb(251, 250, 248)` (card)
- **Border-radius:** `16px` (rounded-2xl)
- **Overflow:** hidden (for image)
- **Box-shadow:** `shadow-sm` default, `hover:shadow-lg` on hover
- **Image:** `h-52`, `object-cover`, `border-radius: 16px` (top), hover: `scale-[1.03]` with `transition-transform duration-500`
- **Body padding:** inside div below image
- **Category badge:** see Badges section
- **Image aspect ratio:** ~5:3 (1.67)

### Chat Mockup Card (Shifu Qi section)
- **Background:** `rgb(251, 250, 248)` (card)
- **Border-radius:** `16px` (rounded-2xl)
- **Border:** `1px solid rgba(226, 219, 213, 0.6)`
- **Box-shadow:** `shadow-lg`
- **Overflow:** hidden
- **Chat bubble:** `rgba(236, 230, 223, 0.6)`, `border-radius: 8px 16px 16px` (asymmetric), padding: `12px 16px`

### Five Elements Detail Card
- **Background:** card
- **Border-radius:** `16px`
- **Padding:** `32px` mobile / `48px` desktop (`p-8 md:p-12`)
- **Border:** `1px solid rgba(226, 219, 213, 0.4)`
- **Shadow:** shadow-sm
- **Max-width:** `max-w-2xl`, centered

### Newsletter Card
- **Background:** `rgb(251, 250, 248)` (card)
- **Border-radius:** `16px`
- **Padding:** `64px` (`p-10 md:p-16`)
- **Border:** `1px solid rgba(226, 219, 213, 0.4)`
- **Shadow:** shadow-sm
- **Max-width:** `max-w-2xl`, centered

### Hero Image Overlay Badge
- **Background:** `rgb(251, 250, 248)` (card)
- **Border-radius:** `12px`
- **Padding:** `16px 20px`
- **Box-shadow:** `shadow-lg` (0px 10px 15px -3px rgba(0,0,0,0.1))
- **Position:** `absolute -bottom-4 -left-4`
- **Border:** `1px solid rgba(226, 219, 213, 0.5)`

---

## 7. BADGES & CHIPS

### Category Badges (on blog cards)
- **Background:** `rgba(59, 104, 83, 0.1)` (primary/10)
- **Text:** `rgb(59, 104, 83)`, 12px, weight 600
- **Padding:** `4px 10px`
- **Border-radius:** `8px`
- **No border**

### Symptom Chips (chat mockup)
- **Background:** transparent
- **Border:** `1px solid rgb(226, 219, 213)`
- **Text:** `rgb(138, 128, 117)`, 12px, weight 500
- **Padding:** `6px 12px`
- **Border-radius:** `9999px` (fully rounded pill)

---

## 8. FORM INPUTS

### Email Input (newsletter)
- **Background:** `rgb(248, 245, 241)` (page background color)
- **Border:** `1px solid rgb(226, 219, 213)`
- **Border-radius:** `10px`
- **Padding:** `12px 16px`
- **Font:** DM Sans, 14px
- **Color:** `rgb(42, 38, 34)`
- **Placeholder color:** muted-foreground

---

## 9. DECORATIVE ELEMENTS

### Accent Line (above H1)
- **Color:** `rgb(59, 104, 83)` (primary)
- **Size:** 48px wide, 4px tall
- **Border-radius:** `9999px` (fully rounded)
- **Class:** `w-12 h-1 bg-primary rounded-full mb-8`

### Icon Containers (feature sections)
- **Size:** 48x48px
- **Background:** `rgba(59, 104, 83, 0.1)` (primary/10)
- **Border-radius:** `12px` (rounded-xl)
- **Icon color:** primary green
- **Class:** `w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`

### Five Elements Tab Icons
- **Active tab:** card bg, `border: 1px solid rgba(226, 219, 213, 0.6)`, `border-radius: 12px`, `shadow-md`
- **Inactive tab:** transparent bg, no border, `border-radius: 12px`
- **Padding:** `12px 16px`
- **Chinese characters:** colored per element (green/red/gold/grey/blue)

---

## 10. ANIMATIONS & TRANSITIONS

### Scroll Animations
- Content fades/slides in on scroll (intersection observer based)
- Sections start with `opacity: 0` and `translateY`, animate to visible on viewport entry

### Hover Effects
- **Cards:** `hover:shadow-md` or `hover:shadow-lg`, `transition-shadow duration-300`
- **Blog card images:** `hover:scale-[1.03]`, `transition-transform duration-500`
- **Buttons:** `transition: color 0.2s, background-color 0.2s, border-color 0.2s` (ease-in-out)
- **Five Elements tabs:** `active:scale-95`, `transition-all duration-300`

### Keyframe Animations Available
- `float` (likely for decorative elements)
- `pulse` (likely for status indicators)
- `enter` / `exit` (scroll-triggered animations)
- `accordion-up` / `accordion-down` (for expandable content)

---

## 11. FOOTER

- **Background:** transparent (inherits page background)
- **Border-top:** `1px solid rgba(226, 219, 213, 0.5)`
- **Padding:** `48px 0px`
- **Layout:** Flex, space-between, items-center (single row)
- **Logo:** Noto Serif, 18px, semibold, `rgb(42, 38, 34)`
- **Links:** DM Sans, 14px, weight 400, `rgb(138, 128, 117)`
- **Copyright:** DM Sans, 12px, `rgb(138, 128, 117)`
- **Links present:** Uber TCM, Shifu Qi, Blog

---

## 12. RESPONSIVE BEHAVIOR (Mobile)

### Navigation
- Nav links hidden below `md` (768px)
- Hamburger menu button shown
- CTA button likely hidden or in hamburger menu

### Hero
- Grid stacks to single column
- H1 shrinks: `text-4xl` (36px) on mobile
- Image goes below text
- Padding reduces: `pt-28 pb-20` (from `pt-36 pb-28`)

### Cards
- All 3-column grids become single column on mobile
- Card padding remains same
- Blog card image height remains `h-52`

### Five Elements
- Detail grid: 2 columns on mobile (from 4 on desktop)
- Card padding: `p-8` on mobile (from `p-12` on desktop)

### Newsletter
- Card padding: `p-10` on mobile (from `p-16` on desktop)
- Email + button form: stacks vertically on mobile (`flex-col sm:flex-row`)

### General
- Horizontal padding: `px-6` (24px) on all breakpoints
- Section vertical padding: `py-24` (96px) consistent

---

## 13. PAGE SECTIONS (top to bottom)

1. **Header/Nav** - fixed, glassmorphism, logo + links + CTA
2. **Hero** - 2-col grid, heading + description + checkmarks + CTAs | image with overlay badge
3. **TCM Principles** ("Was ist TCM?") - warm bg, 3 cards with icons, titles, descriptions, quotes
4. **Shifu Qi Preview** ("Dein personlicher TCM-Experte") - 2-col, text + features | chat mockup card
5. **Blog** ("Wissen aus der TCM") - warm bg, 3 article cards + "Alle Artikel" button
6. **Five Elements** ("Die Funf Elemente") - tab selector + detail card
7. **Newsletter** ("TCM-Wissen direkt") - warm bg, centered card with email input
8. **Footer** - simple, single row, logo + links + copyright
