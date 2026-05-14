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
    await expect(page.getByRole('button', { name: 'login'})).toBeVisible()
  })
  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('salainen')
      await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/api/login') && resp.status() === 200),
        page.getByRole('button', { name: 'login' }).click()
      ])
      await expect(page.getByRole('button', { name: 'logout'})).toBeVisible()
    })
    
   test('fails with wrong credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('mluukkai')
    await page.getByPlaceholder('Password').fill('sdgre')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Wrong username or password')).toBeVisible()
    })  })
  
describe('when logged in', () => {
  beforeEach(async ({ page }) => {
    await page.getByPlaceholder('Username').fill('mluukkai')
    await page.getByPlaceholder('Password').fill('salainen')
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/login') && resp.status() === 200),
      page.getByRole('button', { name: 'login' }).click()
    ])
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByPlaceholder('title').fill('iugiug')
    await page.getByPlaceholder('author').fill('wrhrnyjyr')
    await page.getByPlaceholder('url').fill('hseghreh')
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.getByText('iugiug wrhrnyjyr')).toBeVisible()
    })
  })
})