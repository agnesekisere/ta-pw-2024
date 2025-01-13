import { expect, Page, test } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";

test.describe("Dashboard Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  })
  test("Navigation bar have logo and 4 buttons", async () => {
    const dashboardPage = new DashboardPage(page);
    // await dashboardPage.navigateTo();
    // await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
    await dashboardPage.navBar();
  });
  // test("Items card is visible", async ({
  //   page,
  // }) => {
  //   const dashboardPage = new DashboardPage(page);
  //   await dashboardPage.navigateTo();
  //   await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  //   await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
  //   await dashboardPage.itemCard();
  // });
});