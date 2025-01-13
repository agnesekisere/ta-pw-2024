import { expect, Locator, Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly alertLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertLocator = this.page.locator('div[role="alert"]');
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
  
  async registrationMandatoryFields() {
    await expect(this.page.getByText('*First Name is required')).toBeVisible();
    await expect(this.page.getByText('*Email is required')).toBeVisible();
    await expect(this.page.getByText('*Phone Number is required')).toBeVisible();
    await expect(this.page.getByText('*Password is required')).toBeVisible();
    await expect(this.page.getByText('Confirm Password is required')).toBeVisible();
    await expect(this.page.getByText('*Please check above checkbox')).toBeVisible();
  }

  async shortFirstName() {
    await expect(this.page.getByText('*First Name must be 3 or more character long')).toBeVisible();
  }
  // brīdinājums par nepareizu e-pasta formātu
  async validEmail() {
    await expect(this.page.getByText('*Enter Valid Email')).toBeVisible();
  }

  async phoneNumber() {
    await expect(this.page.getByText('*Phone Number must be 10 digit')).toBeVisible();
  }

  async phoneNumberValid() {
    await expect(this.page.getByText('*only numbers is allowed')).toBeVisible();
  }
  // brīdinājums par paroles nesakritību
  async passwordMatch() {
    await expect(this.page.getByText('Password and Confirm Password must match with each other.')).toBeVisible();
  }

  async shortPassword() {
    await expect(this.alertLocator).toBeVisible({timeout:3000});
  }
}
