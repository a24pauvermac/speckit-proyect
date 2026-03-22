## ADDED Requirements

### Requirement: Extreme border-radius on all containers

The system SHALL apply border-radius of 40px or higher to all container elements.

#### Scenario: Cards have extreme rounding
- **WHEN** a card component is rendered
- **THEN** border-radius is at least 40px

#### Scenario: Buttons have pill-like appearance
- **WHEN** button components are rendered
- **THEN** border-radius is at least 40px (pill shape)

#### Scenario: Input fields are pill-shaped
- **WHEN** input components are rendered
- **THEN** border-radius is at least 40px

### Requirement: Consistent border-radius variable

The system SHALL use a CSS variable for border-radius to ensure consistency.

#### Scenario: CSS variable defined
- **WHEN** styles are loaded
- **THEN** --radius-organic is defined with value 40px or higher
- **AND** all components reference this variable

### Requirement: Organic, soft appearance

The system SHALL create a soft, organic aesthetic through geometry.

#### Scenario: Rounded corners soften interface
- **WHEN** users view the interface
- **THEN** all corners appear smoothly rounded
- **AND** no sharp 90-degree corners are visible
