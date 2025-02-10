import { BrowserContext, Page, test } from "@playwright/test";
import { RegistrationPage } from "../pages/registration.page";

test.describe("Registration Tests", () => {
  let page: Page;
    let context: BrowserContext;
    test.beforeAll(async ({browser}) =>{
      context = await browser.newContext();
      page = await context.newPage();
    })
    test.afterAll(async () => {
      // Close the browser after all tests are done
      await page.close();
      await context.close();
  });
  test("Registration form has mandatory fields", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "",
      "",
      "",
      "",
      "",
      "Male",
      "",
      ""
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInputRequired();
  });

  test("First name should be at least 3 character long", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "a",
      "",
      "test@test.com",
      "1234567890",
      "",
      "Male",
      "P@ssword123",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInvalidInputFeedback("*First Name must be 3 or more character long");
  });

  test("Email should be valid", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "Alan",
      "Test",
      "a",
      "1234567890",
      "",
      "Male",
      "P@ssword123",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInvalidInputFeedback("*Enter Valid Email");
  });

  test("Phone number should be 10 digit", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "Alan",
      "Test",
      "test@test.com",
      "1",
      "",
      "Male",
      "P@ssword123",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInvalidInputFeedback("*Phone Number must be 10 digit");
  });

  test("Phone number should be only numbers", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "Alan",
      "Test",
      "test@test.com",
      "aaaaaaaaaa",
      "",
      "Male",
      "P@ssword123",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInvalidInputFeedback("*only numbers is allowed");
  });

  test("Passwords should match", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "Alan",
      "Test",
      "test@test.com",
      "1234567890",
      "",
      "Male",
      "a",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.verifyInvalidInputFeedback("Password and Confirm Password must match with each other.");
  });

  test("Password should be at least 8 character long", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.openRegistration();
    await registrationPage.fillRegistrationForm(
      "Alan",
      "Test",
      "test@test.com",
      "1234567890",
      "",
      "Male",
      "test",
      "test"
    );
    await registrationPage.checkbox();
    await registrationPage.submitForm();
    await registrationPage.verifyAlert("Password must be 8 Character Long!");
  });
});
