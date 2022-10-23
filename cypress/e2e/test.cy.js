describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("correctly adds a functional counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("lionelrakotoarisoa@gmail.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("prout69latrik");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.get(".newcounter").find("button").click();
    cy.get(".q-field__control").find("input").type("A");
    cy.get(".q-card__actions").find("button").click();
    for (let i = 0; i < max; i++) {
      cy.get(".increment").find("button").click();
    }
    cy.get(".q-field__control-container")
      .find("input")
      .should("have.value", max);
    cy.get(".save").find("button").click();
    cy.get(".q-field__control-container").find("button").click();
    cy.get(".q-field__control-container").find("input").should("have.value", 0);
    cy.get(".load").find("button").click();
    cy.get(".q-field__control-container")
      .find("input")
      .should("have.value", max);
  });
});
