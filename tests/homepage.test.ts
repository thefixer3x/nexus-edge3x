import { test, expect } from '@playwright/test';

test('homepage renders correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Check if the page title is correct
  await expect(page).toHaveTitle(/Seftec.Store/);
  
  // Check if main elements are present
  await expect(page.getByText('The Future of Business Commerce')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start Shopping' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
  
  console.log('Homepage test passed!');
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Test navigation to products page
  await page.getByRole('link', { name: 'Start Shopping' }).click();
  await expect(page).toHaveURL(/.*products/);
  
  console.log('Navigation test passed!');
});