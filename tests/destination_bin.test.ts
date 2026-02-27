import { DestinationBin } from '../src/game/objects/destination_bin'
import { ConveyorItem, ItemColor, ItemShape } from '../src/game/objects/conveyor_item'

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
    }),
    existing: jest.fn(),
    text: jest.fn().mockReturnValue({
      setOrigin: jest.fn().mockReturnThis(),
    }),
  },
} as unknown as Phaser.Scene

describe('DestinationBin', () => {
  it('should create a DestinationBin with specified color', () => {
    const bin = new DestinationBin(mockScene, 100, 200, ItemColor.RED)

    expect(bin.binColor).toBe(ItemColor.RED)
    expect(bin.x).toBe(100)
    expect(bin.y).toBe(200)
    expect(mockScene.add.existing).toHaveBeenCalledWith(bin)
  })

  it('should accept items of matching color', () => {
    const bin = new DestinationBin(mockScene, 0, 0, ItemColor.BLUE)
    const matchingItem = new ConveyorItem(mockScene, 0, 0, ItemColor.BLUE, ItemShape.CUBE)
    const nonMatchingItem = new ConveyorItem(mockScene, 0, 0, ItemColor.RED, ItemShape.CUBE)

    expect(bin.acceptItem(matchingItem)).toBe(true)
    expect(bin.acceptItem(nonMatchingItem)).toBe(false)
  })

  it('should increment score when matching item is accepted', () => {
    const bin = new DestinationBin(mockScene, 0, 0, ItemColor.GREEN)
    const item = new ConveyorItem(mockScene, 0, 0, ItemColor.GREEN, ItemShape.CUBE)

    const initialScore = bin.getScore()
    bin.acceptItem(item)
    expect(bin.getScore()).toBe(initialScore + 1)
  })
})
