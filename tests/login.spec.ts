import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Tests", () => {
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
    await loginPage.verifyAlert('Incorrect email or password.');
  });

  test("User can't login with wrong password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("aga09@inbox.lv", "Password123");
    await loginPage.verifyAlert('Incorrect email or password.');
  });

  test("Email and password fields are mandatory fields", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login("", "");
    await loginPage.loginMandatoryFields();
  });
});
