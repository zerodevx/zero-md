import { test, expect } from '@playwright/test'

// test('', async ({ page }) => {})

test.describe('basic tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('src works', async ({ page }) => {
    await expect(page.getByTestId('basic')).toContainText('Test src is loaded')
    await page.getByTestId('removeBtn').click()
    await expect(page.getByTestId('basic')).toContainText('Test fallback is loaded')
    await page.getByTestId('resetBtn').click()
    await expect(page.getByTestId('basic')).toContainText('Test src is loaded')
    await page.getByTestId('emptyBtn').click()
    await expect(page.getByTestId('basic')).toContainText('Test fallback is loaded')
  })

  test('style template works', async ({ page }) => {
    await page.getByTestId('appendBtn').click()
    await page.getByTestId('prependBtn').click()
    await expect(page.locator('.markdown-body p')).toHaveCSS('color', 'rgb(255, 0, 0)')
  })
})

test.describe('hash link tests', () => {
  test('hash link scroll works', async ({ page }) => {
    await page.goto('/fixtures/hashlink.html')
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('hash-link').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.goto('/fixtures/hashlink.html#1914-translation-by-h-rackham')
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })

  test('hash link scroll works in no-shadow', async ({ page }) => {
    await page.goto('/fixtures/hashlink-noshadow.html')
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('hash-link').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.goto('/fixtures/hashlink.html#1914-translation-by-h-rackham', {
      waitUntil: 'networkidle'
    })
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })
})

test.describe('feature tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fixtures/feat.html')
  })

  test('js is highlighted', async ({ page }) => {
    await expect(page.locator('.hljs.language-js .hljs-string')).toHaveText(`'hello world!'`)
  })

  test('unhinted code block is highlighted', async ({ page }) => {
    await expect(page.locator('[class="hljs"] .hljs-string')).toHaveText(
      `'The sum of {0} and {1} is {2}'`
    )
  })

  test('inline katex', async ({ page }) => {
    await expect(page.locator('p:has-text("Inline katex:")>span')).toHaveClass('katex')
  })

  test('block-level katex', async ({ page }) => {
    await expect(page.locator('p:has-text("Block level katex:")+span')).toHaveClass('katex-display')
  })

  test('math code block', async ({ page }) => {
    await expect(page.locator('p:has-text("Math code block:")+span')).toHaveClass('katex-display')
  })

  test('mermaid flowchart', async ({ page }) => {
    await expect(page.locator('p:has-text("Mermaid flowchart:")+pre svg')).toHaveCount(1)
  })

  test('mermaid diagram', async ({ page }) => {
    await expect(page.locator('p:has-text("Mermaid diagram:")+pre svg')).toHaveCount(1)
  })
})
