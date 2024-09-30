import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { validCredentials } from '../test-data/credentials.js';

test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

test('should measure page load performance', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to Reddit
    await loginPage.navigate();

    // Step 2: Login
    const startTime = Date.now();
    await loginPage.login(validCredentials.username, validCredentials.password);

    // Step 3: Measure page load time
    await page.waitForLoadState('load'); // Wait for full page load
    const loadTime = Date.now() - startTime;

    console.log(`Page loaded in ${loadTime}ms`);

    // Step 4: Verify that load time is within an acceptable threshold
    test.expect(loadTime).toBeLessThan(5000); 
});
