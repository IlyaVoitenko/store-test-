import { test, expect } from "@playwright/test";
import { loginUser } from "../../utils/auth";
import { ProductPage } from "../../pages/ProductPage";

test("add an item to bucket", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const productPage = new ProductPage(page);
  await productPage.addBackpack();
  await expect(productPage.btnRemoveCardToBucket).toHaveText("Remove");
  await productPage.expectCartCount(1);
});

test("remove an item to bucket", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const productPage = new ProductPage(page);
  await productPage.addBackpack();
  await expect(productPage.btnRemoveCardToBucket).toHaveText("Remove");
  await productPage.expectCartCount(1);
  await productPage.removeBackpack();
  await productPage.expectCartCount();
});
