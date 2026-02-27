describe('Game Load Test', () => {
  it('should load the game canvas', () => {
    cy.visit('/')
    // Phaser creates a canvas element
    cy.get('canvas').should('be.visible')
  })

  it('should display the loading screen or main menu', () => {
    cy.visit('/')
    // Wait for canvas and check if it exists
    cy.get('canvas').should('exist')
  })
})
