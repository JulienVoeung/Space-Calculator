describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("correctly adds a functional counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("nenage1064@24rumen.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("testtest");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.get(".newcounter").find("button").click();
    cy.get(".q-field__control").find("input").type("A");
    cy.get(".q-card__actions").find("button").click();
    for (let i = 0; i < max; i++) {
      cy.get(".increment").find("button").click();
    }
    cy.get(".counternumber").find("input").should("have.value", max);
    cy.get(".save").find("button").click();
    cy.get(".counternumber").find("button").click();
    cy.get(".counternumber").find("input").should("have.value", 0);
    cy.get(".load").find("button").click();
    cy.get(".counternumber").find("input").should("have.value", max);
    cy.get(".deletecounter").find("button").click();
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
    cy.get(".import").find("button").click();
    cy.get(".inputcounterid")
      .find("input")
      .type("484596c2-ea07-44b3-8c77-302fa678a26d");
    cy.get(".validatecounterid").find("button").click();
    cy.get(".counternumber").find("input").should("have.value", 12);
  });
});

/* nenage1064@24rumen.com:testtest */
/* caladil264@24rumen.com:test2test2 */
