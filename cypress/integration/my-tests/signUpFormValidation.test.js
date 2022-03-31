/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000/auth");
});

context("Sign up form input validation", () => {
  let user;
  let authUser
  before(function () {
    cy.fixture("user").then((data) => {
      user = data;
    });
    
  });

  beforeEach(() => {
    cy.wrap(user).as("user");
    cy.wrap(authUser).as("authUser");
  });
  it("rejects empty credentials", () => {
    cy.get('[data-testid="signup-tab"]').click();
    cy.log("clicked signup tab");
    cy.get('[data-testid="signup-form"]').should("exist");
    cy.log("signup form exists");
    cy.get('[data-testid="signup-submit"]').click();
    cy.get('[data-testid="signup-submit"]').click();
    cy.log("signup form exists");
    cy.get('[data-testid="signup-user-error"]').should("have.text", "Required");
  });
  it("rejects invalid credentials", () => {
    cy.get('[data-testid="signup-tab"]').click();
    cy.log("clicked signup tab");
    cy.get('[data-testid="signup-form"]').should("exist");
    cy.log("signup form exists");
    cy.get('[data-testid="signup-username"]').type("$$");
    cy.get('[data-testid="signup-password"]').click();
    cy.get('[data-testid="signup-user-error"]').should(
      "have.text",
      "You can use a-z, A-z, 0-9 only"
    );
    cy.log("rejects short username");
    cy.get('[data-testid="signup-username"]').clear();
    cy.get('[data-testid="signup-username"]').type("aa");
    cy.get('[data-testid="signup-password"]').click();
    cy.get('[data-testid="signup-user-error"]').should(
      "have.text",
      "userName must be at least 3 characters"
    );
    cy.log("rejects long username");
    cy.get('[data-testid="signup-username"]').clear();
    cy.get('[data-testid="signup-username"]').type("aannshgtreartyui765479");
    cy.get('[data-testid="signup-password"]').click();
    cy.get('[data-testid="signup-user-error"]').should(
      "have.text",
      "userName must be at most 20 characters"
    );
    cy.log("rejects short password");
    cy.get('[data-testid="signup-password"]').clear();
    cy.get('[data-testid="signup-password"]').type("kjhgtry");
    cy.get('[data-testid="signup-username"]').click();
    cy.get('[data-testid="signup-password-error"]').should(
      "have.text",
      "Too short!"
    );
    cy.log("rejects long password");
    cy.get('[data-testid="signup-password"]').clear();
    cy.get('[data-testid="signup-password"]').type("hgtrfgtretgtyujhytr");
    cy.get('[data-testid="signup-username"]').click();
    cy.get('[data-testid="signup-password-error"]').should(
      "have.text",
      "Too long!"
    );
    cy.log("rejects if passwords missmatched");
    cy.get('[data-testid="signup-password"]').clear();
    cy.get('[data-testid="signup-confirm"]').clear();
    cy.get('[data-testid="signup-password"]').type("11221122");
    cy.get('[data-testid="signup-confirm"]').type("11221127");
    cy.get('[data-testid="signup-username"]').click();
    cy.get('[data-testid="signup-confirm-error"]').should(
      "have.text",
      "Passwords must match!"
    );
  });

  it("accepts a valid credentials", () => {
    cy.intercept("POST", "/user/register").as("registerUser");

    cy.get('[data-testid="signup-tab"]').click();
    cy.log("clicked signup tab");
    cy.get('[data-testid="signup-form"]').should("exist");
    cy.log("signup form exists");
    cy.get('[data-testid="signup-username"]').type(`${user.userName}${Math.floor(Math.random()*10000)}`);
    cy.get('[data-testid="signup-password"]').type(user.password);
    cy.get('[data-testid="signup-confirm"]').type(`${user.password}{enter}`);
    // cy.get('[data-testid="signup-submit"]').click();
    // cy.get('[data-testid="signup-submit"]').should("be.disabled");
    cy.wait("@registerUser", {timeout:5000}).then(({ response }) => {
      cy.writeFile("cypress.env.json",{
       
          user:response.body.userName,
          password:user.password
       
      },{
        flag: 'w'
      })
     
      expect(response.statusCode).to.eq(201);
    });
    cy.contains("Signed up successfully...");
    
  })
  
  
});
