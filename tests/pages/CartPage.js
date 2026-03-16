import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.total = page.locator("#totalp");
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
  }

  productCell(name) {
    return this.page.getByRole("cell", { name, exact: true });
  }

  productRow(name) {
    return this.page.locator("#tbodyid tr").filter({ hasText: name });
  }

  async expectProductVisible(name) {
    await expect(this.productCell(name)).toBeVisible({ timeout: 15000 });
  }

  async expectProductMissing(name) {
    await expect(this.productCell(name)).toHaveCount(0, { timeout: 15000 });
  }

  async getTotalText() {
    return this.total.textContent();
  }

  async deleteProduct(name) {
    await this.productRow(name).getByRole("link", { name: "Delete", exact: true }).click();
  }

  async expectTotalChanged(previousTotal) {
    await expect(this.total).not.toHaveText(previousTotal ?? "", { timeout: 15000 });
  }

  async openPlaceOrder() {
    await this.placeOrderButton.click();
  }
}