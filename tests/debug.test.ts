import { test, expect } from '@playwright/test';

test('debug homepage content', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Get the page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Get the page content
  const content = await page.content();
  console.log('Page content (first 1000 chars):', content.substring(0, 1000));
  
  // Check if there are any obvious errors
  if (content.includes('Error') || content.includes('500')) {
    console.log('Page contains error indicators');
  }
  
  // Try to find any visible text
  const visibleText = await page.locator('body').textContent();
  console.log('Visible text (first 500 chars):', visibleText?.substring(0, 500));
});