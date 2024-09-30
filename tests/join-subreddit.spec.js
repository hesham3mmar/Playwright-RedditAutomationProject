import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { SubredditPage } from '../pages/SubredditPage.js';
import { validCredentials } from '../test-data/credentials.js';

test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

test.describe('Choose Subreddit Tests', () => {
  test('should navigate to r/supplychain and join subreddit', async ({ page }) => {
    test.setTimeout(90000);
    const loginPage = new LoginPage(page);
    const subredditPage = new SubredditPage(page);

    // Step 1: Login to Reddit
    await loginPage.navigate();
    await loginPage.login(validCredentials.username, validCredentials.password);

    // Step 2: Search and Navigate to Subreddit
    await subredditPage.searchAndNavigateToSubreddit('supplyChain');

    // Step 3: Join the Subreddit
    await subredditPage.joinSubreddit();

    // Step 4: Verify Joined Status
    await subredditPage.verifyJoined('supplyChain');
  });
});
