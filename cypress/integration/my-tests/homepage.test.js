/// <reference types="cypress" />

describe('Homepage', () => {
    beforeEach(() => {

      cy.visit('http://localhost:3000')
    })
  
    it('renders nav bar', () => {
      
      cy.get('[data-testid="navbar"]').should('exist')
  
    })
})

