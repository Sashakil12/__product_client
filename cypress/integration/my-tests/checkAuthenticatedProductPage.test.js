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
        
    })
    it('should navigate to the product page', function(){
        
        cy.visit('http://localhost:3000/products')
        cy.then(() => {
           cy.log("after visit"+window.localStorage.getItem('token'))
            cy.url().should('include', '/products')
        })
    })
})