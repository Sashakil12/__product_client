Cypress.Commands.add('login', () => { 
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/user/login',
      body: {
        
          userName: Cypress.env("user"),
          password: Cypress.env("password"),
        
      }
    })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
    })
  
  })
describe("check the authenticated products page works fine", function(){
    beforeEach(()=>{
        cy.login()
        cy.visit('http://localhost:3000/products')        
    })
    it('should navigate to the product page', function(){

        cy.then(() => {
           cy.log("after visit"+window.localStorage.getItem('token'))
            cy.url().should('include', '/products')
        })
    })

    it('should have the product table page', function(){        
        cy.get('[data-testid="product-table"]').should("exist")
        
        
    })
})