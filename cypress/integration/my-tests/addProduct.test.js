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
  it("add product button should exists in the product page", function () {});

  it("should have the product table page", function () {
    cy.contains("Add Product");
  });
  it("should open the add product modal", function () {
    cy.contains("Add Product").click();
    cy.contains("Category Id");
  });
  it("check validation", function () {
    cy.contains("Add Product").click();
    cy.get("#add-product-name").type("my");
    cy.get("#add-product-categoryId-input").type(25);
    cy.get("#add-product-categoryName").type("my");
    cy.get("#add-product-unitPrice-inp").type(25.66);
    cy.contains("Must be at least 5 characters")
  });
  it("add a product", function () {
    cy.contains("Add Product").click();
    cy.get("#add-product-name").type("my demo product"+Math.ceil(Math.random()*3000));
    cy.get("#add-product-categoryId-input").type(Math.ceil(Math.random()*3000));
    cy.get("#add-product-categoryName").type("demo category");
    cy.get("#add-product-unitPrice-inp").type(Math.ceil(Math.random()*3000));
    
    
    if(Math.ceil(Math.random()*10)%2){
      cy.get("#add-product-status-inp").select("available")
    }else{
      cy.get("#add-product-status-inp").select("discontinued")
    }
    
    cy.contains("Save").click()
    cy.contains("Saved product successfully...")
  });
});
