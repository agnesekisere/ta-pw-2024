import { expect, Page } from "@playwright/test";

export class ViewItemPage {
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

 async viewItemBtn() {
    await this.page.getByRole('button', { name: 'View' }).first().click();
 }
 
 async iphone() {
    await expect(this.page.getByText('IPHONE 13 PRO')).toBeVisible();
  }
}