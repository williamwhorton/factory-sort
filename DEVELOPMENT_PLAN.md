# DEVELOPMENT_PLAN: Color Conveyor Game (Sorting Edition)

### Goal: Create a casual "Toy Factory Minimalist" sorting game playable on web and mobile.

---

### Phase 1: Foundation & Core Mechanics [COMPLETED]

- [x] **TypeScript Migration**: Convert existing `.js` scenes in `src/game/scenes/` to `.ts` for strict type safety.
- [x] **Conveyor System**: Modular belt paths for items to follow.
- [x] **Item Spawning**: Generate colored geometric shapes (Red, Blue, Green, Yellow) that move along the belts.
- [x] **Sorting Interaction**: Single tap/click to move an item from the belt into a bin.
- [x] **Destination Bins**: Color-coded bins that receive and validate sorted items.

### Phase 2: Progression & Level Design [COMPLETED]

- [x] **Time-Based Levels**: Implement a timer for each level. Players must sort a target number of items within the time limit.
- [x] **Level Manager**: Handles increasing conveyor speed and adding multiple belts across levels.
- [x] **Success/Failure States**: Transitions for level completion or failing to meet the goal/running out of time.

### Phase 3: "Toy Factory Minimalist" Art & Polish

- [ ] **Visual Theme**: "Mini Metro" inspired aesthetic with soft-edged, high-contrast geometric shapes and vibrant colors.
- [ ] **Animations**: Smooth, tactile movement for items being sorted and belt motion.
- [ ] **Audio**: Pop/plink sounds for sorting actions.

### Phase 4: Web & Mobile Optimization

- [ ] **Responsive Scaling**: Unified experience across screen sizes (Desktop and Mobile).
- [ ] **Input Unification**: Mouse and Touch parity.
- [ ] **Deployment Prep**: Optimization for web performance and Capacitor-readiness.

---

### Progress Tracking

- **Phase 1**: 100%
- **Phase 2**: 100%
- **Phase 3**: 0%
- **Phase 4**: 0%

---

### Latest Updates

- 2026-02-27: Development plan created based on user feedback.
- 2026-02-27: Implemented modular conveyor belt system and item spawning logic.
- 2026-02-27: Configured ESLint, Prettier, and Husky for automated pre-commit quality checks.
- 2026-02-27: Set up Jest testing environment and achieved 100% unit test coverage for core game objects.
- 2026-02-27: Implemented LevelManager, time-based level progression, and success/failure states.
