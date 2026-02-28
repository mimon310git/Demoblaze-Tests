/**
 * Regression test names
 * TC-RG-05 Open and close account modals
 */

import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Auth modals", () => {
  test("TC-RG-05 Open and close account modals", async ({ page }) => {
    await page.goto(testData.baseURL);

    await page.getByRole("link", { name: "Log in" }).click();
    await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
    await page.locator("button.btn.btn-secondary:visible").click();
    await expect(
      page.getByRole("heading", { name: "Log in" }),
    ).not.toBeVisible();

    await page.getByRole("link", { name: "Sign up" }).click();
    await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
    await page.locator("button.btn.btn-secondary:visible").click();
    await expect(
      page.getByRole("heading", { name: "Sign up" }),
    ).not.toBeVisible();
  });
});
