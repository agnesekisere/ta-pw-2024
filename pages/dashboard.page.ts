import { expect, Page } from "@playwright/test";

export class DashboardPage {
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

    async navBar() {
      await expect(this.page.locator('label[class="logo"]')).toBeVisible();
      await expect(this.page.getByRole('button', { name: ' HOME' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: '   ORDERS' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: '   Cart' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
    }

    // async itemCard() {
    //   await this.page.locator('div[class="card"]').isVisible();
    //   await this.page.locator('img[class="card-item-top"]').isVisible();
    //   await this.page.locator('div[class="card-body"]').isVisible();
    //   await this.page.locator('h5[style="text-transform: uppercase;"]').isVisible();
    //   await this.page.locator('div[class="d-flex flex-row my-2"]').isVisible();
    //   await this.page.locator('button[class="btn w-40 rounded"]').isVisible();
    //   await this.page.locator('button[class="btn w-10 rounded"]').isVisible();
    // }
  }