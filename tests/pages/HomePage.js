import { expect } from "@playwright/test";
import testData from "../../features/testData.json";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.productLinks = page.locator("#tbodyid .card-title a");
  }

  async goto() {
    await this.page.goto(testData.baseURL);
    await this.expectProductGridVisible();
  }

  categoryLink(name) {
    return this.page.getByRole("link", { name, exact: true });
  }

  productLink(name) {
    return this.productLinks.filter({ hasText: name });
  }

  async expectCategoriesVisible() {
    await expect(this.categoryLink(testData.categories.phones)).toBeVisible({ timeout: 15000 });
    await expect(this.categoryLink(testData.categories.laptops)).toBeVisible({ timeout: 15000 });
    await expect(this.categoryLink(testData.categories.monitors)).toBeVisible({ timeout: 15000 });
  }

  async expectProductGridVisible() {
    await expect(this.productLinks.first()).toBeVisible({ timeout: 15000 });
  }

  async getProductNames() {
    return (await this.productLinks.allTextContents()).map((name) => name.trim());
  }

  async openProduct(name) {
    const product = this.productLink(name).first();
    await expect(product).toBeVisible({ timeout: 15000 });
    await Promise.all([
      this.page.waitForURL("**/prod.html*", { timeout: 15000 }),
      product.click(),
    ]);
  }

  async selectCategory(name) {
    await this.categoryLink(name).click();
  }

  async expectProductVisible(name) {
    await expect(this.productLink(name)).toHaveCount(1, { timeout: 15000 });
  }

  async expectProductNotVisible(name) {
    await expect(this.productLink(name)).toHaveCount(0, { timeout: 15000 });
  }

  async openCart() {
    await Promise.all([
      this.page.waitForURL("**/cart.html", { timeout: 15000 }),
      this.page.getByRole("link", { name: "Cart", exact: true }).click(),
    ]);
  }

  async openLogin() {
    await this.page.getByRole("link", { name: "Log in" }).click();
  }

  async openSignUp() {
    await this.page.getByRole("link", { name: "Sign up" }).click();
  }
}