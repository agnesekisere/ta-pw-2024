import { Page, test } from "@playwright/test";
import { PriceDashboardPage } from "../pages/price-dashboard.page";

test.describe("Price Dashboard Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const dashboardPage = new PriceDashboardPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  })

  test("Successfull price range", async () => {
    const dashboardPage = new PriceDashboardPage(page);
    await dashboardPage.minPrice(25000);
    await dashboardPage.maxPrice(31500);
    await dashboardPage.priceRange();
  });

  test("Price range showing all items", async () => {
    const dashboardPage = new PriceDashboardPage(page);
    await dashboardPage.minPrice(0);
    await dashboardPage.maxPrice(1000000);
    await dashboardPage.allItems();
  });
});