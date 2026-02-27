import { ConveyorBelt } from '../src/game/objects/ConveyorBelt'
import { ConveyorItem, ItemColor, ItemShape } from '../src/game/objects/ConveyorItem'

// Mock Phaser Graphics
const mockGraphics = {
  clear: jest.fn().mockReturnThis(),
  fillStyle: jest.fn().mockReturnThis(),
  lineStyle: jest.fn().mockReturnThis(),
  fillRect: jest.fn().mockReturnThis(),
  strokeRect: jest.fn().mockReturnThis(),
  lineBetween: jest.fn().mockReturnThis(),
}

// Mock Phaser Scene
const mockScene = {
  add: {
    graphics: jest.fn().mockReturnValue(mockGraphics),
    existing: jest.fn(),
  },
} as unknown as Phaser.Scene

describe('ConveyorBelt', () => {
  it('should create a ConveyorBelt with specified length and width', () => {
    const length = 500
    const width = 100
    const belt = new ConveyorBelt(mockScene, 10, 20, length, width)

    expect(belt.x).toBe(10)
    expect(belt.y).toBe(20)
    expect(mockScene.add.graphics).toHaveBeenCalled()
    expect(mockScene.add.existing).toHaveBeenCalledWith(belt)
  })

  it('should add items to the belt', () => {
    const belt = new ConveyorBelt(mockScene, 0, 0, 500)
    const item = new ConveyorItem(mockScene, 0, 0, ItemColor.RED, ItemShape.CUBE)

    belt.addItem(item)
    expect(belt.getItems()).toContain(item)
    expect(item.parentContainer).toBe(belt)
  })

  it('should update items position and remove them when they go off the belt', () => {
    const length = 100
    const belt = new ConveyorBelt(mockScene, 0, 0, length)
    const item = new ConveyorItem(mockScene, 0, 0, ItemColor.RED, ItemShape.CUBE)

    belt.addItem(item)
    const initialX = item.x

    belt.updateItems()
    expect(item.x).toBeGreaterThan(initialX)

    // Move item off the belt
    item.x = length + 1
    const destroySpy = jest.spyOn(item, 'destroy')
    belt.updateItems()

    expect(belt.getItems()).not.toContain(item)
    expect(destroySpy).toHaveBeenCalled()
  })
})
