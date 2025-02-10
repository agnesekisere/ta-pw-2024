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
 
 // Verify that the alert notification is displayed
 async verifyAlertDisplayed(alertText: string) {
     await expect(this.alertLocator).toHaveText(alertText);
 }

 // Click on Login button
 async clickLoginBtn() {
  await this.page.getByRole('button', { name: 'Login' }).click({timeout:5000});
 }

 // Verify that the error message is displayed for a specific field
 async verifyErrorDisplayed(field: string, errorText: string) {
  const errorLocator = this.page.locator(`div.invalid-feedback >> text=${errorText}`);
  await expect(errorLocator).toBeVisible({ timeout: 5000 });
  await expect(errorLocator).toHaveText(errorText);
}

// Click on Register button
 async openRegistration(){
   await this.page.getByRole('link', {name: "Register"}).click();
 }
}
