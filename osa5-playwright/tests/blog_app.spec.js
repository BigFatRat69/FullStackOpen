const { test, describe, expect, beforeEach } = require('@playwright/test')
const { createBlog, loginWith } = require('./helper')
const { create } = require('domain')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Eetu Testaaja',
        username: 'etestaaja',
        password: 'etestaaja'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Tero Testaaja',
        username: 'ttestaaja',
        password: 'ttestaaja'
      }
      })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blogs')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'etestaaja', 'etestaaja1')

    await expect(page.getByText('Invalid Credentials')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'etestaaja', 'etestaaja')

    await expect(page.getByText('Eetu testaaja logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'etestaaja', 'etestaaja')
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog')
        await createBlog(page, 'second blog')
      })

      test('one of those can be liked', async ({ page }) => {
        const blog = page.locator('.blog', { hasText: 'first blog' })

        await blog.getByRole('button', { name: 'View' }).click()
        await blog.getByRole('button', { name: 'Like' }).click()

        const updatedBlog = page.locator('.blog', { hasText: 'first blog' })
        await expect(updatedBlog.getByText('Likes: 1')).toBeVisible()
      })
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'A blog created by playwright')
      })
  
        test('blog can be opened', async ({ page }) => {
            await page.getByRole('button', {name: 'View'}).click()
            await expect(page.getByText('Likes: 0')).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', {name: 'View'}).click()
            await page.getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText('Likes: 1')).toBeVisible()
        })

      test('a blog can be deleted', async ({ page }) => {
        const blog = page.locator('.blog', { hasText: 'A blog created by playwright' })
        await blog.getByRole('button', { name: 'view' }).click()

        page.once('dialog', dialog => dialog.accept())

        await blog.getByRole('button', { name: 'delete' }).click()
        await expect(blog).toHaveCount(0)
      })
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Another blog created by playwright')

      await expect(page.getByText('Another blog created by playwright')).toBeVisible()
      await expect(page.getByText('Playwright Tester')).toBeVisible()
    })

    describe('and a blog exists pt2', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog created by Eetu')
      })

      test('only user who created a blog can see delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'Log Out' }).click()

        await loginWith(page, 'ttestaaja', 'ttestaaja')

        const blog = page.locator('.blog', { hasText: 'Blog created by Eetu' })
        await blog.getByRole('button', { name: 'view' }).click()

        await expect(blog.getByRole('button', { name: 'delete' })).toHaveCount(0)
      })
    })
  })
})