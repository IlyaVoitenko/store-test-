import { expect, type Page } from "@playwright/test";
const userLoginId = process.env.USER_LOGIN_ID;
const userPass = process.env.USER_PASS;

export async function Login(page: Page): Promise<void> {
  await page.goto(`/`);
  await page.getByPlaceholder("Username").fill(userLoginId as string);
  await page.getByPlaceholder("Password").fill(userPass as string);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(`/inventory.html`);
}
