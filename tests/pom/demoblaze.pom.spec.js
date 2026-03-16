import { test, expect } from "@playwright/test";
import testData from "../../features/testData.json";
import { AuthModal } from "../pages/AuthModal";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { OrderModal } from "../pages/OrderModal";
import { ProductPage } from "../pages/ProductPage";

test.describe("Demoblaze POM examples", () => {
  test("TC-POM-01 Home page categories and grid @pom", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.expectCategoriesVisible();
    await homePage.expectProductGridVisible();
  });

  test("TC-POM-02 Open product detail @pom", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.goto();

    await homePage.openProduct(testData.products.laptopPrimary);
    await productPage.expectDetailsVisible(testData.products.laptopPrimary, "$790");
  });

  test("TC-POM-03 Add product to cart dialog @pom", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.goto();

    await homePage.openProduct(testData.products.laptopPrimary);
    const dialogMessage = await productPage.addToCartAndAcceptDialog();

    expect(dialogMessage).toContain("Product added");
  });

  test("TC-POM-04 Open and close account modals @pom", async ({ page }) => {
    const homePage = new HomePage(page);
    const authModal = new AuthModal(page);
    await homePage.goto();

    await homePage.openLogin();
    await authModal.expectLoginVisible();
    await authModal.closeVisibleModal();
    await authModal.expectLoginHidden();

    await homePage.openSignUp();
    await authModal.expectSignUpVisible();
    await authModal.closeVisibleModal();
    await authModal.expectSignUpHidden();
  });

  test("TC-POM-05 Open place order modal @pom", async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const orderModal = new OrderModal(page);
    await homePage.goto();

    await homePage.openCart();
    await cartPage.openPlaceOrder();
    await orderModal.expectVisible();
    await orderModal.fill(testData.orderData.valid);
    await orderModal.expectPurchaseEnabled();
  });
});