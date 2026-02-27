import { Boot } from '../src/game/scenes/boot'

describe('Boot Scene', () => {
  let scene: Boot

  beforeEach(() => {
    scene = new Boot()
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.load = {
      image: jest.fn(),
      setPath: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scene = {
      start: jest.fn(),
    }
  })

  it('should be named Boot', () => {
    expect(scene.sys.settings.key).toBe('Boot')
  })

  it('should preload background asset', () => {
    scene.preload()
    expect(scene.load.image).toHaveBeenCalledWith('background', 'assets/bg.png')
  })

  it('should start Preloader scene on create', () => {
    scene.create()
    expect(scene.scene.start).toHaveBeenCalledWith('Preloader')
  })
})
