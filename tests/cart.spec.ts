import { expect, Page, test } from "@playwright/test";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Tests", () => {
  let page: Page;
  test.beforeAll(async ({browser}) =>{
    const context = await browser.newContext();
    page = await context.newPage();
    const cartPage = new CartPage(page);
    await cartPage.navigateTo();
    await cartPage.login("aga09@inbox.lv", "P@ssword123");
  })

    test("Item can be added to cart", async () => {
        const cartPage = new CartPage(page);
        await cartPage.addToCartBtn();
        await cartPage.verifyAlert('Product Added To Cart');
    });  

    test("Item can be removed from cart", async () => {
        const cartPage = new CartPage(page);
        await cartPage.openCart();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.removeBtn();
        await cartPage.verifyAlert('No Product in Your Cart');
    });  

    // kkas nestrādā :(
    test("Successfully can add multiple different items", async () => {
        const cartPage = new CartPage(page);
        await cartPage.addToCartItems();
        await cartPage.verifyAlert('Product Added To Cart');
        await cartPage.openCart();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.openCheckout();
        await cartPage.multipleItems(' Quantity: 1 ');
    });  

    test("Can't add to cart multiple similar items", async () => {
        const cartPage = new CartPage(page);
        await cartPage.addToCart3Items();
        await cartPage.verifyAlert('Product Added To Cart');
        await cartPage.openCart();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/cart'); 
        await cartPage.openCheckout();
        await cartPage.onlyOneItem(' Quantity: 1 ');
    }); 
});