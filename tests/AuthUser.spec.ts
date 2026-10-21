import { test, expect } from "@playwright/test";
const baseURL = process.env.BASE_URL;
const userLoginId = process.env.USER_LOGIN_ID;
const userPass = process.env.USER_PASS;

test("homepage", async ({ page }) => {
  await page.goto(baseURL as string);
  await expect(page).toHaveTitle("Swag Labs");
});

test("logging Users", async ({ page }) => {
  await page.goto(`${baseURL}/`);
  await page.getByPlaceholder("Username").fill(userLoginId as string);
  await page.getByPlaceholder("Password").fill(userPass as string);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(`${baseURL}/inventory.html`);
});

// test('Add an item to bucket',async({page})=>{
//   await page.
// })
