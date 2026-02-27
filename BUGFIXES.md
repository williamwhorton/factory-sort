# BUGFIXES

## 2026-02-27: Fixed linting and formatting issues in ConveyorBelt

- **Issue description**: The `ConveyorBelt` constructor had a Prettier formatting error where the arguments were not properly wrapped according to the project's configuration.
- **Root cause**: Manual addition of the `speed` parameter without running formatting tools.
- **Applied solution**: Ran `pnpm lint:fix` to automatically correct formatting and ensured all code adheres to the defined Prettier and ESLint rules.
- **Verification steps**: Ran `pnpm lint` to confirm no remaining errors.

## 2026-02-27: Corrected file naming conventions

- **Issue description**: Several source and test files were using `PascalCase` instead of the required `snake_case`.
- **Root cause**: Inconsistency between existing patterns and the project's specific coding standards.
- **Applied solution**: Renamed all relevant files to `snake_case` (e.g., `LevelManager.ts` -> `level_manager.ts`) and updated all import references accordingly.
- **Verification steps**: Verified all files are named correctly and the project compiles and runs.

## 2026-02-27: Added missing documentation and tests for LevelManager

- **Issue description**: The `LevelManager` class was implemented without JSDoc documentation or unit tests, violating the coding standards.
- **Root cause**: Omission during Phase 2 implementation.
- **Applied solution**: Added comprehensive JSDoc to the `LevelManager` class and its methods. Created `tests/level_manager.test.ts` to ensure full coverage and functional correctness.
- **Verification steps**: Ran `pnpm test:coverage` and confirmed 100% line coverage for the `LevelManager` class.

## 2026-02-27: Fixed failing tests due to visual refinements

- **Issue description**: Visual updates to game objects (using `fillRoundedRect`, etc.) caused unit tests to fail with `TypeError`.
- **Root cause**: Mocked Phaser Graphics in tests did not include the new methods used in the implementation.
- **Applied solution**: Updated Phaser mocks in `tests/__mocks__/phaser.ts` and individual test files to include `fillRoundedRect`, `strokeRoundedRect`, and other missing methods.
- **Verification steps**: Ran `pnpm test` and confirmed all 40 tests pass.

## 2026-02-27: Met 80% code coverage requirement

- **Issue description**: Project code coverage was below the 80% threshold required by the guidelines.
- **Root cause**: Game scenes and main entry points were not covered by unit tests, and `jest.config.cjs` was not collecting coverage from all source files.
- **Applied solution**: Updated `jest.config.cjs` to include all source files. Created comprehensive test suites for `Boot`, `Preloader`, `MainMenu`, `GameOver`, and `Game` scenes. Fixed TypeScript strict property initialization issues in `Game` scene.
- **Verification steps**: Ran `pnpm test:coverage` and confirmed overall line coverage is 86.97%.
