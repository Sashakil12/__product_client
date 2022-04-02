Cypress.Commands.add("login", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/user/login",
      body: {
        userName: Cypress.env("user"),
        password: Cypress.env("password"),
      },
    }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
  });
  describe("check add Product works fine", function () {
    beforeEach(() => {
      cy.login();
      cy.visit("http://localhost:3000/products");
    });
    it("it selects products", function(){
        cy.contains('Delete Product').should("be.disabled")
        cy.get('input[type="checkbox"]')
        .each(($elem, index) => {
          if (index === 1) {
            cy.wrap($elem).click({force:true});
            cy.wrap($elem).should("be.checked")
          }
        })
        cy.contains('Delete Product').should("not.be.disabled")
    })
    it("it deletes a product", function(){
        cy.contains('Delete Product').should("be.disabled")
        cy.get('input[type="checkbox"]')
        .each(($elem, index) => {
          if (index === 1) {
            cy.wrap($elem).click({force:true});
            cy.wrap($elem).should("be.checked")
          }
        })
        cy.contains('Delete Product').should("not.be.disabled")
        cy.contains('Delete Product').click()
        cy.contains('Deleted product(s) successfully...').click()
    })
    it("it logs out from the product page", function(){
        cy.contains('log out').click()
        cy.then(()=>{
            cy.url().should('include', '/auth')
        })      
        cy.contains('Login').click()
    })
  });
  