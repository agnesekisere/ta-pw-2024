import { expect } from "@playwright/test";
import { ViewItemPage } from "../pages/view-item.page";
import { DashboardPage } from "../pages/dashboard.page";
import { test } from '../fixtures/loggedInPage';

test.describe("View Item Tests", () => {
  test("Item can be viewed", async ({loggedInPage}) => {
    const dashboardPage = new DashboardPage(loggedInPage);
    await dashboardPage.viewItem("IPHONE 13 PRO");
    await expect(loggedInPage)
    .toHaveURL('https://rahulshettyacademy.com/client/dashboard/product-details/67a8df56c0d3e6622a297ccd', {timeout: 5000}); 
    const viewItemPage = new ViewItemPage(loggedInPage);
    await viewItemPage.verifyHeaderText("IPHONE 13 PRO");
});
});