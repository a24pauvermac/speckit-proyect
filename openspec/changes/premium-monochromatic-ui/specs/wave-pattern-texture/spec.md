## ADDED Requirements

### Requirement: SVG wave pattern for header background

The system SHALL render a subtle SVG pattern of concentric waves as header background texture.

#### Scenario: Header displays wave pattern
- **WHEN** the header section is rendered
- **THEN** a subtle SVG pattern of concentric waves in dark gray is displayed
- **AND** the pattern has low opacity to not distract from content

#### Scenario: Wave pattern on book cards
- **WHEN** book cards are rendered
- **THEN** they may include the same wave pattern texture
- **AND** pattern uses dark gray (#1a1a1a) at low opacity

### Requirement: Wave pattern implementation

The system SHALL use inline SVG for the wave pattern texture.

#### Scenario: SVG is scalable
- **WHEN** the pattern is rendered at different sizes
- **THEN** it remains crisp and clear

#### Scenario: Performance is acceptable
- **WHEN** the page loads
- **THEN** the SVG pattern does not significantly impact load time
- **AND** uses minimal file size
