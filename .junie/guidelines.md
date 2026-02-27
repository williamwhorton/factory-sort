### Tech Stack Overview

- **Engine**: Phaser.js (Phaser 3)
- **Language**: TypeScript
- **Platform**: HTML5 Canvas (Mobile packaging via Capacitor or Cordova)
- **State Management**: Zustand or Redux (if needed)
- **Physics**: Matter.js (optional)
- **Build Tool**: Vite
- **Storage**: LocalStorage (for saves)
- **Package Manager**: pnpm
- **Code Quality**: ESLint for linting and Prettier for formatting

### Coding Standards

- **TypeScript**:
  - Ensure strict type safety; avoid using `any`.
  - Define clear interfaces for database entities (e.g., `Message`, `Channel`, `Profile`).
  - Use Zod schemas for both client-side and server-side validation.
- **Error Handling**:
  - Return consistent JSON error responses from API routes (e.g., `{ error: 'Message' }`).
  - Log errors to the console or an error-tracking service in production.
  - Provide user-friendly feedback via `sonner` toasts or error states in the UI.
- **Pragmatic Design**: Choose the simplest architecture that solves the problem while allowing for future growth. Prioritize long-term maintainability over clever abstractions.
- **SOLID Principles**:
  - Apply SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to create flexible and testable code, but avoid over-engineering where a simpler structure suffices.
- **DRY vs. WET**:
  - Strictly follow DRY (Don't Repeat Yourself) for core business logic and critical configurations. However, balance this against the "Rule of Three" and prioritize readability; sometimes a little repetition (WET - Write Everything Twice) is better than a premature or leaky abstraction.
- **Documentation**:
  - Write clear and concise comments for non-obvious code.
  - Use JSDoc for function and class documentation.
  - Document complex or reusable components.
  - Use Markdown for documentation in README files.
- **Naming Conventions**:
  - Use descriptive variable and function names.
  - Use `snake_case` for file and directory names.
  - Use `PascalCase` for component and class names.
  - Use `camelCase` for function and variable names.
  - Use `kebab-case` for CSS class names.
  - Use `kebab-case` for API routes.
  - Use `kebab-case` for environment variables.
  - Use `kebab-case` for environment variables.
  - Use `kebab-case` for CSS class names.
- **Testing**:
  - Write unit tests for all functions and components.
  - Follow the TDD (Test-Driven Development) approach for writing tests.
  - Write integration tests for API routes and server-side operations.
  - Test edge cases and error handling thoroughly.
  - Use code coverage tools to ensure comprehensive test coverage.

### Database & Supabase

- **Schema Management**:
  - All database changes should be defined in SQL scripts under the `scripts/` directory.
  - Follow the naming convention `###_description.sql` (e.g., `001_create_schema.sql`).
- **Security (RLS)**:
  - Row Level Security (RLS) MUST be enabled for all public tables.
  - Define granular policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE` operations based on `auth.uid()`.
- **Server-Side Operations**:
  - Use Supabase SSR for authentication and database access in API routes and Server Components.
  - Sensitive operations (e.g., creating invitations, account deletion) should be handled via API routes.

### Testing Requirements

- **Unit & Integration Tests**:
  - Use Jest and React Testing Library (when using React) for component and logic testing.
  - Use Supabase's built-in testing utilities for database interactions when working with Supabase.
  - **Coverage Threshold**: A minimum of **80% line coverage** is required for all PRs.
- **E2E Testing**:
  - Use Cypress for critical user flows (e.g., login, channel creation, messaging).
- **Execution**:
  - Run unit tests: `pnpm test`
  - Run tests with coverage: `pnpm test:coverage`
  - Run E2E tests: `pnpm test:e2e`

### Git & Workflow

- **Bug Documentation**:
  - All bug fixes must be summarized in `BUGFIXES.md` at the project root.
  - Each entry should include: date, issue description, root cause, applied solution, and verification steps.
  - Whenever a bug is detected, consult `BUGFIXES.md` to check if it is a regression or if there was a related issue in the past.
- **Pre-commit Hooks**:
  - Husky is configured to run formatting (Prettier) and linting (ESLint) before every commit.
  - Commits will fail if formatting is incorrect or linting errors exist.
  - Uses `lint-staged` to only run checks on staged files.
- **Formatting**:
  - Maintain consistent code style using Prettier.
  - Run `pnpm format:fix` to automatically resolve formatting issues.
- **Linting**:
  - Follow ESLint recommendations using modern Flat Config (`eslint.config.js`).
  - Run `pnpm lint` to check for issues and `pnpm lint:fix` for automatic fixes.
- **Testing**:
  - Ensure all tests pass before submitting a PR.
  - Run `pnpm test` to run all tests.
  - Run `pnpm test:coverage` to check test coverage.
- **Versioning**:
  - Use semantic versioning (e.g., `major.minor.patch`).
  - Bump version numbers according to changes.
  - Use `pnpm version` to manage versions.
- **Trunk-Based Development**:
  - Follow the trunk-based development strategy.
  - Use short-lived feature branches when necessary, but aim to merge into `main` frequently.
  - Commit code whenever a logical unit of work is completed (e.g., after a new test passes or a small refactoring).
- **Branching**:
  - Use feature branches for new features if they are complex; otherwise, work on `main`.
  - Use `main` for production-ready code.
  - Use `develop` for development (optional in trunk-based).
  - Use `hotfix` for hotfixes.
  - Use `release` for releases.
  - Use `renovate` for automatic dependency updates.
- **Pull Requests**:
  - Ensure all tests pass and code is formatted before submitting a PR.
  - Use descriptive commit messages and follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
  - Use `renovate` to automatically update dependencies.
  - Use `squash` and `rebase` to maintain a clean commit history.

### UI & Styling

- **Tailwind CSS**:
  - Use utility classes for styling.
  - Follow the established design system and use variables from `globals.css`.
- **Components**:
  - Leverage shadcn/ui components for consistency.
  - Components are located in `components/ui/` (primitives) and `components/` (feature-specific).
- **Responsive Design**:
  - Ensure all features are mobile-friendly using Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`).

### Skills

- When necessary, access the skills in the `.junie/skills/` directory.
