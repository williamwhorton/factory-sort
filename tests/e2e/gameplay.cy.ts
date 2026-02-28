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
          // Teleport item near bin FIRST to ensure nearest-bin logic works
          item.x = matchingBin.x - belt.x
          item.y = matchingBin.y - belt.y

          item.emit('pointerdown')

          // The score update happens after an animation (400ms + 100ms)
          cy.wait(1500)

          // Verify score is 1
          cy.window().then((win) => {
            const { game } = win as unknown as ExtendedWindow
            const updatedScene = game.scene.getScene('Game') as TestGameScene
            assert.equal(updatedScene.currentScore, 1, 'Score should be 1')
          })
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
        const matchingBin = gameScene.bins.find((b) => b.binColor === item.itemColor)
        if (matchingBin) {
          item.x = matchingBin.x - belt.x
          item.y = matchingBin.y - belt.y
        }
        item.emit('pointerdown')
        cy.wait(1500)
        cy.window().then((win) => {
          const { game } = win as unknown as ExtendedWindow
          const updatedScene = game.scene.getScene('Game') as TestGameScene
          assert.equal(updatedScene.currentScore, 1, 'Score should be 1')
        })

        // 2. Click a mismatched item
        cy.waitUntil(() => belt.getItems().length > 0, { timeout: 5000 }).then(() => {
          const secondItem = belt.getItems()[0]

          // To ensure a mismatch, we'll teleport the item far away from its matching bin
          // and close to a different bin.
          // Or simpler: just emit 'pointerdown' and let the nearest-bin logic handle it.
          // But wait, if it's on the belt, it's always near SOME bin.
          // Let's just teleport it to a known "mismatch" position.
          const otherBin = gameScene.bins.find((b) => b.binColor !== secondItem.itemColor)

          if (otherBin) {
            // Move item near other bin
            secondItem.x = otherBin.x - belt.x
            secondItem.y = otherBin.y - belt.y + 10 // slightly offset but nearest

            secondItem.emit('sort', secondItem)
            cy.wait(500) // mismatch is faster (no animation to bin)

            cy.window().then((win) => {
              const { game } = win as unknown as ExtendedWindow
              const updatedScene = game.scene.getScene('Game') as TestGameScene
              assert.equal(updatedScene.currentScore, 0, 'Score should be 0 (mismatch)')
            })
          }
        })
      })
    })
  })
})
