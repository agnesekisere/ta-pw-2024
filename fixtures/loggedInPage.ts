import { test as base, Page } from '@playwright/test';
import { LoginPage } from "../pages/login.page";
export const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("aga09@inbox.lv", "P@ssword123");
    
    await use(page);

    await context.close();
  },
});