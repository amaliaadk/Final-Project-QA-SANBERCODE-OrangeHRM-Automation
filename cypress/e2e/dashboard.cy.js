import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import data from "../fixtures/loginData.json";
import dashboardData from "../fixtures/dashboardData.json";

describe("Dashboard - Directory Feature", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertDashboard();

    DashboardPage.waitDashboardReady();

    DashboardPage.clickMenuDirectory();
    DashboardPage.assertDirectoryPage();
  });

  it("DS01 - Open Directory page", () => {
    cy.url().should("include", "/directory");
    cy.contains("Directory").should("be.visible");
  });

  it("DS02 - Search employee exists", () => {
    cy.intercept("GET", "**/api/v2/directory/employees**").as("dirReq");
    DashboardPage.searchEmployee(dashboardData.searchEmployee);
    cy.wait("@dirReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    DashboardPage.assertEmployeeListed(dashboardData.searchEmployee);
  });

  it("DS03 - Search employee not found", () => {
    cy.intercept("GET", "**/api/v2/directory/employees**").as("dirReq");
    DashboardPage.searchEmployee(dashboardData.searchNotFound);
    cy.wait("@dirReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    DashboardPage.assertNoRecords();
  });

  it("DS04 - Search tanpa input apapun", () => {
    DashboardPage.clickSearch();
    DashboardPage.assertNoRecords();
  });
});
