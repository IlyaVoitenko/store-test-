import { type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly selectInputSorts: Locator;
  readonly btnAddCardToBucket: Locator;
  readonly shoppingCartLink: Locator;

  constructor(private readonly page: Page) {
    this.btnAddCardToBucket = page.locator("#add-to-cart-sauce-labs-backpack");
    this.selectInputSorts = page.locator(".product_sort_container");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
  }

  //   addProduct(){
  //     this.btnAddCardToBucket.click();
  //     this.btnAddCardToBucket
  //     this.shoppingCartLink.getByLabel('')
  //   }
}
