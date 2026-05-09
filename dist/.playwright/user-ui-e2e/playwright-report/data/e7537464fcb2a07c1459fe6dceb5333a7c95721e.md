# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> app loads successfully
- Location: user-ui-e2e/src/example.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('body')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('body')
    9 × locator resolved to <body></body>
      - unexpected value "hidden"

```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('app loads successfully', async ({ page }) => {
  4 |   await page.goto('/', { waitUntil: 'networkidle' }); // ✅ wait for full load
  5 | 
> 6 |   await expect(page.locator('body')).toBeVisible();
    |                                      ^ Error: expect(locator).toBeVisible() failed
  7 | });
```