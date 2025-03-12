import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('CreateBlogForm calls addBlog with correct details', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<CreateBlogForm addBlog={addBlog} />)

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://testurl.com')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test Blog Title')
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(addBlog.mock.calls[0][0].url).toBe('https://testurl.com')

})