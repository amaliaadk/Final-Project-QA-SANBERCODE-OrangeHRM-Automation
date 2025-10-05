class LoginPage {
  username = "//input[@name='username']";
  password = "//input[@name='password']";
  loginBtn = "//button[@type='submit']";
  forgotLink = "//p[contains(@class, 'oranghrm-login-forgot-header')]";
  alertInvalid = ".oxd-alert-content-text";
  validationMsg = ".oxd-input-group__message";

  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  enterUsername(val) {
    cy.xpath(this.username).type(val);
  }
  enterPassword(val) {
    cy.xpath(this.password).type(val);
  }
  clickLogin() {
    cy.xpath(this.loginBtn).click();
  }
  clickForgot() {
    cy.xpath(this.forgotLink).click();
  }

  assertDashboard() {
    cy.url().should("include", "/dashboard");
    cy.xpath("//h6[text()='Dashboard']").should("be.visible");
  }

  assertInvalidCredentials() {
    cy.get(this.alertInvalid)
      .should("be.visible")
      .and("contain", "Invalid credentials");
  }

  assertRequiredField() {
    cy.get(this.validationMsg).should("be.visible").and("contain", "Required");
  }
}

export default new LoginPage();
