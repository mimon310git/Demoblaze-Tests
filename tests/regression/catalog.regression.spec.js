/**
 * Regression test names
 * TC-RG-04 Category switching updates grid
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test("TC-RG-04 Category switching updates grid", async ({ page }) => {
  await page.goto(testData.baseURL);

  const products = page.locator(".card-title a");

  await page.getByRole("link", { name: testData.categories.phones }).click();
  await expect(products.first()).toHaveText(testData.products.phonePrimary);
  let names = (await products.allTextContents()).map((t) => t.trim());
  expect(names).toContain(testData.products.phonePrimary);
  expect(names).not.toContain(testData.products.laptopPrimary);

  await page.getByRole("link", { name: testData.categories.laptops }).click();
  await expect(products.first()).toHaveText(testData.products.laptopPrimary);
  names = (await products.allTextContents()).map((t) => t.trim());
  expect(names).toContain(testData.products.laptopPrimary);
  expect(names).not.toContain(testData.products.phonePrimary);

  await page.getByRole("link", { name: testData.categories.monitors }).click();
  await expect(products.first()).toBeVisible();
  names = (await products.allTextContents()).map((t) => t.trim());
  expect(names).not.toContain(testData.products.phonePrimary);
});
