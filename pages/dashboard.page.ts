import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly alertLocator: Locator;

    constructor(page: Page) {
      this.page = page;
      this.alertLocator = this.page.locator('.toast-error');
    }

    async verifyNavigationBarLayout() {
      await expect(this.page.locator('label[class="logo"]')).toBeVisible();
      await expect(this.page.getByRole('button', { name: ' HOME' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: '   ORDERS' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: '   Cart' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
    }
    async searchField(search: string) {
      await this.page.getByRole('textbox', { name: 'search' }).fill(search);
      await this.page.keyboard.press('Enter');
    }

    async verifyItemVisible(itemName: string) {
      await expect(this.page.locator('.card').filter({hasText: itemName})).toBeVisible();
    }

    async checkShowingItemQuantity(itemQty: string) {
      const resText = await this.page.locator('#res').textContent();
    expect(resText).toContain(itemQty);
    }

    async verifyAlertDisplayed(alertText: string) {
      await expect(this.alertLocator).toHaveText(alertText);
    }

    async checkItemsVisibility(items) {
      for (const item of items) {
          const itemElements = await this.page.locator(`text=${item}`).all();
          for (const element of itemElements) {
              await expect(element).toBeVisible();
          }
      }
    }

    async minPrice(minPrice: number) {
      await this.page.getByRole('textbox', { name: 'Min Price' }).fill(minPrice.toString());
    }

    async maxPrice(maxPrice: number) {
      await this.page.getByRole('textbox', { name: 'Max Price' }).fill(maxPrice.toString());
      await this.page.keyboard.press('Enter');
    }

    async viewItem(text: string) { 
      await this.page.locator('.card')
      .filter({hasText: text})
      .getByRole('button', {name: "View"}).click();
    }

    async addItemToCart(text: string, itemCount: number) { 
      const addButton = this.page.locator('.card')
        .filter({hasText: text})
        .getByRole('button', {name: "Add To Cart"});
      
      for (let i = 0; i < itemCount; i++) { 
        await addButton.click();
      } 
    }
  
    async openCart() {
      await this.page.locator('li')
      .filter({ hasText: 'Cart' })
      .click();
    }

   async electronicsFilter() {
    const checkbox = this.page.locator('#sidebar div')
      .filter({ hasText: /^electronics$/ })
      .getByRole('checkbox');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

    async filterByShoes() {
      const checkbox = this.page.locator('#sidebar div')
        .filter({ hasText: /^shoes$/ })
        .getByRole('checkbox');
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }

    async fashionFilter() {
      const checkbox =  this.page.locator('#sidebar div')
      .filter({ hasText: /^fashion$/ })
      .getByRole('checkbox');
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    } 

    async shirtsFilter() {
      const checkbox = this.page.locator('#sidebar div')
      .filter({ hasText: /^shirts$/ })
      .getByRole('checkbox');
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    } 

    async removeFilter() {
      await this.page.locator('#sidebar div')
      .filter({ hasText: /^electronics$/ })
      .getByRole('checkbox')
      .uncheck({timeout:3000});
      await this.page.locator('#sidebar div')
      .filter({ hasText: /^shoes$/ })
      .getByRole('checkbox')
      .uncheck({timeout:3000});
    }
  }