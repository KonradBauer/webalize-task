import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Webalize/)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Webalize-task: front')
  })

  test('can navigate to /news', async ({ page }) => {
    await page.goto('/news')

    await expect(page).toHaveURL(/\/news/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('can navigate to /faq', async ({ page }) => {
    await page.goto('/faq')

    await expect(page).toHaveURL(/\/faq/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('can navigate to /integrations', async ({ page }) => {
    await page.goto('/integrations')

    await expect(page).toHaveURL(/\/integrations/)
    await expect(page.locator('body')).toBeVisible()
  })

  test('shows 404 page for unknown route', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')

    await expect(page.locator('text=404')).toBeVisible()
  })
})
