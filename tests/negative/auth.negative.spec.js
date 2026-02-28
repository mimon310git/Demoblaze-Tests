/**
 * Negative test names
 * TC-NG-03 Login with invalid credentials
 * TC-NG-04 Sign up with already existing username
 */
import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";

test.describe("Negative Authentication Tests", () => {
  test("TC-NG-03 Login with invalid credentials", async ({ page }) => {
    await page.goto(testData.baseURL);
    await page.getByRole("link", { name: "Log in" }).click();
    await page
      .locator("#loginusername")
      .fill(testData.authData.invalidLogin.username);
    await page
      .locator("#loginpassword")
      .fill(testData.authData.invalidLogin.password);
    const [dialog] = await Promise.all([
      page.waitForEvent("dialog"),
      page.getByRole("button", { name: "Log in" }).click(),
    ]);

    expect(dialog.message()).toBe("Wrong password.");
    await dialog.accept();
  });

  test("TC-NG-04 Sign up with already existing username", async ({ page }) => {
    await page.goto(testData.baseURL);
    await page.getByRole("link", { name: "Sign up" }).click();
    await page
      .getByRole("textbox", { name: "Username:" })
      .fill(testData.authData.existingSignup.username);
    await page
      .getByRole("textbox", { name: "Password:" })
      .fill(testData.authData.existingSignup.password);
    const [dialog] = await Promise.all([
      page.waitForEvent("dialog"),
      page.getByRole("button", { name: "Sign up" }).click(),
    ]);

    expect(dialog.message()).toBe("This user already exist.");
    await dialog.accept();
  });
});
