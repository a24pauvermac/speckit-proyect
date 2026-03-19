# Profe Piano Constitution

## Core Principles

### I. Code Quality Standards
Code MUST be clean, maintainable, and follow established best practices. All code MUST pass linting and formatting checks before merge. Functions MUST be small and do one thing (single responsibility). Variables and functions MUST have clear, descriptive names. Code duplication MUST be refactored into shared utilities. Complex logic MUST include comments explaining the "why" not the "what". Technical debt MUST be tracked and addressed proactively.

### II. Testing Standards
All features MUST have tests written before implementation (Test-Driven Development). Unit tests MUST achieve at least 80% code coverage. Integration tests MUST verify component interactions. Tests MUST be independent and able to run in any order. Flaky tests MUST be fixed immediately or marked as skipped with justification. Test names MUST describe the behavior being verified (given-when-then format). Every bug fix MUST include a regression test.

### III. User Experience Consistency
All user-facing interfaces MUST follow consistent design patterns. UI components MUST use the same styling system across the application. Error messages MUST be user-friendly and actionable. Loading states and feedback MUST be consistent throughout. Navigation patterns MUST be predictable across all screens. Accessibility standards (WCAG 2.1 AA) MUST be met for all user interfaces.

### IV. Performance Requirements
Database queries MUST be optimized with proper indexing and avoid N+1 patterns. API responses MUST be paginated when returning collections. Heavy computations MUST be done asynchronously where appropriate. Frontend MUST implement lazy loading for large assets. Build outputs MUST be optimized (minification, tree-shaking). Performance budgets MUST be defined and monitored (e.g., bundle size < 200KB, FCP < 1.5s).

### V. Observability & Debugging
All services MUST emit structured logs with consistent format. Error tracking MUST capture stack traces and context. Metrics MUST be collected for key business operations. Distributed tracing MUST be implemented for multi-service flows.

## Quality Standards

All code reviews MUST verify compliance with these principles. Code MUST be self-documenting with clear naming and structure. Dependencies MUST be kept up to date with security patches. Secrets and credentials MUST never be committed to version control. Environment configuration MUST be externalized (no hardcoded values).

## Development Workflow

All changes MUST go through version control (feature branches, pull requests). All PRs MUST be reviewed by at least one other contributor. CI/CD pipelines MUST run all tests and quality checks. Deployment to production MUST require passing all quality gates. Hotfixes to production MUST follow the same review process when possible.

## Governance

This constitution supersedes all other development practices. Amendments require documentation of the change, rationale, and migration plan if needed. All team members are responsible for enforcing these principles. Use the project specification and task templates for implementation guidance.

**Version**: 1.0.0 | **Ratified**: 2026-03-11 | **Last Amended**: 2026-03-11
