class MockGraphics {
  clear = jest.fn().mockReturnThis()
  fillStyle = jest.fn().mockReturnThis()
  lineStyle = jest.fn().mockReturnThis()
  fillRect = jest.fn().mockReturnThis()
  strokeRect = jest.fn().mockReturnThis()
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
  Scene: class MockScene {},
  Curves: {
    Path: MockPath,
  },
}

export default Phaser
export const GameObjects = Phaser.GameObjects
export const Scene = Phaser.Scene
export const Curves = Phaser.Curves
