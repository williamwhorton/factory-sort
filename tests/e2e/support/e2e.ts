import 'cypress-wait-until'

Cypress.on('uncaught:exception', (err, _runnable) => {
  // Returning false here prevents Cypress from failing the test
  if (err.message.includes('Unable to decode audio data')) {
    return false
  }
})
