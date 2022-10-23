describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("correctly adds a functional counter and test responsiveness", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-tab__label").contains("Sign In").should("be.visible");
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
    cy.get(".q-card__actions").find("button").should("be.visible");
    for (let i = 0; i < max; i++) {
      cy.get(".increment").find("button").click();
    }
    cy.get(".counternumber").find("input").should("have.value", max);
    cy.get(".save").find("button").click();
    cy.get(".counternumber").find("button").click();
    cy.get(".counternumber").find("input").should("have.value", 0);
    cy.get(".load").find("button").click();
    cy.get(".counternumber").find("input").should("have.value", max);

    //begin the responsiveness test
    cy.get(`.newcounter`).find("button").should("be.visible");
    cy.get(`.q-field__control`).find("input").should("be.visible");
    cy.get(`.increment`).find("button").should("be.visible");
    cy.get(`.save`).find("button").should("be.visible");
    cy.get(`.load`).find("button").should("be.visible");
    cy.get(`.counternumber`).find("input").should("be.visible");
    cy.get(`.deletecounter`).find("button").should("be.visible");
    //end the responsiveness test

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

  it("should import from a created counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    cy.get(".q-tab__label").contains("Sign In").click();
    cy.get(".q-tab__label").contains("Sign In").should("be.visible");
    cy.get(".q-field__control-container")
      .find('[type="Email"]')
      .type("nenage1064@24rumen.com");
    cy.get(".q-field__control-container")
      .find('[type="Password"]')
      .type("testtest");
    cy.get(".full-width").find('[type="submit"]').click();
    cy.get(".newcounter").find("button").click();
    cy.get(".createcounternameinput").find("input").type("A");
    cy.get(".q-card__actions").find("button").click();
    cy.get(".q-card__actions").find("button").should("be.visible");
    for (let i = 0; i < max; i++) {
      cy.get(".increment").find("button").click();
    }
    cy.get(".syncwithserver").find("button").click();
    cy.get(".sharecounter").find("button").click();
    //put the counter id in a variable here to import it later
  });
});

/* nenage1064@24rumen.com:testtest */
/* caladil264@24rumen.com:test2test2 */
