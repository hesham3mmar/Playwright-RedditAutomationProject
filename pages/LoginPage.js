import { loginLocators } from '../locators/login-locators.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.firstLoginButton = page.locator(loginLocators.firstLoginButton);
    this.usernameInput = page.locator(loginLocators.username);
    this.passwordInput = page.locator(loginLocators.password);
    this.secondLoginButton = page.locator(loginLocators.secondLoginButton);
  }

  async navigate() {
    await this.page.goto('https://reddit.com');
    await this.page.waitForLoadState('networkidle');
  }

  async clickFirstLoginButton() { 
    await this.firstLoginButton.click();
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSecondLoginButton() {
    await this.secondLoginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.clickFirstLoginButton();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSecondLoginButton();
  }
}
