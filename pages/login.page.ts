import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly alertLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertLocator = this.page.locator('div[role="alert"]');
  }

  async navigateTo() {
    await this.page.goto("client");
 }

 async login(email: string, password: string) {
     await this.page.locator('input[id="userEmail"]').fill(email);
     await this.page.locator('input[id="userPassword"]').fill(password);
     await this.page.getByRole('button', { name: 'Login' }).click({timeout:5000});
 }
 
 async verifyAlert(alertText: string) {
     await expect(this.alertLocator).toHaveText(alertText);
 }
 
 async loginMandatoryFields() {
     await expect(this.page.getByText('*Email is required')).toBeVisible({timeout:5000});
     await expect(this.page.getByText('*Password is required')).toBeVisible({timeout:5000});
 }

 async openRegistration(){
   await this.page.getByRole('link', {name: "Register"}).click();
 }
}
