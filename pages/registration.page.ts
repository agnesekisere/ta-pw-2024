import { expect, Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly alertLocator: Locator;
  readonly invalidFeedback: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertLocator = this.page.locator('div[role="alert"]');
    this.invalidFeedback = this.page.locator('.invalid-feedback');
  }

  async navigateTo() {
    await this.page.goto("client");
  }
  
  async openRegistration(){
    await this.page.getByRole('link', {name: "Register"}).click();
  }

  async verifyAlert(alertText: string) {
    await expect(this.alertLocator).toHaveText(alertText);
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    occupation: string,
    gender: "Male" | "Female",
    password: string,
    confirmPassword: string,
    //check: string
  ) {
      await this.page.locator('input[id="firstName"]').fill(firstName);
      await this.page.locator('input[id="lastName"]').fill(lastName);
      await this.page.locator('input[id="userEmail"]').fill(email);
      await this.page.locator('input[id="userMobile"]').fill(phoneNumber);
      await this.page.locator('select[formcontrolname="occupation"]').selectOption(occupation);
      await this.page.locator(`input[value="${gender}"]`).check();
      await this.page.locator('input[id="userPassword"]').fill(password);
      await this.page.locator('input[id="confirmPassword"]').fill(confirmPassword);
     // await this.page.getByRole('checkbox').check();
    }

  async checkbox() {
    await this.page.getByRole('checkbox').check();
  }

  async submitForm() {
    await this.page.locator('input[id="login"]').click();
  }
  
async verifyInputRequired() {
  await expect(this.page.getByText('*First Name is required')).toBeVisible();
  await expect(this.page.getByText('*Email is required')).toBeVisible();
  await expect(this.page.getByText('*Phone Number is required')).toBeVisible();
  await expect(this.page.getByText('*Password is required')).toBeVisible();
  await expect(this.page.getByText('Confirm Password is required')).toBeVisible();
  await expect(this.page.getByText('*Please check above checkbox')).toBeVisible();
}

  async verifyInvalidInputFeedback(feedbackText: string) {
    await expect(this.invalidFeedback).toHaveText(feedbackText);
  }
}
