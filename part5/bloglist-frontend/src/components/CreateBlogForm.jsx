import { useState } from 'react'

const CreateBlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        await addBlog({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
        <h1>Create new Form</h1>
        <form onSubmit={handleCreateBlog}>
            title:<input type='text' value = {title} name='title' id='title' data-testid='title'
                         onChange={(e) => setTitle(e.target.value)} />
            <br/>
            author:<input type={'text'} value={author} name='author' id='author' data-testid='author'
                          onChange={(e) => setAuthor(e.target.value)} />
            <br/>
            url:<input type={'text'} value={url} name='url' id='url' data-testid='url'
                       onChange={(e) => setUrl(e.target.value)} />
            <br/>
            <button type={'submit'}>create</button>
        </form>
        </div>
    )
}
export default CreateBlogForm