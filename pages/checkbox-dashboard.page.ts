import { expect, Page } from "@playwright/test";

export class CheckboxDashboardPage {
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

    async electronicsFilter() {
      await this.page.locator('#sidebar div').filter({ hasText: /^electronics$/ }).getByRole('checkbox').check();
    }

    async iphone() {
      await expect(this.page.getByText('IPHONE 13 PRO')).toBeVisible();
    }

    async womenFilter() {
      await this.page.locator('#sidebar div').filter({ hasText: /^women$/ }).getByRole('checkbox').check({timeout:3000});
    }

    async noIphone() {
      await expect(this.page.getByText('IPHONE 13 PRO')).not.toBeVisible();
    }

    async fashionFilter() {
        await this.page.locator('#sidebar div').filter({ hasText: /^fashion$/ }).getByRole('checkbox').check({timeout:3000});
      } 

      async shirtsFilter() {
        await this.page.locator('#sidebar div').filter({ hasText: /^shirts$/ }).getByRole('checkbox').check({timeout:3000});
      } 

      async qwerty() {
        await expect(this.page.getByText('QWERTY').first()).toBeVisible();
      }

      async removeFilter() {
        await this.page.locator('#sidebar div').filter({ hasText: /^electronics$/ }).getByRole('checkbox').uncheck({timeout:3000});
        await this.page.locator('#sidebar div').filter({ hasText: /^women$/ }).getByRole('checkbox').uncheck({timeout:3000});
    }

    async allItems() {
        await expect(this.page.getByText('IPHONE 13 PRO')).toBeVisible();
        await expect(this.page.getByText('QWERTY').first()).toBeVisible();
        await expect(this.page.getByText('BANARSI SAREE')).toBeVisible();
        await expect(this.page.getByText('LG REFRIGERATOR').first()).toBeVisible();
        await expect(this.page.getByText('LG REFRIGERATOR').nth(1)).toBeVisible();
        await expect(this.page.getByText('QWERTY').nth(1)).toBeVisible();
    }
  }