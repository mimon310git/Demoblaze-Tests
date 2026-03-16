import { expect } from "@playwright/test";

export class OrderModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator("#orderModal");
    this.purchaseButton = this.modal.getByRole("button", { name: "Purchase" });
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible({ timeout: 15000 });
  }

  async fill(orderData) {
    await this.modal.locator("#name").fill(orderData.name);
    await this.modal.locator("#country").fill(orderData.country);
    await this.modal.locator("#city").fill(orderData.city);
    await this.modal.locator("#card").fill(orderData.card);
    await this.modal.locator("#month").fill(orderData.month);
    await this.modal.locator("#year").fill(orderData.year);
  }

  async expectPurchaseEnabled() {
    await expect(this.purchaseButton).toBeVisible({ timeout: 15000 });
    await expect(this.purchaseButton).toBeEnabled({ timeout: 15000 });
  }

  async purchase() {
    await this.purchaseButton.click({ force: true });
  }

  async purchaseAndGetDialogMessage() {
    const dialogMessagePromise = new Promise((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });

    await this.purchaseButton.click({ force: true });
    return dialogMessagePromise;
  }

  async expectStillOpen() {
    await expect(this.modal).toBeVisible({ timeout: 15000 });
  }
}