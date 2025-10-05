// POM

class DashboardPage {
  directoryMenu = "a.oxd-main-menu-item[href*='directory']";
  searchInput = "input[placeholder='Type for hints...']";
  searchBtn = "button[type='submit']";
  employeeCard =
    ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-directory-card";

  waitDashboardReady() {
    cy.get("aside.oxd-sidepanel", { timeout: 15000 }).should("be.visible");
    cy.get("a.oxd-main-menu-item[href*='dashboard']").should("be.visible");
  }

  clickMenuDirectory() {
    this.waitDashboardReady(); /
    cy.get(this.directoryMenu, { timeout: 10000 }).should("be.visible").click();
  }

  assertDirectoryPage() {
    cy.url().should("include", "/directory");
    cy.contains("Directory").should("be.visible");
  }

  searchEmployee(name) {
    cy.get(this.searchInput, { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(name);
    cy.get(this.searchBtn).click();
  }

  assertEmployeeListed(name) {
    cy.wait(1000);
    cy.contains(this.employeeCard, name, { matchCase: false }).should(
      "be.visible"
    );
  }

  clickSearch() {
    cy.get(this.searchBtn).click();
  }

  assertNoRecords() {
    cy.contains("No Records Found", { timeout: 10000 }).should("be.visible");
  }
}

export default new DashboardPage();
