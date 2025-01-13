import { expect, Page, test } from "@playwright/test";
import { ViewItemPage } from "../pages/view-item.page";

test.describe("View Item Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const dashboardPage = new ViewItemPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  })

  test("View Iphone", async () => {
    const dashboardPage = new ViewItemPage(page);
    await dashboardPage.viewItemBtn();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/product-details/6581cade9fd99c85e8ee7ff5', {timeout: 5000}); 
    await dashboardPage.iphone();
});

});