import { expect, Page } from "@playwright/test";

export class SearchDashboardPage {
    readonly page: Page;
    

    constructor(page: Page) {
      this.page = page;
    }
  
    async navigateTo() {
       await this.page.goto("client");
    }
  
    async login(email: string, password: string) {
        await this.page.locator('input[id="userEmail"]').fill(email);
        await this.page.locator('input[id="userPassword"]').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click({timeout:5000});
    }

    async searchField(search: string) {
      await this.page.getByRole('textbox', { name: 'search' }).fill(search);
      await this.page.keyboard.press('Enter');
    }

    async iphone() {
      await expect(this.page.getByText('IPHONE 13 PRO')).toBeVisible();
    }

    async noItemsAlert() {
      await expect(this.page.getByText('No Products Found')).toBeVisible({timeout:3000});
    }

    async allItems() {
        await expect(this.page.getByText('QWERTY').first()).toBeVisible();
        await expect(this.page.getByText('IPHONE 13 PRO')).toBeVisible();
        await expect(this.page.getByText('QWERTY').nth(1)).toBeVisible();
        await expect(this.page.getByText('BANARSI SAREE')).toBeVisible();
        await expect(this.page.getByText('LG REFRIGERATOR').first()).toBeVisible();
        await expect(this.page.getByText('LG REFRIGERATOR').nth(1)).toBeVisible();
    }

  }