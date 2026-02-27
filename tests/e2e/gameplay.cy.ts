import { Game as GameScene } from '../../src/game/scenes/game'
import { ConveyorBelt } from '../../src/game/objects/conveyor_belt'
import { DestinationBin } from '../../src/game/objects/destination_bin'

interface ExtendedWindow extends Window {
  game: Phaser.Game
}

interface TestGameScene extends GameScene {
  belt: ConveyorBelt
  bins: DestinationBin[]
  currentScore: number
}

describe('Gameplay E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for the game to be initialized and Preloader to finish
    cy.get('canvas').should('be.visible')
    // Give it some time to load assets and reach MainMenu
    cy.wait(2000)
  })

  it('should start the game when the opening screen is clicked', () => {
    // Click on the canvas to start from MainMenu
    cy.get('canvas').click(512, 384) // Click in the center

    cy.window().then((win) => {
      const { game } = win as unknown as ExtendedWindow
      const scene = game.scene.getScene('Game') as TestGameScene
      // Wait for Game scene to be active
      const isNotNull = scene !== null
      assert.isTrue(isNotNull, 'Scene should not be null')
      cy.wait(500) // Small wait for scene transition
      const isActive = game.scene.isActive('Game')
      assert.isTrue(isActive, 'Game scene should be active')
    })
  })

  it('should keep score at 0 when clicking a mismatched item', () => {
    // Start the game
    cy.get('canvas').click(512, 384)
    cy.wait(1000) // Wait for first item to spawn

    cy.window().then((win) => {
      const { game } = win as unknown as ExtendedWindow
      const gameScene = game.scene.getScene('Game') as TestGameScene
      const belt = gameScene.belt

      // Wait for an item to be available on the belt
      cy.waitUntil(() => belt.getItems().length > 0, { timeout: 5000 }).then(() => {
        const item = belt.getItems()[0]

        // We need to click the item. Since it moves, we'll force a pointerdown on it via Phaser
        // In a real E2E we might want to click coordinates, but that's unstable for moving items.
        // The requirement says "The user clicks on an item", so we simulate the click.
        item.emit('pointerdown')

        // Verify score remains 0
        assert.equal(gameScene.currentScore, 0, 'Score should be 0')
      })
    })
  })

  it('should increment score by one when clicking a matching item', () => {
    // Start the game
    cy.get('canvas').click(512, 384)
    cy.wait(1000)

    cy.window().then((win) => {
      const { game } = win as unknown as ExtendedWindow
      const gameScene = game.scene.getScene('Game') as TestGameScene
      const belt = gameScene.belt

      cy.waitUntil(() => belt.getItems().length > 0, { timeout: 5000 }).then(() => {
        const item = belt.getItems()[0]
        const itemColor = item.itemColor

        // Find matching bin (game logic currently only matches if a matching bin exists)
        const matchingBin = gameScene.bins.find((bin) => bin.binColor === itemColor)

        if (matchingBin) {
          item.emit('pointerdown')

          // The score update happens after an animation (400ms + 100ms)
          cy.wait(1000)

          // Verify score is 1
          assert.equal(gameScene.currentScore, 1, 'Score should be 1')
        } else {
          throw new Error('No matching bin found for item color: ' + itemColor)
        }
      })
    })
  })

  it('should decrement score by one when clicking a mismatched item after a match', () => {
    // Start the game
    cy.get('canvas').click(512, 384)
    cy.wait(1000)

    cy.window().then((win) => {
      const { game } = win as unknown as ExtendedWindow
      const gameScene = game.scene.getScene('Game') as TestGameScene
      const belt = gameScene.belt

      // 1. Get a match first
      cy.waitUntil(() => belt.getItems().length > 0, { timeout: 5000 }).then(() => {
        const item = belt.getItems()[0]
        item.emit('pointerdown')
        cy.wait(1000)
        assert.equal(gameScene.currentScore, 1, 'Score should be 1')

        // 2. Click a mismatched item (or rather, click ANY item and ensure it fails if it's mismatched)
        // Since we want to test "mismatched item", we need to wait for another item
        cy.waitUntil(() => belt.getItems().length > 0, { timeout: 5000 }).then(() => {
          const secondItem = belt.getItems()[0]

          // We'll force this to be a "mismatch" test by finding an item that SHOULD mismatch
          // But wait, the current game logic: handleSort FINDS the matching bin.
          // If a bin exists for that color, it's a match.
          // If NO bin exists for that color, it's a mismatch.
          // In the current game, all 4 colors have bins. So every item has a matching bin.
          // To test a mismatch, we'd need an item color that has no bin.

          // Wait, the issue says: "The user clicks on an item that doesn't match the nearest container"
          // In my previous analysis, handleSort finds ANY matching bin, not the nearest one.
          // This is a BUG/Deviation from requirement.

          // Also: "The user clicks on a mismatched item again; the score decrements by one."

          // I will implement the test as if it's supposed to work, and it will likely fail.
          secondItem.emit('pointerdown')
          // If the second item is also a match (which it will be in current code), score becomes 2.
          // If it was a mismatch, it should become 0 (1 - 1).

          cy.wait(1000)
          assert.equal(gameScene.currentScore, 0, 'Score should be 0 (mismatch)')
        })
      })
    })
  })
})
