class MockGraphics {
  clear = jest.fn().mockReturnThis()
  fillStyle = jest.fn().mockReturnThis()
  lineStyle = jest.fn().mockReturnThis()
  fillRect = jest.fn().mockReturnThis()
  strokeRect = jest.fn().mockReturnThis()
  fillRoundedRect = jest.fn().mockReturnThis()
  strokeRoundedRect = jest.fn().mockReturnThis()
  fillCircle = jest.fn().mockReturnThis()
  strokeCircle = jest.fn().mockReturnThis()
  fillTriangle = jest.fn().mockReturnThis()
  strokeTriangle = jest.fn().mockReturnThis()
  lineBetween = jest.fn().mockReturnThis()
  add = jest.fn().mockReturnThis()
  setPosition = jest.fn().mockReturnThis()
  destroy = jest.fn()
  parentContainer: unknown = null
}

class MockContainer {
  x = 0
  y = 0
  scene: unknown
  list: unknown[] = []
  parentContainer: unknown = null
  setSize = jest.fn().mockReturnThis()
  setInteractive = jest.fn().mockReturnThis()
  on = jest.fn().mockReturnThis()
  emit = jest.fn().mockReturnThis()
  constructor(scene: unknown, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y
  }
  add(item: { parentContainer: unknown } | { parentContainer: unknown }[]) {
    if (Array.isArray(item)) {
      this.list.push(...item)
      item.forEach((i) => (i.parentContainer = this))
    } else {
      this.list.push(item)
      item.parentContainer = this
    }
    return this
  }
  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
  destroy() {
    this.list = []
  }
}

class MockPath {
  points: { x: number; y: number }[]
  constructor(x: number, y: number) {
    this.points = [{ x, y }]
  }
  lineTo(x: number, y: number) {
    this.points.push({ x, y })
    return this
  }
  getEndPoint() {
    return this.points[this.points.length - 1]
  }
  draw = jest.fn()
}

const Phaser = {
  GameObjects: {
    Container: MockContainer,
    Graphics: MockGraphics,
  },
  Scene: class MockScene {
    sys: { settings: { key: string } }
    load: {
      setPath: jest.Mock
      image: jest.Mock
      audio: jest.Mock
      on: jest.Mock
    }
    sound: {
      play: jest.Mock
      get: jest.Mock
    }
    add: {
      image: jest.Mock
      rectangle: jest.Mock
      text: jest.Mock
      existing: jest.Mock
      graphics: jest.Mock
    }
    time: {
      addEvent: jest.Mock
      delayedCall: jest.Mock
    }
    tweens: {
      add: jest.Mock
    }
    scale: {
      width: number
      height: number
    }
    cameras: {
      main: {
        setBackgroundColor: jest.Mock
      }
    }
    constructor(config: string | { key: string }) {
      const key = typeof config === 'string' ? config : config.key
      this.sys = { settings: { key } }
      this.load = {
        setPath: jest.fn().mockReturnThis(),
        image: jest.fn().mockReturnThis(),
        audio: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis(),
      }
      this.sound = {
        play: jest.fn(),
        get: jest.fn(),
      }
      this.add = {
        image: jest.fn().mockReturnValue({ setOrigin: jest.fn().mockReturnThis() }),
        rectangle: jest.fn().mockReturnValue({ setStrokeStyle: jest.fn().mockReturnThis() }),
        text: jest.fn().mockReturnValue({
          setOrigin: jest.fn().mockReturnThis(),
          setText: jest.fn().mockReturnThis(),
        }),
        existing: jest.fn(),
        graphics: jest.fn().mockReturnValue(new MockGraphics()),
      }
      this.time = {
        addEvent: jest.fn(),
        delayedCall: jest.fn(),
      }
      this.tweens = {
        add: jest.fn(),
      }
      this.scale = {
        width: 800,
        height: 600,
      }
      this.cameras = {
        main: {
          setBackgroundColor: jest.fn(),
        },
      }
    }
  },
  Curves: {
    Path: MockPath,
  },
  Geom: {
    Rectangle: class {
      x: number
      y: number
      width: number
      height: number
      static Contains = jest.fn()
      constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      }
    },
  },
  Types: {
    Core: {
      GameConfig: class MockGameConfig {},
    },
  },
  Scale: {
    FIT: 0,
    CENTER_BOTH: 1,
  },
}

export default Phaser
export const GameObjects = Phaser.GameObjects
export const Scene = Phaser.Scene
export const Curves = Phaser.Curves
