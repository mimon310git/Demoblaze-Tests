/**
 * Smoke test names
 * TC-SM-05 Place order with valid data
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Checkout", () => {
  test("TC-SM-05 Place order with valid data", async ({ page }) => {
    await page.goto(testData.baseURL);

    await page
      .getByRole("link", { name: testData.products.phonePrimary })
      .click();
    const dialogPromise = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();

    // Go to cart and place order

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(
      page.getByRole("cell", {
        name: testData.products.phonePrimary,
        exact: true,
      }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Place Order" }).click();

    // Fill in order details
    await expect(
      page.locator("div[id='orderModal'] div[class='modal-header']"),
    ).toBeVisible();
    await page.locator("#name").fill(testData.orderData.valid.name);
    await page.locator("#country").fill(testData.orderData.valid.country);
    await page.locator("#city").fill(testData.orderData.valid.city);
    await page.locator("#card").fill(testData.orderData.valid.card);
    await page.locator("#month").fill(testData.orderData.valid.month);
    await page.locator("#year").fill(testData.orderData.valid.year);

    // Confirm purchase
    await page.getByRole("button", { name: "Purchase" }).click();

    // Verify order confirmation
    const confirmation = page.locator(".sweet-alert");
    await expect(confirmation).toBeVisible();
    const confirmationText = await confirmation.textContent();
    console.log("Order Confirmation:", confirmationText);
    expect(confirmationText).toContain("Thank you for your purchase!");
  });
});
