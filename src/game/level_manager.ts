/**
 * Status of the current level.
 */
export enum LevelStatus {
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
}

/**
 * Configuration for a single level.
 */
export interface LevelConfig {
  id: number
  targetScore: number
  timeLimit: number // In seconds
  beltSpeed: number
  spawnInterval: number // In milliseconds
  allowedColors: number[]
}

/**
 * Manages level configuration, progression, and status.
 */
export class LevelManager {
  private static readonly LEVELS: LevelConfig[] = [
    {
      id: 1,
      targetScore: 10,
      timeLimit: 30,
      beltSpeed: 2,
      spawnInterval: 1500,
      allowedColors: [0xff4d4d, 0x4d79ff, 0x4dff88, 0xffff4d],
    },
    {
      id: 2,
      targetScore: 15,
      timeLimit: 45,
      beltSpeed: 2.5,
      spawnInterval: 1200,
      allowedColors: [0xff4d4d, 0x4d79ff, 0x4dff88, 0xffff4d],
    },
    {
      id: 3,
      targetScore: 20,
      timeLimit: 60,
      beltSpeed: 3,
      spawnInterval: 1000,
      allowedColors: [0xff4d4d, 0x4d79ff, 0x4dff88, 0xffff4d],
    },
  ]

  private currentLevelIndex: number = 0

  /**
   * Creates a new LevelManager.
   * @param initialLevel The index of the level to start with (0-based).
   */
  constructor(initialLevel: number = 0) {
    this.currentLevelIndex = initialLevel
  }

  /**
   * Gets the configuration for the current level.
   * @returns The current level configuration.
   */
  public getCurrentLevel(): LevelConfig {
    return LevelManager.LEVELS[Math.min(this.currentLevelIndex, LevelManager.LEVELS.length - 1)]
  }

  /**
   * Advances to the next level if available.
   * @returns True if advanced to next level, false if already at last level.
   */
  public nextLevel(): boolean {
    if (this.currentLevelIndex < LevelManager.LEVELS.length - 1) {
      this.currentLevelIndex++
      return true
    }
    return false
  }

  /**
   * Resets the level progression to the first level.
   */
  public reset(): void {
    this.currentLevelIndex = 0
  }

  /**
   * Gets the current level number (1-based).
   * @returns The current level number.
   */
  public getLevelIndex(): number {
    return this.currentLevelIndex + 1
  }

  /**
   * Checks if the current level is the last level.
   * @returns True if it's the last level, false otherwise.
   */
  public isLastLevel(): boolean {
    return this.currentLevelIndex === LevelManager.LEVELS.length - 1
  }
}
