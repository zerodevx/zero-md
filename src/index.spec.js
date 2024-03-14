import { test, expect } from '@playwright/test'

test('kitchen sink', async ({ page }) => {
  await page.goto('/')
})
