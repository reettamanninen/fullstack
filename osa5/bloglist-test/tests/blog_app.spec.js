const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('sdgre')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('wetrwt')
      await page.getByPlaceholder('author').fill('wrhrnyjyr')
      await page.getByPlaceholder('url').fill('hseghreh')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByText('wetrwt wrhrnyjyr').waitFor()
      await expect(page.getByText('wetrwt wrhrnyjyr')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('title').fill('test blog')
        await page.getByPlaceholder('author').fill('test author')
        await page.getByPlaceholder('url').fill('testurl')
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByText('test blog test author').waitFor()
      
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })
  })