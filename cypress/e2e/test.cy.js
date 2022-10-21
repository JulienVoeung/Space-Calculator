describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("test authentification failed", () => {
    cy.get("#RoutingTabs").find('[label="Sign In"]').click();
    cy.get("#SignInComponent")
      .find('[v-model="form.email"]')
      .type("lionelrakotoarisoa@gmail.com")
      .blur();
    cy.get("#SignInComponent")
      .find('[v-model="form.password"]')
      .type("prout69latrik!")
      .blur();
    cy.get("#SignInComponent").should("contain", "Invalid login credentials");
  });
  /*
  it("works on one counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    for (let i = 0; i < max; i++) {
      cy.get("#counter_A").find('[data-cy="btn-up"]').click();
    }
    cy.get("#counter_A").find('[data-cy="input"]').should("have.value", max);
  });

  it("works sum of two counters is correct", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      cy.get(`#counter_${letter}`).find('[data-cy="btn-up"]').click();
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", 1);
    });
    cy.get('[data-cy="total"]').should("have.text", 2);
  });

  it("should show an error", () => {
    cy.get("#counter_A").find('[data-cy="input"]').clear().type("AAA").blur();
    cy.get("#counter_A").should("contain", "Input must be a number");
  });

  it("Tests all resets buttons", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      let max2 = Math.floor(Math.random() * 19 + 1);
      for (let i = 0; i < max2; i++) {
        cy.get(`#counter_${letter}`).find('[data-cy="btn-up"]').click();
      }
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", max2);
    });
    letters.forEach((letter) => {
      cy.get(`#reset_${letter}`).click();
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", 0);
    });
  });

  it("Tests responsiveness", () => {
    const platforms = ["ipad-mini", "iphone-x", "macbook-16", "samsung-s10"];
    const letters = ["A", "B"];
    platforms.forEach((platform) => {
      cy.viewport(`${platform}`);
      letters.forEach((letter) => {
        cy.get(`#reset_${letter}`).should("be.visible");
        cy.get(`#counter_${letter}`).should("be.visible");
        cy.get(`#plus`).should("be.visible");
        cy.get(`#total`).should("be.visible");
      });
    });
  });

  it("Tests save and restore the value from local storage", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      let max3 = Math.floor(Math.random() * 19 + 1);
      for (let i = 0; i < max3; i++) {
        cy.get(`#counter_${letter}`).find('[data-cy="btn-up"]').click();
      }
      cy.get(`#save_${letter}`).click();
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", max3);
      cy.get(`#reset_${letter}`).click();
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", 0);
      cy.get(`#load_${letter}`).click();
      cy.get(`#counter_${letter}`)
        .find('[data-cy="input"]')
        .should("have.value", max3);
    });
  }); */
});
