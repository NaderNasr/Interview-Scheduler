/* eslint-disable no-undef */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it('should navigate to Tuesday', () => {
    cy.get("li").contains("Tuesday")
    cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)").click()
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });

});
