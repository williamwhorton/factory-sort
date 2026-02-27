import { MainMenu } from '../src/game/scenes/main_menu'

describe('MainMenu Scene', () => {
  let scene: MainMenu

  beforeEach(() => {
    scene = new MainMenu()
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.add = {
      image: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnValue({
        setOrigin: jest.fn().mockReturnThis(),
      }),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.input = {
      once: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scene = {
      start: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scale = {
      width: 1024,
      height: 768,
    }
  })

  it('should be named MainMenu', () => {
    expect(scene.sys.settings.key).toBe('MainMenu')
  })

  it('should create background, logo, and text', () => {
    scene.create()
    expect(scene.add.image).toHaveBeenCalledWith(512, 384, 'background')
    expect(scene.add.image).toHaveBeenCalledWith(512, 768 * 0.4, 'logo')
    expect(scene.add.text).toHaveBeenCalled()
  })

  it('should start Game scene on pointer down', () => {
    scene.create()
    expect(scene.input.once).toHaveBeenCalledWith('pointerdown', expect.any(Function))

    const callback = (scene.input.once as jest.Mock).mock.calls[0][1]
    callback()

    expect(scene.scene.start).toHaveBeenCalledWith('Game')
  })
})
