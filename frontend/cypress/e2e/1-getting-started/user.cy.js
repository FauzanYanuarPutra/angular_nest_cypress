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

describe("User Actions", () => {
  const url = "http://localhost:4200";
  const backendBaseUrl = "http://localhost:5000";

  beforeEach(() => {
    cy.visit(url);
  });

  it("should register a new user, log in, and create a blog post", () => {
    // Membuat User Baru
    cy.log("Register new user");
    cy.contains("Register").click();
    cy.get('input[name="username"]').type("muhammad-fauzan");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("password");
    cy.intercept("POST", `${backendBaseUrl}/auth/register`).as(
      "registerRequest"
    );
    cy.get("#form-register").submit();
    cy.wait("@registerRequest");
    cy.log("Register successful");

    cy.wait(2000);

    // Logout Account
    cy.log("Logout Account");
    cy.get("[data-cy=logout-button]").click();
    cy.log("Logout successful");

    cy.wait(2000);

    // Login dengan username dan password yang tidak terdaftar
    cy.log("Login with wrong credentials");
    cy.intercept("POST", `${backendBaseUrl}/auth/login`).as("loginRequest");
    cy.contains("Login").click();
    cy.get('input[name="username"]').type("fauzan");
    cy.get('input[name="password"]').type("password");
    cy.get("#form-login").submit();
    cy.wait("@loginRequest");
    cy.log("Login failed");

    cy.wait(2000);

    // Login dengan username dan password yang benar
    cy.log("Login with correct credentials");
    cy.intercept("POST", `${backendBaseUrl}/auth/login`).as("loginRequest");
    cy.contains("Login").click();
    cy.get('input[name="username"]').clear().type("muhammad-fauzan");
    cy.get('input[name="password"]').clear().type("password");
    cy.get("#form-login").submit();
    cy.wait("@loginRequest");
    cy.log("Login successful");

    cy.wait(2000);

    // Melakukan posting blog dengan username dan password yang terdaftar
    cy.log("Create blog post");
    cy.intercept("POST", `${backendBaseUrl}/blogs`).as("createBlogRequest");
    cy.contains("Create").click();
    cy.get("input[name='title']").type("Hello World");
    cy.get("input[name='description']").type("Hello World");
    cy.get("input[type=file]")
      .invoke("show")
      .selectFile("cypress/fixtures/img1.png");
    cy.get("#form-blog").submit();
    cy.wait("@createBlogRequest");
    cy.log("Blog post created successfully");

    cy.wait(2000);

    // Melakukan edit blog
    cy.log("Edit blog post");
    cy.get('.bg-green-500:contains("Edit"):first').click();
    cy.url().then((url) => {
      const urlParts = url.split("/");
      const lastItem = urlParts[urlParts.length - 1];
      cy.intercept("PATCH", `${backendBaseUrl}/blogs/${lastItem}`).as(
        "updateBlogRequest"
      );
      cy.log(`Blog ID: ${lastItem}`);
    });

    cy.url().should("include", "/dashboard/edit");
    cy.get("input[name='title']").clear().type("Edit Title");
    cy.get("input[name='description']").clear().type("Edit Description");
    cy.get("input[type=file]")
      .invoke("show")
      .selectFile("cypress/fixtures/img2.png");
    cy.get("#form-blog").submit();
    cy.wait("@updateBlogRequest");
    cy.log("Blog post edited successfully");

    // Melakukan delete blog
    cy.log("Delete blog post");
    cy.get('.bg-red-500:contains("Delete"):first').click();
    cy.log("Blog post deleted successfully");
  });
});
