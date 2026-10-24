import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly selectInputSorts: Locator;
  readonly btnAddCardToBucket: Locator;
  readonly btnRemoveCardToBucket: Locator;
  readonly shoppingCartLink: Locator;

  constructor(private readonly page: Page) {
    this.btnAddCardToBucket = page.locator("#add-to-cart-sauce-labs-backpack");
    this.btnRemoveCardToBucket = page.locator("#remove-sauce-labs-backpack");
    this.selectInputSorts = page.locator(".product_sort_container");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
  }

  async expectCartCount(count?: number): Promise<void> {
    const label = count === undefined ? "Cart, empty" : `Cart, ${count} items`;
    await expect(this.shoppingCartLink).toHaveAttribute("aria-label", label);
  }
  async addBackpack(): Promise<void> {
    await this.btnAddCardToBucket.click();
  }
  async removeBackpack(): Promise<void> {
    await this.btnRemoveCardToBucket.click();
  }
}
