import { Game } from '../src/game/scenes/game'

describe('Responsive Layout', () => {
  let scene: Game

  beforeEach(() => {
    scene = new Game()
    scene.cameras = {
      main: {
        setBackgroundColor: jest.fn(),
        width: 1024,
        height: 768,
      } as unknown as Phaser.Cameras.Scene2D.Camera,
    } as unknown as Phaser.Cameras.Scene2D.CameraManager
    scene.add = {
      text: jest.fn().mockImplementation((x, y, text, style) => {
        const obj = {
          x,
          y,
          text,
          style,
          setOrigin: jest.fn().mockReturnThis(),
          setText: jest.fn().mockReturnThis(),
          setX: jest.fn().mockImplementation((newX) => {
            obj.x = newX
            return obj
          }),
          setY: jest.fn().mockImplementation((newY) => {
            obj.y = newY
            return obj
          }),
          setPosition: jest.fn().mockImplementation((newX, newY) => {
            obj.x = newX
            obj.y = newY
            return obj
          }),
        }
        return obj
      }),
      graphics: jest.fn().mockReturnValue({
        x: 0,
        y: 0,
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
        setPosition: jest.fn().mockImplementation(function (
          this: { x: number; y: number },
          newX: number,
          newY: number
        ) {
          this.x = newX
          this.y = newY
          return this
        }),
      }),
      existing: jest.fn().mockImplementation((obj) => obj),
    } as unknown as Phaser.GameObjects.GameObjectFactory
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.time = {
      addEvent: jest.fn().mockReturnValue({}),
      delayedCall: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scale = {
      width: 1024,
      height: 768,
      on: jest.fn(),
    }
  })

  it('should position elements based on screen width/height', () => {
    // Currently elements are hardcoded at 512, 1024 etc.
    // We want them to be relative to this.scale.width and this.scale.height
    scene.init({})
    scene.create()

    // @ts-expect-error - private member
    const scoreText = scene.scoreText
    expect(scoreText.x).toBe(scene.scale.width / 2)

    // @ts-expect-error - private member
    const belt = scene.belt
    expect(belt.x).toBeCloseTo(scene.scale.width * 0.05) // (1 - 0.9) / 2
  })

  it('should adjust layout when screen size changes', () => {
    scene.init({})
    scene.create()

    // Change scale
    // @ts-expect-error - overriding read-only for testing
    scene.scale.width = 800
    // @ts-expect-error - overriding read-only for testing
    scene.scale.height = 600

    // Re-call create (in real game we might need a resize listener, but for now we check if create uses width/height)
    scene.create()

    // @ts-expect-error - private member
    const scoreText = scene.scoreText
    expect(scoreText.x).toBe(400)

    // @ts-expect-error - private member
    const belt = scene.belt
    expect(belt.x).toBe(40) // 800 * 0.05
  })
})
