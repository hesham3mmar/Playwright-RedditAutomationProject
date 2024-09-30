import { submitPostLocators } from '../locators/submit-post-locators.js';
import { expect } from '@playwright/test'; 

export class SubmitPostPage {
  constructor(page) {
    this.page = page;
    this.createPostButton = page.locator(submitPostLocators.createPostButton);
    this.titleTextBox = page.locator(submitPostLocators.titleTextBox);
    this.bodyTextBox = page.locator(submitPostLocators.bodyTextBox);
    this.saveDraftButton = page.locator(submitPostLocators.saveDraftButton);
    this.draftsButton = page.locator(submitPostLocators.draftsButton);
    this.draftTitle = page.locator(submitPostLocators.draftTitle);
  }

  async createDraftPost(title, body) {
    await this.createPostButton.click();
    await this.page.waitForLoadState('networkidle'); 

    await this.titleTextBox.fill(title);
    await this.bodyTextBox.fill(body);
    await this.saveDraftButton.click();

    // Reload the page to see the updated drafts
    await this.page.reload();
    await this.page.waitForLoadState('networkidle'); 

    await this.draftsButton.click();
  }

  async verifyDraftSaved() {
    await this.page.waitForSelector(submitPostLocators.draftTitle, { state: 'visible', timeout: 10000 });
    await expect(this.draftTitle).toBeVisible();
  }
}
