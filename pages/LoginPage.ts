import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly inputUserName: Locator;
  readonly inputUserPassword: Locator;
  readonly buttonSubmit: Locator;

  constructor(private readonly page: Page) {
    this.inputUserName = page.locator('[data-test="username"]');
    this.inputUserPassword = page.locator('[data-test="password"]');
    this.buttonSubmit = page.locator('[id="login-button"]');
  }

  async goToAuthPage(): Promise<void> {
    await this.page.goto("/");
  }
  async login(userName: string, password: string): Promise<void> {
    await this.page.goto("/");
    await this.inputUserName.fill(userName);
    await this.inputUserPassword.fill(password);
    await this.buttonSubmit.click();
  }
}
