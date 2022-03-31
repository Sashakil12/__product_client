/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000/auth");
});
describe("Auth form renders properly", () => {
  it("renders nav bar", () => {
    cy.get('[data-testid="navbar"]').should("exist");
  });

  it("renders auth forms tab", () => {
    cy.get('[data-testid="navbar"]').should("exist");
  });

  it("renders auth  tabs", () => {
    cy.get('[data-testid="auth-tab"]').should("exist");
  });

  it("toggles to sign up tab", () => {
    cy.get('[data-testid="signup-tab"]').click();
    cy.log("clicked sign up tab");
    cy.get('[data-testid="signup-form"]').should("exist");
  });
  it("toggles back to login tab", () => {
    cy.get('[data-testid="login-tab"]').click();
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
  });
});

describe("Login form input validation", () => {
  it("rejects an empty credentials", () => {
    cy.get('[data-testid="login-tab"]').click();
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
    cy.log("log in form exists");
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="login-submit"]').click();
    cy.log("log in form exists");
    cy.get('[data-testid="login-user-error"]').should("have.text", "Required");
  });
  it("rejects invalid credentials", () => {
    cy.get('[data-testid="login-tab"]').click();
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
    cy.log("log in form exists");
    cy.get('[data-testid="login-username"]').type("$$")
    cy.get('[data-testid="login-password"]').click();
    cy.get('[data-testid="login-user-error"]').should("have.text", "You can use a-z, A-z, 0-9 only");
    cy.log("rejects short username")
    cy.get('[data-testid="login-username"]').clear()
    cy.get('[data-testid="login-username"]').type("aa")
    cy.get('[data-testid="login-password"]').click();
    cy.get('[data-testid="login-user-error"]').should("have.text", "userName must be at least 3 characters");
    cy.log("rejects long username")
    cy.get('[data-testid="login-username"]').clear()
    cy.get('[data-testid="login-username"]').type("aannshgtreartyui765479")
    cy.get('[data-testid="login-password"]').click();
    cy.get('[data-testid="login-user-error"]').should("have.text", "userName must be at most 20 characters");
    cy.log("rejects short password")
    cy.get('[data-testid="login-password"]').clear()
    cy.get('[data-testid="login-password"]').type("kjhgtry")
    cy.get('[data-testid="login-username"]').click();
    cy.get('[data-testid="login-password-error"]').should("have.text", "Too short!");
    cy.log("rejects long password")
    cy.get('[data-testid="login-password"]').clear()
    cy.get('[data-testid="login-password"]').type("hgtrfgtretgtyujhytr")
    cy.get('[data-testid="login-username"]').click();
    cy.get('[data-testid="login-password-error"]').should("have.text", "Too long!");

  });
  it("accepts a valid credentials", () => {
    cy.get('[data-testid="login-tab"]').click();    
    cy.log("clicked login tab");
    cy.get('[data-testid="login-form"]').should("exist");
    cy.log("log in form exists");
    cy.get('[data-testid="login-username"]').type("apple23")
    cy.get('[data-testid="login-password"]').type("12345678");
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="login-submit"]').should("be.disabled");
  });
  
});
