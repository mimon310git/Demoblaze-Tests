import { expect } from "@playwright/test";

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartLink = page.getByRole("link", { name: "Add to cart" });
    this.price = page.locator("h3.price-container");
    this.descriptionLabel = page.locator("strong", {
      hasText: "Product description",
    });
  }

  heading(name) {
    return this.page.getByRole("heading", { name, exact: true });
  }

  async expectDetailsVisible(name, priceText) {
    await expect(this.heading(name)).toBeVisible({ timeout: 15000 });
    await expect(this.descriptionLabel).toBeVisible({ timeout: 15000 });
    if (priceText) {
      await expect(this.price).toContainText(priceText, { timeout: 15000 });
    }
    await expect(this.addToCartLink).toBeVisible({ timeout: 15000 });
  }

  async addToCartAndAcceptDialog(expectedMessage = "Product added") {
    const dialogMessagePromise = new Promise((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });

    await this.addToCartLink.click();
    const message = await dialogMessagePromise;

    if (expectedMessage) {
      await expect(message).toContain(expectedMessage);
    }

    return message;
  }
}