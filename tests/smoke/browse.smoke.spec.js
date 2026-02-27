/**
 * Smoke test names
 * TC-SM-01 Home page loads categories and products
 * TC-SM-02 Filter by laptops
 */
import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Browse", () => {
  test("TC-SM-01 Home page categories + products list", async ({ page }) => {
    await page.goto(testData.baseURL);

    await expect(page.getByRole("link", { name: "Phones" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Laptops" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Monitors" })).toBeVisible();

    const products = page.locator(".card-title a");
    await expect(products.first()).toBeVisible(); // wait on UI element
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    const productNames = (await products.allTextContents()).map((n) =>
      n.trim(),
    );
    productNames.forEach((name, i) => console.log(`${i + 1}. ${name}`));

    expect(productNames).toContain("Samsung galaxy s6");
    expect(productNames).toContain("Sony vaio i5");
  });

  test("TC-SM-02 Filter by laptops", async ({ page }) => {
    await page.goto(testData.baseURL);

    const products = page.locator(".card-title a");
    await expect(products.first()).toHaveText("Samsung galaxy s6"); // baseline on home

    await page.getByRole("link", { name: "Laptops" }).click();

    // wait until filter is applied
    await expect(products.first()).toHaveText("Sony vaio i5");
    await expect(
      page.locator(".card-title a", { hasText: "Samsung galaxy s6" }),
    ).toHaveCount(0);

    const names = (await products.allTextContents()).map((t) => t.trim());
    console.log("Laptops:", names);

    expect(names).toContain("Sony vaio i5");
    expect(names).not.toContain("Samsung galaxy s6");
  });
});
