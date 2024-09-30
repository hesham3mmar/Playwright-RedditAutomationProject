import { test, expect } from '@playwright/test'; 
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { validCredentials } from '../test-data/credentials.js';

test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

test.describe('Login Tests', () => {
  test('Verify Login Success', async ({ page }) => {
    test.setTimeout(70000);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    // Navigate to Reddit
    await loginPage.navigate();
    
    // Perform login
    await loginPage.login(validCredentials.username, validCredentials.password);
    
    // Verify successful login by checking the user profile icon
    await expect(homePage.userProfileIcon).toBeVisible();
  });
});