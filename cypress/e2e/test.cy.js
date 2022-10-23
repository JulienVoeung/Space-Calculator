describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  // WARNING: ALL COUNTERS FROM TEST ACCOUNTS MUST BE DELETED BEFORE TO RUN TESTS

  /* nenage1064@24rumen.com:testtest */
  /* caladil264@24rumen.com:test2test2 */

  it("correctly adds a functional counter and test responsiveness", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("nenage1064@24rumen.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("testtest");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.get('[data-cy="newCounter"]').click();
    cy.get('[data-cy="newCounterInput"]').type("A");
    cy.get('[data-cy="newCounterInputValidate"]').click();
    for (let i = 0; i < max; i++) {
      cy.get('[data-cy="increment"]').click();
    }
    cy.get('[data-cy="input"]').should("have.value", max);
    cy.get('[data-cy="saveToLocal"]').click();
    cy.get('[data-cy="reset"]').click();
    cy.get('[data-cy="input"]').should("have.value", 0);
    cy.get('[data-cy="loadFromLocal"]').click();
    cy.get('[data-cy="input"]').should("have.value", max);

    //begin the responsiveness test
    const platforms = ["ipad-mini", "iphone-x", "macbook-16", "samsung-s10"];
    platforms.forEach((platform) => {
      cy.viewport(`${platform}`);
      cy.get('[data-cy="newCounter"]').should("be.visible");
      cy.get('[data-cy="newCounter"]').click();
      cy.get('[data-cy="newCounterInputValidate"]').should("be.visible");
      cy.get('[data-cy="newCounterInput"]').type("A").should("be.visible");
      cy.get('[data-cy="newCounterInputValidate"]').should("be.visible");
      cy.get('[data-cy="newCounterInputValidate"]').click();
      cy.get('[data-cy="saveToLocal"]').should("be.visible");
      cy.get('[data-cy="loadFromLocal"]').should("be.visible");
      cy.get('[data-cy="input"]').should("be.visible");
      cy.get('[data-cy="deleteCounter"]').should("be.visible");
    });
    //end the responsiveness test

    cy.get('[data-cy="deleteCounter"]').click();
  });

  it("correctly import a counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("nenage1064@24rumen.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("testtest");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.get('[data-cy="importCounter"]').click();
    cy.get('[data-cy="importCounterInput"]').type(
      "484596c2-ea07-44b3-8c77-302fa678a26d"
    );
    cy.get('[data-cy="importCounterInputValidate"]').click();
    cy.get('[data-cy="input"]').should("have.value", 12);

    cy.get('[data-cy="deleteCounter"]').click();
  });

  it("test where authentification failed", () => {
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("lionelrakotoarisoa@gmail.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("prout");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.url().should("be.equals", "http://localhost:9000/signInPage");
  });

  it("test where authentification validate", () => {
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("lionelrakotoarisoa@gmail.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("prout69latrik");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.url().should("be.equals", "http://localhost:9000/");
  });
});
