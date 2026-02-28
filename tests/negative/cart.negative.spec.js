/**
 * Negative test names
 * TC-NG-05 Repeated Add to cart clicks
 */
import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Negative tests for cart functionality", () => {
  test("TC-NG-05 Repeated Add to cart clicks", async ({ page }) => {
    await page.goto(testData.baseURL);
    await page
      .getByRole("link", { name: testData.products.laptopPrimary })
      .click();

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.getByRole("link", { name: "Add to cart" }).click();
    await page.getByRole("link", { name: "Add to cart" }).click();

    await page.getByRole("link", { name: "Cart", exact: true }).click();

    await expect(
      page
        .getByRole("cell", {
          name: testData.products.laptopPrimary,
          exact: true,
        })
        .first(),
    ).toBeVisible();
  });
});
