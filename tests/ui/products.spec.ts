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

test("Products are sorted by price since low to high", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const products = await page.locator(".product_sort_container");
  await products.selectOption("lohi");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map((price) => +price.replace("$", ""));
  const sortedPrices = numericPrices.sort((a, b) => a - b);
  await expect(numericPrices).toEqual(sortedPrices);
});

test("Products are sorted by price since high to low", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const products = await page.locator(".product_sort_container");
  await products.selectOption("hilo");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map((price) => +price.replace("$", ""));
  const sortedPrices = numericPrices.sort((a, b) => b - a);
  await expect(numericPrices).toEqual(sortedPrices);
});

test("Products are sorted by range since A to Z", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const products = await page.locator(".product_sort_container");
  await products.selectOption("az");
  const titlesProducts = await page
    .locator(".inventory_item_name")
    .allTextContents();
  const sortedTitle = titlesProducts.sort();
  await expect(titlesProducts).toEqual(sortedTitle);
});

test("Products are sorted by range since Z to A ", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  const products = await page.locator(".product_sort_container");
  await products.selectOption("za");
  const titlesProducts = await page
    .locator(".inventory_item_name")
    .allTextContents();
  const sortedTitle = titlesProducts.sort((a, b) => (a > b ? -1 : 1));
  await expect(titlesProducts).toEqual(sortedTitle);
});
