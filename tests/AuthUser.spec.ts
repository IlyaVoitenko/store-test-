import { test, expect } from "@playwright/test";
const userLoginId = process.env.USER_LOGIN_ID;
const userPass = process.env.USER_PASS;

test("Success logging Users", async ({ page }) => {
  await page.goto(`/`);
  await page.getByPlaceholder("Username").fill(userLoginId as string);
  await page.getByPlaceholder("Password").fill(userPass as string);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(`/inventory.html`);
});

test("Invalid logging Users by login", async ({ page }) => {
  await page.goto(`/`);
  await page.getByPlaceholder("Username").fill(`wrong login id`);
  await page.getByPlaceholder("Password").fill(userPass as string);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(page).not.toHaveURL("/inventory.html");
});

test("Invalid logging Users by password", async ({ page }) => {
  await page.goto(`/`);
  await page.getByPlaceholder("Username").fill(userLoginId as string);
  await page.getByPlaceholder("Password").fill(`password wrong`);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(page).not.toHaveURL("/inventory.html");
});
