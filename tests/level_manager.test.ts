import { LevelManager } from '../src/game/level_manager'

describe('LevelManager', () => {
  let levelManager: LevelManager

  beforeEach(() => {
    levelManager = new LevelManager()
  })

  test('should start at level 1', () => {
    expect(levelManager.getLevelIndex()).toBe(1)
  })

  test('should get correct current level config', () => {
    const config = levelManager.getCurrentLevel()
    expect(config.id).toBe(1)
    expect(config.targetScore).toBe(10)
  })

  test('should advance to next level', () => {
    const result = levelManager.nextLevel()
    expect(result).toBe(true)
    expect(levelManager.getLevelIndex()).toBe(2)
  })

  test('should not advance beyond last level', () => {
    levelManager.nextLevel() // Level 2
    levelManager.nextLevel() // Level 3 (last)
    const result = levelManager.nextLevel()
    expect(result).toBe(false)
    expect(levelManager.getLevelIndex()).toBe(3)
  })

  test('should correctly identify last level', () => {
    expect(levelManager.isLastLevel()).toBe(false)
    levelManager.nextLevel() // Level 2
    expect(levelManager.isLastLevel()).toBe(false)
    levelManager.nextLevel() // Level 3
    expect(levelManager.isLastLevel()).toBe(true)
  })

  test('should reset to level 1', () => {
    levelManager.nextLevel()
    levelManager.reset()
    expect(levelManager.getLevelIndex()).toBe(1)
  })

  test('should initialize with specific level', () => {
    const lm = new LevelManager(1) // Start at index 1 (Level 2)
    expect(lm.getLevelIndex()).toBe(2)
  })
})
