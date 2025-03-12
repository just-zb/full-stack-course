import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import Toggleable from './components/Toggleable.jsx'
import CreateBlogForm from './components/CreateBlogForm.jsx'
import LoginForm from './components/LoginForm.jsx'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const blogRef = useRef()

  const handleLogin =async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }catch (exception) {
      console.log(exception)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  const [blogs, setBlogs] = useState([])

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} is created`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (deleteBlog) => {
    if (window.confirm(`Are you sure you want to delete ${deleteBlog.title} by ${deleteBlog.author}`)){
      try {
        await blogService.del(deleteBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      }catch (exception) {
        console.log(exception)
      }
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id,blog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    }catch (exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const parseUser = JSON.parse(loggedUserJSON)
      setUser(parseUser)
      blogService.setToken(parseUser.token)
    }
  },[])

  if (user === null) {
    return (<LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} message={message} username={username} password={password}/>
    )
  }
  return (
    <div>
      <Notification message={message}/>
      <h2>blogs</h2>
      <p>{user.username} logged in</p><button onClick={handleLogout}>Logout</button>

      <Toggleable buttonLabel='new blog' ref={blogRef}>
        <CreateBlogForm addBlog={addBlog}/>
      </Toggleable>

      {blogs
        .sort((blog1,blog2) => blog2.likes-blog1.likes)
        .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteVisible={{ display: user.username === blog.author ? '' : 'none' }} deleteBlog={deleteBlog}
        />)
      }
    </div>
  )
}

export default App