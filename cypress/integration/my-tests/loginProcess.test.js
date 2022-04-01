/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000/auth");
});
describe("Login flow works properly", () => {
  it("should reject a set of valid but unregistered credential", () => {
    cy.get('[data-testid="login-tab"]').click();
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
    cy.log("log in form exists");
    cy.get('[data-testid="login-username"]').type(
      "__u___name" + Math.floor(Math.random() * 10000)
    );
    cy.get('[data-testid="login-password"]').type("12345788");
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="login-submit"]').should("be.disabled");
    cy.contains("Log in failed!").should("exist");
  });
  it("logs in with valid credentials", () => {
    cy.intercept("POST", "/user/login").as("logInUser");

    cy.get('[data-testid="login-tab"]').click();
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
    cy.log("login form exists");
    cy.get('[data-testid="login-username"]').type(Cypress.env("user"));
    cy.get('[data-testid="login-password"]').type(`${Cypress.env("password")}{enter}`);
    
    cy.wait("@logInUser", {timeout:5000}).then(({ response }) => {
      
      expect(response.statusCode).to.eq(200);
    });
    cy.contains("Logged in successfully...").should("exist");
    cy.get('[data-testid="login-link"]').should("not.exist");
    cy.contains('log out').should('exist')
  
  })
   
});
