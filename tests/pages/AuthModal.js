import { expect } from "@playwright/test";

export class AuthModal {
  constructor(page) {
    this.page = page;
    this.loginHeading = page.getByRole("heading", { name: "Log in" });
    this.signUpHeading = page.getByRole("heading", { name: "Sign up" });
  }

  async expectLoginVisible() {
    await expect(this.loginHeading).toBeVisible();
  }

  async expectSignUpVisible() {
    await expect(this.signUpHeading).toBeVisible();
  }

  async expectLoginHidden() {
    await expect(this.loginHeading).not.toBeVisible();
  }

  async expectSignUpHidden() {
    await expect(this.signUpHeading).not.toBeVisible();
  }

  async closeVisibleModal() {
    await this.page.locator("button.btn.btn-secondary:visible").click();
  }

  async submitLogin(username, password) {
    await this.page.locator("#loginusername").fill(username);
    await this.page.locator("#loginpassword").fill(password);

    const dialogMessagePromise = new Promise((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });

    await this.page.getByRole("button", { name: "Log in" }).click();
    return dialogMessagePromise;
  }

  async submitSignUp(username, password) {
    await this.page.getByRole("textbox", { name: "Username:" }).fill(username);
    await this.page.getByRole("textbox", { name: "Password:" }).fill(password);

    const dialogMessagePromise = new Promise((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });

    await this.page.getByRole("button", { name: "Sign up" }).click();
    return dialogMessagePromise;
  }
}
