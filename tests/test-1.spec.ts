import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('htpps://cloudtesting.contosotraders.com/');
  await page.getByPlaceholder('Search by product name or search by image').click();
  await page.getByPlaceholder('Search by product name or search by image').fill('xbox');
  await page.getByPlaceholder('Search by product name or search by image').press('Enter');
  await page.getByPlaceholder('Search by product name or search by image').click();
  // record new....

  // assertion to the od our test and expect that our xbox is visible in the bag
  
});