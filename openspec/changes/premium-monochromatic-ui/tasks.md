## 1. CSS Variables and Typography Setup

- [x] 1.1 Import Montserrat font from Google Fonts in nuxt.config.js
- [x] 1.2 Define monochromatic color variables (--color-black: #000000, --color-white: #FFFFFF, --color-gray: #F4F4F4)
- [x] 1.3 Define organic border-radius variable (--radius-organic: 40px or higher)
- [x] 1.4 Define transition timing function (--transition-smooth: cubic-bezier(0.22, 1, 0.36, 1))
- [x] 1.5 Update font-family to Montserrat with fallback
- [x] 1.6 Set typography hierarchy: Bold for h1/h2, Light/Regular for body

## 2. Global Styles Update

- [x] 2.1 Update .card component with --radius-organic
- [x] 2.2 Update .btn component with --radius-organic and 600ms transition
- [x] 2.3 Update .input component with --radius-organic
- [x] 2.4 Update all transitions to use --transition-smooth at 600ms
- [x] 2.5 Remove any emoji characters from CSS content properties

## 3. Wave Pattern SVG Component

- [x] 3.1 Create SVG pattern for concentric wave texture
- [x] 3.2 Create WavePattern.vue component for reusable background
- [x] 3.3 Apply wave pattern to header section
- [x] 3.4 Apply wave pattern to book cards (optional)

## 4. Header Component Update

- [x] 4.1 Update header with black background (#000000)
- [x] 4.2 Add very rounded bottom corners (border-radius on bottom)
- [x] 4.3 Integrate wave pattern texture at low opacity
- [x] 4.4 Update header text to white (#FFFFFF)
- [x] 4.5 Remove any FontAwesome icons from header (use text only)

## 5. Bottom Navigation Redesign

- [x] 5.1 Update BottomNavigation.vue with pill shape (border-radius: 40px)
- [x] 5.2 Change background to white with diffused shadow
- [x] 5.3 Remove text labels from navigation items
- [x] 5.4 Use line-style minimalist icons (no solid fills)
- [x] 5.5 Style active icon with black circle background
- [x] 5.6 Ensure all icons use justify-content: center and align-items: center

## 6. Home Page Update

- [x] 6.1 Update quick action cards with new color scheme
- [x] 6.2 Apply --radius-organic to action cards
- [x] 6.3 Update action card icons to be centered with Flexbox
- [x] 6.4 Apply wave pattern texture to hero section
- [x] 6.5 Update stats section with new styling

## 7. Practice Page Updates

- [x] 7.1 Update book cards with black background and wave pattern
- [x] 7.2 Add circular play button in bottom-right corner of book cards
- [x] 7.3 Style play button with white icon on black circle
- [x] 7.4 Update search input with pill shape styling
- [x] 7.5 Apply centered Flexbox for all icons

## 8. Other Pages Cleanup

- [x] 8.1 Update metronome page with new styling
- [x] 8.2 Update games pages with new styling
- [x] 8.3 Update progress page with new styling
- [x] 8.4 Update chat page with new styling
- [x] 8.5 Update settings page with new styling
- [x] 8.6 Remove any emoji references throughout the codebase

## 9. Final Verification

- [x] 9.1 Verify no emojis exist in any file
- [x] 9.2 Verify all border-radius values are 40px or higher
- [x] 9.3 Verify all transitions use 600ms and cubic-bezier
- [x] 9.4 Verify all icons are centered with Flexbox
- [x] 9.5 Run build to ensure no errors
