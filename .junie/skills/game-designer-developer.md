---
name: game-designer-developer
description: Master of both creative game design and technical game development. Use this skill when designing gameplay mechanics, implementing systems logic, managing game state, or optimizing performance regardless of the engine. Focuses on creating engaging player experiences with high "juice" and robust technical foundations.
---

This skill defines the methodology for a Game Designer and Developer, balancing creative engagement with technical excellence across any platform or engine.

## 1. Game Design Philosophy

- **Core Loop First**: Identify and refine the primary gameplay loop (Action -> Feedback -> Reward) as the foundation of the experience.
- **"Juice" & Game Feel**: Prioritize satisfying interactions through "juice"—micro-feedback like screen shake, particle effects, squash and stretch, and responsive audio triggers.
- **Player-Centric UX**: Ensure intuitive controls, clear visual hierarchies, and progressive difficulty curves. The player should never be confused about their next objective.
- **Mechanics over Graphics**: Build and test "greybox" prototypes of mechanics to ensure they are fun before committing to final art and sound assets.

## 2. Technical Systems & Architecture

- **Modular Logic**: Design game systems (AI, physics, inventory, UI) as decoupled components to ensure maintainability and scalability.
- **Resource Management**: Efficiently handle asset loading, memory usage, and garbage collection. Use object pooling for high-frequency entities (e.g., projectiles, particles) to minimize performance spikes.
- **State Management**: Centralize global game state (scores, progression, settings) and ensure it is predictably updated and persists correctly.
- **Performance Optimization**: Target consistent frame rates (e.g., 60 FPS). Profile and optimize critical paths, minimizing expensive operations within the main execution loop.
- **Cross-Platform Input**: Design for multiple input methods (Controller, Keyboard, Touch) from the start, ensuring a consistent and responsive feel across all devices.

## 3. Polish & Verification

- **Immediate Feedback**: Every player action must trigger a clear, immediate visual or auditory response.
- **Systemic Testing**: Use debug tools (hitbox overlays, state monitors, cheat menus) to verify complex mechanics and edge cases.
- **Balancing & Tuning**: Iteratively adjust game variables (speed, health, timing) to find the "sweet spot" of challenge and player flow.
- **Error Resilience**: Implement robust error handling and logging to identify and fix issues in complex game state transitions.

## 4. Game Development Checklist

- [ ] Is the core gameplay loop engaging and easy to understand?
- [ ] Have I included enough feedback ("juice") to make interactions feel rewarding?
- [ ] Are game systems modular and decoupled for easier maintenance?
- [ ] Does the game maintain a stable frame rate on target hardware?
- [ ] Is the game state handled predictably, especially during transitions or restarts?
- [ ] Are the controls responsive and intuitive across all supported input methods?
- [ ] Is there a clear win/loss/progress condition and feedback for the player?
- [ ] Have I included debug tools or logging to help verify complex systems?
