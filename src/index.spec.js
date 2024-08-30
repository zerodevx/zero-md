import { test, expect } from '@playwright/test'

// test('', async ({ page }) => {})

test.describe('basic tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('src and inline works', async ({ page }) => {
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

  test('dynamically add and move works', async ({ page }) => {
    await page.getByTestId('addBtn').click()
    await expect(page.locator('[data-testid="insertOne"] div')).toHaveCount(2)
    await page.getByTestId('moveBtn').click()
    await expect(page.locator('[data-testid="insert"] [data-hash]')).toHaveCount(2)
    await page.getByTestId('moveBtn').click()
    await expect(page.locator('[data-testid="insert"] [data-hash]')).toHaveCount(2)
  })
})

test.describe('hash link tests', () => {
  test('hash link scroll works', async ({ page }) => {
    await page.goto('/fixtures/hashlink.html')
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('hash-link').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.evaluate(() => window.scrollTo(0, 0))
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('cyrillic').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.goto('/fixtures/hashlink.html#1914-translation-by-h-rackham')
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.goto('/fixtures/hashlink.html#кириллический-заголовок')
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })

  test('hash link scroll works in no-shadow', async ({ page }) => {
    await page.goto('/fixtures/hashlink-noshadow.html')
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('hash-link').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.evaluate(() => window.scrollTo(0, 0))
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.getByText('cyrillic').click()
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
    await page.goto('/fixtures/hashlink-noshadow.html#1914-translation-by-h-rackham')
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
    await expect(page.locator('p:has-text("Mermaid flowchart:")+* svg')).toHaveCount(1)
  })

  test('mermaid diagram', async ({ page }) => {
    await expect(page.locator('p:has-text("Mermaid diagram:")+* svg')).toHaveCount(1)
  })

  test('github alerts', async ({ page }) => {
    await expect(
      page.locator('p:has-text("This is a Github Alert.")').locator('xpath=..')
    ).toHaveClass('markdown-alert markdown-alert-note')
  })
})

test.describe('global config', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fixtures/config.html')
  })

  test('no-shadow', async ({ page }) => {
    expect(await page.locator('zero-md').evaluate((el) => !!el.shadowRoot)).toBe(false)
  })

  test('no-auto', async ({ page }) => {
    expect(await page.locator('.markdown-body').textContent()).toBe('')
  })

  test('body-class', async ({ page }) => {
    await expect(page.locator('.markdown-body')).toHaveClass('markdown-body test')
  })

  test('src', async ({ page }) => {
    await expect(page.locator('zero-md')).toHaveAttribute('src', 'basic.md')
  })
})
