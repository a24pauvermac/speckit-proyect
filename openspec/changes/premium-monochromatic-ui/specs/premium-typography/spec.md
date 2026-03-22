## ADDED Requirements

### Requirement: Montserrat font family

The system SHALL use Montserrat as the primary and only font family for all text elements.

#### Scenario: Font loads correctly
- **WHEN** the application loads
- **THEN** Montserrat is loaded from Google Fonts
- **AND** all text elements use Montserrat as the font-family

#### Scenario: Font fallback
- **WHEN** Montserrat fails to load
- **THEN** the system falls back to system-ui, sans-serif

### Requirement: Typography weight hierarchy

The system SHALL use distinct font weights for different text hierarchy levels.

#### Scenario: Section headers use Bold weight
- **WHEN** section headers (h1, h2) are rendered
- **THEN** they use font-weight: 700 (Bold)
- **AND** font-size follows a clear scale

#### Scenario: Subtitles and descriptions use Light/Regular
- **WHEN** subtitle text is rendered
- **THEN** they use font-weight: 300-400 (Light/Regular)
- **AND** line-height is increased to 1.6-1.8 for readability

### Requirement: Text color based on background

The system SHALL ensure proper contrast by using white text on black backgrounds and black text on light backgrounds.

#### Scenario: Text on black cards
- **WHEN** text appears on a black (#000000) background
- **THEN** the text color is white (#FFFFFF)

#### Scenario: Text on white/gray cards
- **WHEN** text appears on white (#FFFFFF) or gray (#F4F4F4) background
- **THEN** the text color is black (#000000)
