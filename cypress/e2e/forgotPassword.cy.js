import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import data from "../fixtures/forgotPasswordData.json";

describe("Forgot Password Feature", () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.url().should("include", "auth/login");
  });

  it("FP01 - Click forgot password link", () => {
    ForgotPasswordPage.clickForgotPassword();
    ForgotPasswordPage.assertResetPage();
  });

  it("FP02 - Reset password dengan username valid", () => {
    ForgotPasswordPage.clickForgotPassword();
    ForgotPasswordPage.assertResetPage();

    cy.intercept("POST", "**/auth/requestPasswordResetCode", {
      statusCode: 200,
      body: { message: "Reset link sent" },
    }).as("resetReq");

    ForgotPasswordPage.enterUsername(data.validUsername);
    ForgotPasswordPage.clickReset();

    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Reset Password link has been sent");

    cy.wait(1000);

    // cy.wait("@resetReq").its("response.statusCode").should("eq", 200);
    // ForgotPasswordPage.assertSuccessMsg();
  });

  it("FP03 - Reset password dengan username invalid", () => {
    ForgotPasswordPage.clickForgotPassword();
    ForgotPasswordPage.assertResetPage();
    cy.intercept("POST", "**/auth/requestPasswordResetCode").as("resetReq");
    ForgotPasswordPage.enterUsername(data.invalidUsername);
    ForgotPasswordPage.clickReset();

    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text")
      .should("be.visible")
      .and("contain", "Reset Password link has been sent");

    cy.wait(1000);

    // cy.wait("@resetReq").its("response.statusCode").should("eq", 200);
    // ForgotPasswordPage.assertSuccessMsg();
  });

  it("FP04 - Cancel reset password", () => {
    ForgotPasswordPage.clickForgotPassword();
    ForgotPasswordPage.assertResetPage();
    ForgotPasswordPage.clickCancel();
    cy.url().should("include", "auth/login");
  });

  it("FP05 - Reset password dengan username kosong", () => {
    ForgotPasswordPage.clickForgotPassword();
    ForgotPasswordPage.assertResetPage();
    ForgotPasswordPage.clickReset();
    ForgotPasswordPage.assertRequiredField();
  });
});

// FP 2, 3 MASIH ERROR
