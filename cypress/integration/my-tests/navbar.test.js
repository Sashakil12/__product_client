describe("navbar has links", () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000')
      })
  
    it.only('to home', () => {
      
        cy.get('[data-testId="home-link"]').should('exist')
    
      })  
      it.only('to products', () => {
      
        cy.get('[data-testId="products-link"]').should('exist')
    
      })  
      it.only('to login', () => {
      
        cy.get('[data-testId="login-link"]').should('exist')
    
      })  
      it.only('to logout', () => {
      
        cy.get('[data-testId="logout-link"]').should('exist')
    
      })  
})
describe("navbar navigates", () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000')
      })
  
    it.only('to home', () => {
      
        cy.get('[data-testId="home-link"]').click()
        cy.then(() => {
            cy.url().should('include', '/')
        })
    
      })  
      it.only('to products', () => {
      
        cy.get('[data-testId="products-link"]').click()
        cy.then(() => {
            cy.url().should('include', '/products')
        })
    
      })  
      it.only('to login', () => {
      
        cy.get('[data-testId="login-link"]').click()
        cy.then(() => {
            cy.url().should('include', '/login')
        })
    
      })  
      it.only('to logout', () => {
      
        cy.get('[data-testId="logout-link"]').click()
        cy.then(() => {
            cy.url().should('include', '/logout')
        })
    
      })  
})