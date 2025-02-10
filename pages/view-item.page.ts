import { expect, Locator, Page } from "@playwright/test";

export class ViewItemPage {
  readonly page: Page;
  readonly header: Locator;
    

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('h2');
  }

async verifyHeaderText(headerText: string) {
  await expect(this.header).toHaveText(headerText);
}
}