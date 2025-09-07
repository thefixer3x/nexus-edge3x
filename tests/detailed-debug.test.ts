import { test, expect } from '@playwright/test';

test('detailed debug with console logging', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    console.log('Browser console:', msg.type(), msg.text());
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });
  
  // Listen for request failures
  page.on('requestfailed', request => {
    console.log('Request failed:', request.url(), request.failure()?.errorText);
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  
  // Get the page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if there are any JavaScript errors
  const errors = await page.evaluate(() => {
    return window.errors || [];
  });
  console.log('JavaScript errors:', errors);
  
  // Try to find the main content
  const bodyText = await page.locator('body').textContent();
  console.log('Body text length:', bodyText?.length);
  
  // Check if React app is mounted
  const appElement = await page.locator('#root').count();
  console.log('App root element count:', appElement);
  
  if (appElement > 0) {
    const appContent = await page.locator('#root').textContent();
    console.log('App content (first 500 chars):', appContent?.substring(0, 500));
  }
});