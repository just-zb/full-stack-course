const { test, expect,describe,beforeEach } = require('@playwright/test')
const helper = require('./helper')
describe('blog app', () => {
    beforeEach(async ({ page ,request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data:{
                username: 'test',
                name: 'test',
                password: '123456'
            }
        })
        await page.goto('/')
    })
    describe('login actions', () => {
            test('Login form is shown and try login', async ({ page }) => {
                const loginButton = await page.getByText('login')
                await loginButton.click()
                await expect(page.getByText('Log in to application')).toBeVisible()

                //check login action
                await page.getByTestId('username').fill('test')
                await page.getByTestId('password').fill('123456')
                await page.getByText('login').click()
                await expect(page.getByText('test logged in')).toBeVisible()
            })

            test('Login fails with wrong password', async ({ page }) => {
                const loginButton = await page.getByText('login')
                await loginButton.click()
                await expect(page.getByText('Log in to application')).toBeVisible()

                await page.getByTestId('username').fill('test')
                await page.getByTestId('password').fill('wrongpassword')
                await page.getByText('login').click()
                await expect(page.getByText('wrong username or password')).toBeVisible()
            })
    }
    )


    describe('when logged in', () => {
        beforeEach(async ({page}) => {
            await helper.loginWith(page, 'test','123456')
        })
        test('a new blog can be created', async ({page}) => {
            await helper.createBlog(page,'Test Blog Title','Test Author','https://test.com')

            const blog = await page.getByText('Test Blog Title Test Author')
            await expect(blog).toBeVisible()
        })
        describe('a blog exists', () => {
            beforeEach(async ({page}) => {
                await helper.createBlog(page,'Test Blog Title','Test Author','https://test.com')
                await helper.createBlog(page,'Test Blog Title 2','Test Author 2','https://test2.com')
                await helper.createBlog(page,'Test Blog Title 3','Test Author 3','https://test3.com')
            })
                test('a blog can be liked', async ({page}) => {
                    const blog = await page.getByText('Test Blog Title Test Author')
                    const viewButton = await blog.getByRole('button', { name: 'view' })
                    await viewButton.click()
                    const likeButton = await page.getByRole('button', { name: 'like' })
                    await likeButton.click()
                    const likes = await page.getByText('likes: 1')
                    await expect(likes).toBeVisible()
                })
        }
        )

    })
})