/// <reference types="cypress" />


describe('Auth form validation', () => {
    beforeEach(() => {

      cy.visit('http://localhost:3000/auth')
    })
  
    it('renders nav bar', () => {
      
      cy.get('[data-testid="navbar"]').should('exist')
        
    })

    it('renders auth forms tab', () => {
      
        cy.get('[data-testid="navbar"]').should('exist')
          

      })

      it("renders auth  tabs", ()=>{
        cy.get('[data-testid="auth-tab"]').should('exist')
      })
})
