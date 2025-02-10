import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly alertLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertLocator = this.page.locator('div[role="alert"]');
  }

async homeBtnClick() {
  await this.page.locator('li')
  .filter({ hasText: 'Home' })
  .click();
}

async verifyAlertDisplayed(alertText: string) {
  await expect(this.alertLocator).toHaveText(alertText);
}

 async verifyItemAdded(itemName: string){
  this.page.locator('h3')
     .filter({ hasText: itemName });
 }

 async openCheckout() {
   await this.page.locator('button')
   .filter({ hasText: 'Checkout' })
   .click();
 }
 
 async checkItemQuantity(text: string, count: number) {
   const quantity = this.page.locator('.item__details')
  .filter({hasText: text})
  .locator('.item__quantity');
   await expect(quantity).toHaveText(`Quantity: ${count}`);
 }

 async removeBtnClick() {
    await this.page.locator('button[class="btn btn-danger"]')
    .click();
 }
}