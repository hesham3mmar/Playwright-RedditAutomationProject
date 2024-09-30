import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { SubredditPage } from '../pages/SubredditPage.js';
import { SubmitPostPage } from '../pages/SubmitPostPage.js';
import { HomePage } from '../pages/HomePage.js';
import { validCredentials } from '../test-data/credentials.js';
import { submitPostData } from '../test-data/submit-post-data.js';

test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

test.describe('Save Draft Post Tests', () => {
  test('should save a draft post and verify it is saved', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const subredditPage = new SubredditPage(page);
    const submitPostPage = new SubmitPostPage(page);

    // Step 1: Login to Reddit
    await loginPage.navigate();
    await loginPage.login(validCredentials.username, validCredentials.password);

    // Step 2: Join Subreddit
    await subredditPage.searchAndNavigateToSubreddit('supplyChain');
    await subredditPage.joinSubreddit();

    // Step 3: Create and Save Draft Post
    await submitPostPage.createDraftPost(submitPostData.title, submitPostData.body);

    // Step 4: Verify Draft is Saved
    await submitPostPage.verifyDraftSaved();
  });
});
