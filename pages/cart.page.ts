import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly alertLocator: Locator;
  readonly quantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertLocator = this.page.locator('div[role="alert"]');
    this.quantity = this.page.locator('div[class="item__quantity"]');
  }
  
  async navigateTo() {
    await this.page.goto("client");
  }
  
  async login(email: string, password: string) {
    await this.page.locator('input[id="userEmail"]').fill(email);
    await this.page.locator('input[id="userPassword"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click({timeout:5000});
  }

 async addToCartBtn() {
    await this.page.locator('button:nth-child(4)').first().click();
 }

 async verifyAlert(alertText: string) {
    await expect(this.alertLocator).toHaveText(alertText);
}
 
async addToCart3Items() {
    await this.page.locator('button:nth-child(4)').nth(1).click();
    await this.page.locator('button:nth-child(4)').nth(1).click();
    await this.page.locator('button:nth-child(4)').nth(1).click();
 }

 async openCart() {
    await this.page.locator('li').filter({ hasText: 'Cart' }).click();
 }

 async openCheckout() {
    await this.page.locator('button').filter({ hasText: 'Checkout' }).click();
 }

 async onlyOneItem(qty: string) {
    await expect(this.quantity).toHaveText(qty);
 }

 async addToCartItems() {
    await this.page.locator('button:nth-child(4)').nth(1).click();
    await this.page.locator('button:nth-child(4)').nth(2).click();
 }

 async multipleItems(qty: string) {
    await expect(this.quantity.first()).toHaveText(qty);
    await expect(this.quantity.nth(1)).toHaveText(qty);
 }

 async removeBtn() {
    await this.page.locator('button[class="btn btn-danger"]').click();
 }
}