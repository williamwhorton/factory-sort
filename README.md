# Factory Conveyor

A casual "Toy Factory Minimalist" sorting game built with Phaser 3 and TypeScript.

In this game, players manage a conveyor belt system in a minimalist toy factory, sorting colored geometric shapes into their corresponding color-coded bins.

## Features

- **Dynamic Conveyor System**: Modular belt paths that transport items across the factory floor.
- **Color-Based Sorting**: Sort items (Red, Blue, Green, Yellow) into matching destination bins.
- **Level Progression**: Increasing difficulty with faster conveyor speeds and multiple belts.
- **Time-Based Challenges**: Meet sorting targets within the time limit to progress.
- **Minimalist Aesthetic**: Inspired by the clean, high-contrast look of games like "Mini Metro".

## Tech Stack

- **Engine**: Phaser.js (Phaser 3)
- **Language**: TypeScript
- **Platform**: HTML5 Canvas
- **Build Tool**: Vite
- **Physics**: Matter.js (optional)
- **State Management**: Zustand or Redux (if needed)
- **Storage**: LocalStorage (for saves)
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier, Husky (pre-commit hooks)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run the development server with live reload:

```bash
pnpm dev
```

### Build

Create a production-ready build:

```bash
pnpm build
```

### Testing

Run unit tests:

```bash
pnpm test
```

Run tests with coverage reporting:

```bash
pnpm test:coverage
```

Run end-to-end tests:

```bash
pnpm test:e2e
```

Open Cypress Test Runner:

```bash
pnpm cypress:open
```

### Formatting and Linting

Check code formatting:

```bash
pnpm format
```

Fix formatting issues:

```bash
pnpm format:fix
```

Run linter:

```bash
pnpm lint
```

Fix linting issues:

```bash
pnpm lint:fix
```

## Project Structure

- `src/game/`: Core game logic, scenes, and objects.
- `public/`: Assets such as images and audio.
- `tests/`: Unit and E2E tests using Jest and Cypress.
- `vite/`: Vite configuration for development and production.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
