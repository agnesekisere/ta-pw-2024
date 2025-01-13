import { Page, test } from "@playwright/test";
import { CheckboxDashboardPage } from "../pages/checkbox-dashboard.page";

test.describe("Dashboard Filter Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const dashboardPage = new CheckboxDashboardPage(page);
    await dashboardPage.navigateTo();
    await dashboardPage.login("aga09@inbox.lv", "P@ssword123");
  })

  test("Successfully filter items by Electronics", async () => {
    const dashboardPage = new CheckboxDashboardPage(page);
    await dashboardPage.electronicsFilter();
    await dashboardPage.iphone();
  });

  test("Unsuccessfull filter by Women and can't see Iphone 13 pro", async () => {
    const dashboardPage = new CheckboxDashboardPage(page);
    await dashboardPage.womenFilter();
    await dashboardPage.noIphone();
  });

  test("Unselect all filters", async () => {
    const dashboardPage = new CheckboxDashboardPage(page);
    await dashboardPage.removeFilter();
    await dashboardPage.allItems();
  });
  
test("Successfully filters by 2 options", async () => {
    const dashboardPage = new CheckboxDashboardPage(page);
    await dashboardPage.fashionFilter();
    await dashboardPage.shirtsFilter();
    await dashboardPage.qwerty();
});

});