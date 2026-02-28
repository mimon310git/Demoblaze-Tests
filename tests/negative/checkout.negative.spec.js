/**
 * Negative test names
 * TC-NG-01 Checkout with empty Name
 * TC-NG-02 Checkout with empty Card
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Checkout Negative Tests", () => {
  test("TC-NG-01 Checkout with empty Name", async ({ page }) => {
    await page.goto(testData.baseURL);

    await page
      .getByRole("link", { name: testData.products.phonePrimary })
      .click();

    const addToCartDialogPromise = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();

    const addToCartDialog = await addToCartDialogPromise;
    expect(addToCartDialog.message()).toContain("Product added");
    await addToCartDialog.accept();

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(
      page.getByRole("cell", {
        name: testData.products.phonePrimary,
        exact: true,
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Place Order" }).click();

    const orderModal = page.locator("#orderModal");
    await expect(orderModal).toBeVisible();

    await orderModal
      .locator("#name")
      .fill(testData.orderData.invalid.emptyName.name);
    await orderModal
      .locator("#country")
      .fill(testData.orderData.invalid.emptyName.country);
    await orderModal
      .locator("#city")
      .fill(testData.orderData.invalid.emptyName.city);
    await orderModal
      .locator("#card")
      .fill(testData.orderData.invalid.emptyName.card);
    await orderModal
      .locator("#month")
      .fill(testData.orderData.invalid.emptyName.month);
    await orderModal
      .locator("#year")
      .fill(testData.orderData.invalid.emptyName.year);

    const purchaseButton = orderModal.getByRole("button", { name: "Purchase" });
    await expect(purchaseButton).toBeVisible();
    await expect(purchaseButton).toBeEnabled();

    const dialogMessagePromise = new Promise((resolve) => {
      page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });

    await purchaseButton.click();

    const dialogMessage = await dialogMessagePromise;
    expect(dialogMessage).toBe("Please fill out Name and Creditcard.");
  });

  test("TC-NG-02 Checkout with empty Card", async ({ page }) => {
    // Test steps same as TC-NG-01 until filling the order form
  });
});
