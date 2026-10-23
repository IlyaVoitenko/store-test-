import { test, expect } from "@playwright/test";
import { loginUser } from "../../utils/auth";

test("add an item to bucket", async ({ page }) => {
  await loginUser(page);
  await page.waitForURL("/inventory.html");
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText(
    "Remove",
  );
  const ariaLabelValue = await page
    .locator(".shopping_cart_link")
    .getAttribute("aria-label");
  const match = ariaLabelValue?.match(/(\d+)/);
  const count = match ? parseInt(match[0], 10) : 0;
  await expect(count).toBe(1);
});
