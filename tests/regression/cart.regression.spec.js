/**
 * Regression test names
 * TC-RG-01 Add two different products to cart
 * TC-RG-02 Delete one item and verify total update
 * TC-RG-03 Cart state after browser refresh
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

async function addProductToCart(page, productName) {
  await page.goto(testData.baseURL);
  await page.getByRole("link", { name: productName }).click();

  const dialogPromise = page.waitForEvent("dialog");
  await page.getByRole("link", { name: "Add to cart" }).click();
  const dialog = await dialogPromise;
  await dialog.accept();
}

async function addTwoProductsToCart(page) {
  await addProductToCart(page, testData.products.laptopPrimary);
  await addProductToCart(page, testData.products.phonePrimary);
}

test.describe("Cart regression tests", () => {
  test("TC-RG-01 Add two different products to cart", async ({ page }) => {
    await page.goto(testData.baseURL);

    await page.goto(testData.baseURL);

    await page
      .getByRole("link", { name: testData.products.laptopPrimary })
      .click();
    const dialogPromise = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Product added");
    await dialog.accept();
    await page.goto(testData.baseURL);

    await page
      .getByRole("link", { name: testData.products.phonePrimary })
      .click();
    const dialogPromise2 = page.waitForEvent("dialog");
    await page.getByRole("link", { name: "Add to cart" }).click();

    const dialog2 = await dialogPromise2;
    expect(dialog2.message()).toContain("Product added");
    await dialog2.accept();

    // Additional assertions can be added here to verify that both products are in the cart
    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(
      page.getByRole("cell", {
        name: testData.products.laptopPrimary,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("cell", {
        name: testData.products.phonePrimary,
        exact: true,
      }),
    ).toBeVisible();
  });

  test("TC-RG-02 Delete one item and verify total update", async ({ page }) => {
    await addTwoProductsToCart(page);
    await page.getByRole("link", { name: "Cart", exact: true }).click();

    const totalBefore = await page.locator("#totalp").textContent();

    const phoneRow = page.locator("#tbodyid tr").filter({
      hasText: testData.products.phonePrimary,
    });

    await phoneRow.getByRole("link", { name: "Delete", exact: true }).click();

    await expect(
      page.getByRole("cell", {
        name: testData.products.phonePrimary,
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      page.getByRole("cell", {
        name: testData.products.laptopPrimary,
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.locator("#totalp")).not.toHaveText(totalBefore ?? "");
  });

  test("TC-RG-03 Cart state after browser refresh", async ({ page }) => {
    await addProductToCart(page, testData.products.laptopPrimary);

    await page.getByRole("link", { name: "Cart", exact: true }).click();

    const productCell = page.getByRole("cell", {
      name: testData.products.laptopPrimary,
      exact: true,
    });

    await expect(productCell).toBeVisible();

    await page.reload();

    await expect(productCell).toBeVisible();
  });
});
