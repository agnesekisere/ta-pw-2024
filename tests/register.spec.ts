import { test } from "@playwright/test";
import { RegistrationPage } from "../pages/registration.page";

test.describe("Registration Tests", () => {
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
    await registrationPage.registrationMandatoryFields();
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
    await registrationPage.shortFirstName();
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
    await registrationPage.validEmail();
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
    await registrationPage.phoneNumber();
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
      "a",
      "",
      "Male",
      "P@ssword123",
      "P@ssword123"
    );
    await registrationPage.submitForm();
    await registrationPage.phoneNumberValid();
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
    await registrationPage.passwordMatch();
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
    await registrationPage.verifyAlert('Password must be 8 Character Long!');
  });
});
