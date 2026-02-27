import { Game } from '../src/game/scenes/game'
import { LevelStatus } from '../src/game/level_manager'

describe('Game Scene', () => {
  let scene: Game

  beforeEach(() => {
    scene = new Game()
    scene.cameras = {
      main: {
        setBackgroundColor: jest.fn(),
      } as unknown as Phaser.Cameras.Scene2D.Camera,
    } as unknown as Phaser.Cameras.Scene2D.CameraManager
    scene.add = {
      text: jest.fn().mockReturnValue({
        setOrigin: jest.fn().mockReturnThis(),
        setText: jest.fn().mockReturnThis(),
      }),
      graphics: jest.fn().mockReturnValue({
        clear: jest.fn().mockReturnThis(),
        fillStyle: jest.fn().mockReturnThis(),
        lineStyle: jest.fn().mockReturnThis(),
        fillRoundedRect: jest.fn().mockReturnThis(),
        strokeRoundedRect: jest.fn().mockReturnThis(),
        fillCircle: jest.fn().mockReturnThis(),
        strokeCircle: jest.fn().mockReturnThis(),
        fillTriangle: jest.fn().mockReturnThis(),
        strokeTriangle: jest.fn().mockReturnThis(),
        lineBetween: jest.fn().mockReturnThis(),
        add: jest.fn().mockReturnThis(),
        setPosition: jest.fn().mockReturnThis(),
      }),
      existing: jest.fn(),
    } as unknown as Phaser.GameObjects.GameObjectFactory
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.time = {
      addEvent: jest.fn().mockReturnValue({}),
      delayedCall: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.tweens = {
      add: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scene = {
      restart: jest.fn(),
      start: jest.fn(),
    }
  })

  it('should be named Game', () => {
    expect(scene.sys.settings.key).toBe('Game')
  })

  it('should initialize with default level if no data provided', () => {
    scene.init({})
    expect(scene['timeLeft']).toBeGreaterThan(0)
    expect(scene['gameStatus']).toBe(LevelStatus.IN_PROGRESS)
  })

  it('should create belt, bins and UI in create', () => {
    scene.init({})
    scene.create()
    expect(scene.cameras.main.setBackgroundColor).toHaveBeenCalledWith(0xf0f0f0)
    expect(scene['belt']).toBeDefined()
    expect(scene['bins'].length).toBe(4)
    expect(scene.add.text).toHaveBeenCalled()
    expect(scene.time.addEvent).toHaveBeenCalled()
  })

  it('should update spawn timer and belt items in update', () => {
    scene.init({})
    scene.create()
    // @ts-expect-error - testing private method
    const spawnItemSpy = jest.spyOn(scene, 'spawnItem')
    const beltUpdateSpy = jest.spyOn(scene['belt'], 'updateItems')

    scene.update(0, 5000) // Trigger spawn (default interval is 2000)

    expect(spawnItemSpy).toHaveBeenCalled()
    expect(beltUpdateSpy).toHaveBeenCalled()
  })

  it('should handle sorting an item correctly', () => {
    scene.init({})
    scene.create()
    const item = {
      itemColor: scene['bins'][0].binColor,
      on: jest.fn(),
    }

    // @ts-expect-error - private method
    scene.handleSort(item as unknown as import('../src/game/objects/conveyor_item').ConveyorItem)

    expect(scene.tweens.add).toHaveBeenCalled()
  })

  it('should handle level completion', () => {
    scene.init({})
    scene.create()
    scene['currentScore'] = 100
    // @ts-expect-error - private method
    scene.updateScore()
    expect(scene['gameStatus']).toBe(LevelStatus.SUCCESS)
  })

  it('should handle timer reaching zero', () => {
    scene.init({})
    scene.create()
    // @ts-expect-error - testing private member
    scene.timeLeft = 1
    const callback = (scene.time.addEvent as jest.Mock).mock.calls[0][0].callback
    callback.call(scene)
    // @ts-expect-error - testing private member
    expect(scene.timeLeft).toBe(0)
    // @ts-expect-error - testing private member
    expect(scene.gameStatus).toBe(LevelStatus.FAILURE)
  })
})
