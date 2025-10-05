import LoginPage from "../pages/LoginPage";
import data from "../fixtures/loginData.json";

describe("Login Feature - OrangeHRM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC01 - Login dengan username & password valid", () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    cy.wait("@loginReq").then((interception) => {
      expect([200, 302]).to.include(interception.response.statusCode);
    });
    LoginPage.assertDashboard();
  });

  it("TC02 - Login gagal dengan password salah", () => {
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(data.invalidPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC03 - Login gagal dengan username salah", () => {
    LoginPage.enterUsername(data.invalidUsername);
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it("TC04 - Username kosong", () => {
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    cy.wait(500);
    LoginPage.assertRequiredField();
  });

  it("TC05 - Password kosong", () => {
    LoginPage.enterUsername(data.validUsername);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC06 - Username & Password kosong", () => {
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC07 - Login valid dengan Enter key (shortcut)", () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(`${data.validPassword}{enter}`);
    cy.wait("@loginReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    LoginPage.assertDashboard();
  });

  it("TC08 - Login gagal dengan input spasi saja", () => {
    LoginPage.enterUsername(data.space);
    LoginPage.enterPassword(data.space);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it("TC09 - Input panjang karakter", () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.longUser);
    LoginPage.enterPassword(data.longPass);
    LoginPage.clickLogin();
    cy.wait("@loginReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    LoginPage.assertInvalidCredentials();
  });

  it("TC10 - Username case sensitive (admin vs Admin)", () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.validUsername.toLocaleLowerCase());
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    cy.wait("@loginReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    LoginPage.assertDashboard();
  });
});
