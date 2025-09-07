# Seftec Branding Implementation for Nexus Edge

This document outlines the implementation of Seftec branding within the Nexus Edge project.

## Logo

The Seftec Hub logo has been implemented as an SVG file and is used in the navigation bar and as the favicon. The logo features:

- A navy blue shield background (`#263E50`)
- A mustard yellow shield symbol (`#DAA520`)
- A white "S" letter centered in the shield

The logo files are located at:
- `public/seftec-logo.svg` - Main logo file
- `public/favicon.svg` - Favicon version

## Color Palette

The Seftec brand colors have been implemented using HSL values for consistency and flexibility:

- **Midnight Blue**: `hsl(230, 61%, 24%)` - #1F1F2E
- **Electric Purple**: `hsl(256, 68%, 60%)` - #7743EE
- **Mint Green**: `hsl(159, 65%, 75%)` - #A5F2D5
- **Gold Accent**: `hsl(45, 100%, 71%)` - #FFD369
- **Ice Grey**: `hsl(220, 9%, 95%)` - #F4F4FA

These colors are mapped to the following CSS variables in `src/index.css`:

```css
:root {
  /* Seftec Brand Colors */
  --seftec-midnight: 230 61% 24%;
  --seftec-purple: 256 68% 60%;
  --seftec-mint: 159 65% 75%;
  --seftec-gold: 45 100% 71%;
  --seftec-grey: 220 9% 95%;

  /* Brand color mappings */
  --sme-primary: var(--seftec-purple);
  --sme-primary-light: 256 68% 70%;
  --sme-primary-dark: 256 68% 50%;
  --sme-secondary: var(--seftec-mint);
  --sme-secondary-light: 159 65% 85%;
  --sme-accent: var(--seftec-gold);
  --sme-neutral-50: 220 9% 98%;
  --sme-neutral-100: 220 9% 95%;
  --sme-neutral-200: 220 9% 90%;
  --sme-neutral-300: 220 9% 82%;
  --sme-neutral-400: 220 9% 64%;
  --sme-neutral-500: 220 9% 46%;
  --sme-neutral-600: 220 9% 36%;
  --sme-neutral-700: 220 9% 26%;
  --sme-neutral-800: var(--seftec-midnight);
  --sme-neutral-900: 230 61% 14%;
}
```

## Typography

The Seftec brand uses the following font families:

- **Sans-serif**: Inter (body text)
- **Heading**: Poppins (headings)
- **Display**: Urbanist (display text)

These are configured in `tailwind.config.js`:

```js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Poppins', 'system-ui', 'sans-serif'],
  display: ['Urbanist', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
}
```

## UI Components

All UI components have been updated to use the Seftec color palette:

### SMEButton
- Primary: Electric Purple background with white text
- Secondary: Mint Green background with white text
- Accent: Gold background with dark text
- Outline: Purple border with hover effect
- Ghost: Transparent with purple text

### SMECard
- Default: White background with light border
- Elevated: White background with shadow
- Bordered: White background with purple accent border
- Product: White background with border for product listings

### SMEBadge
- Primary: Purple background with white text
- Secondary: Mint background with white text
- Accent: Gold background with dark text
- Success: Green background with dark text
- Warning: Yellow background with dark text
- Info: Blue background with dark text
- Price: Light gold background with dark text

### SMEInput
- Standard form inputs with Seftec styling
- Search input with integrated search icon

## Navigation

The SMENavbar component implements the Seftec branding with:
- Gradient logo using Electric Purple to Mint Green
- Navigation links with hover effects using brand colors
- Integrated cart and comparison functionality with badge indicators

## Dark Mode

Dark mode has been implemented using the Midnight Blue as the primary background color with Ice Grey for text elements.

## Implementation Notes

1. All components use the `sme-` prefix to distinguish them from base shadcn/ui components
2. Color variables use the `seftec-` prefix for brand colors and `sme-` prefix for component-specific colors
3. Typography classes use the `font-` prefix with appropriate suffixes (heading, body, display)
4. Consistent spacing and border radius values are defined in the Tailwind config
5. Animation utilities have been added for fade-in and slide-up effects

## Testing

The application has been built successfully with `npm run build` and linted with `npm run lint`. Minor linting issues exist in files outside the scope of this branding implementation.