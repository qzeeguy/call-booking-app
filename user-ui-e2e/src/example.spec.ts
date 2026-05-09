import { test, expect } from '@playwright/test';

test('app loads successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' }); // ✅ wait for full load

  await expect(page.locator('body')).toBeVisible();
});