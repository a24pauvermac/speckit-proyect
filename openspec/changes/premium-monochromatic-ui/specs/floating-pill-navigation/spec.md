## ADDED Requirements

### Requirement: Floating pill-shaped navigation bar

The system SHALL display a navigation bar with pill shape (full border-radius) floating at the bottom of the screen.

#### Scenario: Navigation is pill-shaped
- **WHEN** the navigation bar is rendered
- **THEN** it has border-radius of 40px or higher on all corners
- **AND** appears floating with a diffused shadow

#### Scenario: Navigation has white background
- **WHEN** the navigation bar is rendered
- **THEN** the background is white (#FFFFFF)
- **AND** it has a diffused box-shadow

### Requirement: Line-style icons without text labels

The system SHALL display only minimalist line-style icons in the navigation without text labels.

#### Scenario: Icons are line-style
- **WHEN** navigation icons are rendered
- **THEN** they use thin stroke icons (line style)
- **AND** no text labels are displayed

#### Scenario: Active icon is in black circle
- **WHEN** a navigation item is active
- **THEN** the icon is inside a black (#000000) circle
- **AND** other icons remain as gray line icons

### Requirement: Flexbox centering for all icons

The system SHALL center all navigation icons using Flexbox.

#### Scenario: Icon centering
- **WHEN** navigation icons are rendered
- **THEN** they use justify-content: center and align-items: center
- **AND** icons are not truncated or misaligned

### Requirement: Minimum touch targets

The system SHALL maintain adequate touch target sizes for accessibility.

#### Scenario: Touch targets are accessible
- **WHEN** users tap navigation items on mobile
- **THEN** each item has a minimum touch target of 44x44 pixels
