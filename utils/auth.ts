import { type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
const userLoginId = process.env.USER_LOGIN_ID;
const userPass = process.env.USER_PASS;

export const loginUser = async (page: Page): Promise<void> => {
  const loginPage = new LoginPage(page);
  await loginPage.login(userLoginId as string, userPass as string);
};
