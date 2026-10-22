import { test, expect } from "@playwright/test";
import { Login } from "../../utils/auth";
import { LoginPage } from "../../pages/LoginPage";

const userLoginId = process.env.USER_LOGIN_ID;
const userPass = process.env.USER_PASS;

test("Success logging Users", async ({ page }) => {
  await Login(page);
});

test("Invalid logging Users by login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("wrong login id", userPass as string);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(page).not.toHaveURL("/inventory.html");
});

test("Invalid logging Users by password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(userLoginId as string, `password wrong`);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(page).not.toHaveURL("/inventory.html");
});
