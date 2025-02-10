import { BrowserContext, expect, Page, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Tests", () => {
  let page: Page;
  let context: BrowserContext;
  test.beforeAll(async ({browser}) =>{
    context = await browser.newContext();
    page = await context.newPage();
  })
  test.afterAll(async () => {
    await page.close();
    await context.close();
  });
  
  test("User should be able to log in with valid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("aga09@inbox.lv", "P@ssword123");
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash', {timeout: 5000});
  });

  test("User can't login with wrong email", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("test9@mail.com", "P@ssword123");
    await loginPage.verifyAlertDisplayed('Incorrect email or password.');
  });

  test("User can't login with wrong password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("aga09@inbox.lv", "Password123");
    await loginPage.verifyAlertDisplayed('Incorrect email or password.');
  });

  test("Email and password fields are mandatory fields", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.clickLoginBtn();
    await loginPage.verifyErrorDisplayed('Email', '*Email is required');
    await loginPage.verifyErrorDisplayed('Password', '*Password is required');
  });
});
