import { expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { test } from '../fixtures/loggedInPage';

test.describe("Dashboard Tests", () => {
  test("Navigation bar have logo and 4 buttons", async ({loggedInPage}) => {
    const dashboardPage = new DashboardPage(loggedInPage);
    await expect(loggedInPage).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
    await dashboardPage.verifyNavigationBarLayout();
  });

  test("Can search for item with valid input", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.searchField('IPHONE');
      await dashboardPage.page.waitForTimeout(1000);
      await dashboardPage.verifyItemVisible("IPHONE 13 PRO");
      await dashboardPage.checkShowingItemQuantity("Showing 1 results");
    });
  
    test("Can't search for item with invalid input", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.page.waitForTimeout(5000);
      await Promise.all([dashboardPage.verifyAlertDisplayed('No Products Found'),dashboardPage.searchField('test')]);
      await dashboardPage.checkShowingItemQuantity("Showing 0 results");
    });
  
    test("Search input is case sensitive", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.searchField('iphone');
      await dashboardPage.verifyAlertDisplayed('No Products Found');
      await dashboardPage.searchField('IPHONE');
      await dashboardPage.verifyItemVisible("IPHONE 13 PRO");
      await dashboardPage.checkShowingItemQuantity("Showing 1 results");
    });
  
    test("Remove search input", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.searchField('');
      await dashboardPage.page.waitForTimeout(1000);
      const itemsToCheck = ['ZARA COAT 3', 'IPHONE 13 PRO', 'ADIDAS ORIGINAL'];
      await dashboardPage.checkItemsVisibility(itemsToCheck);
      await dashboardPage.checkShowingItemQuantity("Showing 3 results");
    });

    test("Successfull price range", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.minPrice(25000);
      await dashboardPage.maxPrice(31500);
      await dashboardPage.page.waitForTimeout(1000);
      const itemsToCheck = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
      await dashboardPage.checkItemsVisibility(itemsToCheck);
      await dashboardPage.checkShowingItemQuantity("Showing 2 results");
    });
  
    test("Price range showing all items", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.minPrice(0);
      await dashboardPage.maxPrice(1000000);
      await dashboardPage.page.waitForTimeout(1000);
      const itemsToCheck = ['ZARA COAT 3', 'IPHONE 13 PRO', 'ADIDAS ORIGINAL'];
      await dashboardPage.checkItemsVisibility(itemsToCheck);
      await dashboardPage.checkShowingItemQuantity("Showing 3 results");
    });
    
    test("Successfully filter items by Electronics", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.electronicsFilter();
      await dashboardPage.page.waitForTimeout(1000);
      await dashboardPage.verifyItemVisible('IPHONE 13 PRO');
      await dashboardPage.checkShowingItemQuantity("Showing 1 results");
    });
  
    test("No items found", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.filterByShoes();
      await dashboardPage.verifyAlertDisplayed('No Products Found ');
      await dashboardPage.checkShowingItemQuantity("Showing 0 results");
    });
  
    test("Unselect all filters", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.removeFilter();
      await dashboardPage.page.waitForTimeout(1000);
      const itemsToCheck = ['ZARA COAT 3', 'IPHONE 13 PRO', 'ADIDAS ORIGINAL'];
      await dashboardPage.checkItemsVisibility(itemsToCheck);
      await dashboardPage.checkShowingItemQuantity("Showing 3 results");
    });
    
  test("Successfully filters by 2 options", async ({loggedInPage}) => {
      const dashboardPage = new DashboardPage(loggedInPage);
      await dashboardPage.fashionFilter();
      await dashboardPage.shirtsFilter();
      await dashboardPage.page.waitForTimeout(1000);
      const itemsToCheck = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];
      await dashboardPage.checkItemsVisibility(itemsToCheck);
      await dashboardPage.checkShowingItemQuantity("Showing 2 results");
  });
});