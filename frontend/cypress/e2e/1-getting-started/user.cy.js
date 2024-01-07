/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

/// <reference types="cypress" />

describe("User Authentication", () => {
  const url = "http://localhost:4200";

  beforeEach(() => {
    cy.visit(url);
  });

  it("should register a new user", () => {
    cy.contains("Register").click();
    cy.get('input[name="username"]').type("masih");
    cy.get('input[name="email"]').type("jikamemang@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.wait(100);
    cy.get("#form-register").submit();
    cy.log("Register successful");
    cy.wait(150);
  });

  it("should log in an existing user", () => {
    cy.contains("Login").click();
    cy.get('input[name="username"]').type("fauzan");
    cy.get('input[name="password"]').type("password");
    cy.wait(100);
    cy.get("#form-login").submit();
    cy.get("#form-login").submit();
    cy.get("#form-login").submit();
    cy.log("Login successful");
  });
});

describe("User Login and Blog Creation", () => {
  const url = "http://localhost:4200";

  beforeEach(() => {
    cy.visit(url);
  });

  it("should log in a user and create a blog post", () => {
    cy.contains("Login").click();
    cy.get('input[name="username"]').type("fauzan");
    cy.get('input[name="password"]').type("password");
    cy.wait(100);
    cy.get("#form-login").submit();
    cy.get("#form-login").submit();
    cy.get("#form-login").submit();
    cy.wait(100);
    cy.log("Login successful");
    cy.contains("Create").click();
    cy.get("input[name='title']").type("Hello World");
    cy.get("input[name='description']").type("Hello World");
    cy.get("input[type=file]")
      .invoke("show")
      .selectFile("cypress/fixtures/img1.png");

    cy.get("#form-blog").submit();
    cy.log("Blog post created successfully");
  });
});
