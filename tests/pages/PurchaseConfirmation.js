import { expect } from "@playwright/test";

export class PurchaseConfirmation {
  constructor(page) {
    this.page = page;
    this.modal = page.locator(".sweet-alert");
    this.okButton = this.modal.getByRole("button", { name: "OK" });
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible({ timeout: 15000 });
  }

  async expectThankYou() {
    await expect(this.modal).toContainText("Thank you for your purchase!", { timeout: 15000 });
  }

  async expectDetails(text) {
    await expect(this.modal).toContainText(text, { timeout: 15000 });
  }

  async confirm() {
    await this.okButton.click();
  }
}