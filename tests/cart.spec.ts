import { expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { DashboardPage } from "../pages/dashboard.page";
import { test } from '../fixtures/loggedInPage';

test.describe("Cart Tests", () => {
    test("Item can be added to cart", async ({loggedInPage}) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        await dashboardPage.addItemToCart("iphone 13 pro", 1);
        const cartPage = new CartPage(loggedInPage);
        await cartPage.verifyAlertDisplayed('Product Added To Cart');
        await dashboardPage.openCart();
        await expect(loggedInPage).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart');
        await cartPage.verifyItemAdded("IPHONE 13 PRO");
    });  

    test("Item can be removed from cart", async ({loggedInPage}) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        await dashboardPage.addItemToCart("iphone 13 pro", 1);
        const cartPage = new CartPage(loggedInPage);
        await cartPage.verifyAlertDisplayed('Product Added To Cart');
        await dashboardPage.openCart();
        await expect(loggedInPage).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.removeBtnClick();
        await cartPage.verifyAlertDisplayed('No Product in Your Cart');
        await cartPage.homeBtnClick();
    });  

    test("Successfully can add multiple different items", async ({loggedInPage}) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        await dashboardPage.addItemToCart("iphone 13 pro", 1);
        const cartPage = new CartPage(loggedInPage);
        await cartPage.verifyAlertDisplayed('Product Added To Cart');
        await dashboardPage.addItemToCart("zara coat 3", 1);
        await cartPage.verifyAlertDisplayed('Product Added To Cart');
        await dashboardPage.openCart();
        await expect(loggedInPage).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.openCheckout();
        await cartPage.checkItemQuantity("zara coat 3", 1);
        await cartPage.checkItemQuantity("iphone 13 pro", 1);
        await cartPage.homeBtnClick();
    });  

    test("Can't add to cart multiple similar items", async ({loggedInPage}) => {
        const dashboardPage = new DashboardPage(loggedInPage);
        await dashboardPage.addItemToCart("iphone 13 pro", 3);
        const cartPage = new CartPage(loggedInPage);
        await cartPage.verifyAlertDisplayed('Product Added To Cart');
        await dashboardPage.openCart();
        await expect(loggedInPage).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.openCheckout();
        await cartPage.checkItemQuantity("iphone 13 pro", 1);
    }); 
});