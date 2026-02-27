import { Preloader } from '../src/game/scenes/preloader'

describe('Preloader Scene', () => {
  let scene: Preloader

  beforeEach(() => {
    scene = new Preloader()
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.add = {
      image: jest.fn().mockReturnThis(),
      rectangle: jest.fn().mockReturnValue({
        setStrokeStyle: jest.fn().mockReturnThis(),
        width: 0,
      }),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.load = {
      on: jest.fn(),
      setPath: jest.fn(),
      image: jest.fn(),
    }
    // @ts-expect-error - Mocking Phaser Scene properties
    scene.scene = {
      start: jest.fn(),
    }
  })

  it('should be named Preloader', () => {
    expect(scene.sys.settings.key).toBe('Preloader')
  })

  it('should create loading bar in init', () => {
    scene.init()
    expect(scene.add.image).toHaveBeenCalledWith(512, 384, 'background')
    expect(scene.add.rectangle).toHaveBeenCalledWith(512, 384, 468, 32)
    expect(scene.load.on).toHaveBeenCalledWith('progress', expect.any(Function))
  })

  it('should update progress bar width on progress event', () => {
    scene.init()
    const bar = (scene.add.rectangle as jest.Mock).mock.results[1].value
    const callback = (scene.load.on as jest.Mock).mock.calls[0][1]

    callback(0.5)
    expect(bar.width).toBe(4 + 460 * 0.5)

    callback(1)
    expect(bar.width).toBe(464)
  })

  it('should set assets path and load logo in preload', () => {
    scene.preload()
    expect(scene.load.setPath).toHaveBeenCalledWith('assets')
    expect(scene.load.image).toHaveBeenCalledWith('logo', 'logo.png')
  })

  it('should start MainMenu on create', () => {
    scene.create()
    expect(scene.scene.start).toHaveBeenCalledWith('MainMenu')
  })
})
