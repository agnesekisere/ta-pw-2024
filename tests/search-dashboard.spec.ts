import { Page, test } from "@playwright/test";
import { SearchDashboardPage } from "../pages/search-dashboard.page";

test.describe("Search Dashboard Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const dashboardPage = new SearchDashboardPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  })

  test("Can search for item with valid input", async () => {
    const dashboardPage = new SearchDashboardPage(page);
    await dashboardPage.searchField('IPHONE');
    await dashboardPage.iphone();
  });

  test("Can't search for item with invalid input", async () => {
    const dashboardPage = new SearchDashboardPage(page);
    await dashboardPage.searchField('test');
    await dashboardPage.noItemsAlert();
  });

  test("Search input is case sensitive", async () => {
    const dashboardPage = new SearchDashboardPage(page);
    await dashboardPage.searchField('iphone');
    await dashboardPage.noItemsAlert();
    await dashboardPage.searchField('IPHONE');
    await dashboardPage.iphone();
  });

  test("Remove search input", async () => {
    const dashboardPage = new SearchDashboardPage(page);
    await dashboardPage.searchField('');
    await dashboardPage.allItems();
  });

});