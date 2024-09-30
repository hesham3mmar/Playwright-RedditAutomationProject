import { expect } from '@playwright/test';
import { subredditLocators } from '../locators/subreddit-locators.js';
import { subredditData } from '../test-data/subreddit-data.js';
import { HomePage } from './HomePage.js';

export class SubredditPage {
  constructor(page) {
    this.page = page;
    this.joinButton = page.locator(subredditLocators.joinButton);
  }

  async searchAndNavigateToSubreddit(subredditKey) {
    const homePage = new HomePage(this.page);
    const subreddit = subredditData[subredditKey];

    await homePage.searchSubreddit(subreddit.name);
    await this.page.waitForURL(subreddit.url);
  }

  async joinSubreddit() {
    await this.joinButton.waitFor({ state: 'visible', timeout: 30000 });

    const buttonText = await this.joinButton.textContent();
    
    if (buttonText.includes('Joined')) {
      await this.joinButton.click(); // To Leave
      await this.joinButton.click(); // Toggle back to "Joined"
    } else {
      await this.joinButton.click(); // Directly join the subreddit
    }
  }

  async verifyJoined(subredditKey) {
    const subreddit = subredditData[subredditKey];
    await expect(this.page).toHaveURL(subreddit.url);
    await expect(this.joinButton).toHaveText('Joined');
  }
}
