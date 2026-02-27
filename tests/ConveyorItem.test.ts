import { ConveyorItem, ItemColor, ItemShape } from '../src/game/objects/ConveyorItem'

// Mock Phaser Scene
const mockScene = {
  add: {
    graphics: jest.fn().mockReturnValue({
      clear: jest.fn().mockReturnThis(),
      fillStyle: jest.fn().mockReturnThis(),
      lineStyle: jest.fn().mockReturnThis(),
      fillRect: jest.fn().mockReturnThis(),
      strokeRect: jest.fn().mockReturnThis(),
      fillCircle: jest.fn().mockReturnThis(),
      strokeCircle: jest.fn().mockReturnThis(),
      fillTriangle: jest.fn().mockReturnThis(),
      strokeTriangle: jest.fn().mockReturnThis(),
    }),
    existing: jest.fn(),
  },
} as unknown as Phaser.Scene

describe('ConveyorItem', () => {
  it('should create a ConveyorItem with the specified color and shape', () => {
    const item = new ConveyorItem(mockScene, 100, 200, ItemColor.RED, ItemShape.CUBE)

    expect(item.itemColor).toBe(ItemColor.RED)
    expect(item.itemShape).toBe(ItemShape.CUBE)
    expect(item.x).toBe(100)
    expect(item.y).toBe(200)
    expect(mockScene.add.existing).toHaveBeenCalledWith(item)
  })

  it('should draw a cube when ItemShape.CUBE is specified', () => {
    const graphics = (mockScene.add.graphics as jest.Mock)()
    ;(mockScene.add.graphics as jest.Mock).mockReturnValue(graphics)

    new ConveyorItem(mockScene, 0, 0, ItemColor.BLUE, ItemShape.CUBE)

    expect(graphics.fillRect).toHaveBeenCalled()
    expect(graphics.strokeRect).toHaveBeenCalled()
  })

  it('should draw a sphere when ItemShape.SPHERE is specified', () => {
    const graphics = (mockScene.add.graphics as jest.Mock)()
    ;(mockScene.add.graphics as jest.Mock).mockReturnValue(graphics)

    new ConveyorItem(mockScene, 0, 0, ItemColor.GREEN, ItemShape.SPHERE)

    expect(graphics.fillCircle).toHaveBeenCalled()
    expect(graphics.strokeCircle).toHaveBeenCalled()
  })

  it('should draw a pyramid when ItemShape.PYRAMID is specified', () => {
    const graphics = (mockScene.add.graphics as jest.Mock)()
    ;(mockScene.add.graphics as jest.Mock).mockReturnValue(graphics)

    new ConveyorItem(mockScene, 0, 0, ItemColor.YELLOW, ItemShape.PYRAMID)

    expect(graphics.fillTriangle).toHaveBeenCalled()
    expect(graphics.strokeTriangle).toHaveBeenCalled()
  })
})
