class ForgotPasswordPage {
  // Locator
  forgotLink = "p.orangehrm-login-forgot-header a";
  resetTitle = "h6.oxd-text--h6.orangehrm-forgot-password-title";
  usernameField = "input[name='username']";
  resetBtn = "button[type='submit']";
  cancelBtn = "button.oxd-button--ghost";
  successMsg = ".oxd-text.oxd-text--p.oxd-alert-content-text";
  requiredMsg = ".oxd-input-field-error-message";

  // Action
  clickForgotPassword() {
    cy.contains("Forgot your password?")
      .should("exist")
      .should("be.visible")
      .click();
  }

  enterUsername(username) {
    cy.get(this.usernameField).clear().type(username);
  }

  clickReset() {
    cy.get(this.resetBtn).click();
  }

  clickCancel() {
    cy.get(this.cancelBtn).click();
  }

  // Assertion
  assertResetPage() {
    cy.get(this.resetTitle).should("contain", "Reset Password");
  }

  assertSuccessMsg() {
    cy.get(this.successMsg).should("be.visible");
  }

  assertRequiredField() {
    cy.get(this.requiredMsg).should("contain", "Required");
  }
}
export default new ForgotPasswordPage();

