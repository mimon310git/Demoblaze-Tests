/**
 * Smoke test names
 * TC-SM-03 Open product detail
 * TC-SM-04 Add product to cart
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Product cart", () => {
  test("TC-SM-03 Open product detail", async ({ page }) => {
    await page.goto(testData.baseURL);

    await page
      .getByRole("link", { name: testData.products.laptopPrimary })
      .click();
    await expect(
      page.getByRole("heading", { name: testData.products.laptopPrimary }),
    ).toBeVisible();
    await expect(
      page.locator("strong", { hasText: "Product description" }),
    ).toBeVisible();
    await expect(page.locator("h3.price-container")).toContainText("$790");
    await expect(page.getByRole("link", { name: "Add to cart" })).toBeVisible();
  });
});

test("TC-SM-04 Add product to cart", async ({ page }) => {
  await page.goto(testData.baseURL);

  await page.getByRole("link", { name: testData.products.laptopPrimary }).click();
  const dialogPromise = page.waitForEvent("dialog");
  await page.getByRole("link", { name: "Add to cart" }).click();

  const dialog = await dialogPromise;
  expect(dialog.message()).toContain("Product added");
  await dialog.accept();
});
