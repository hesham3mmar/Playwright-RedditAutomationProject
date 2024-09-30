import { homeLocators } from '../locators/home-locators.js';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator(homeLocators.searchBar);
    this.userProfileIcon = page.locator(homeLocators.userProfileIcon);
  }

  async searchSubreddit(subredditName) {
    await this.searchBar.waitFor({ state: 'visible', timeout: 20000 });
    await this.searchBar.click();
    await this.searchBar.type(subredditName);

    // Wait after typing to allow results to load
    await this.page.waitForTimeout(5000);

    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }
}