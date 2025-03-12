import { useState } from 'react'
const Blog = ({ blog,deleteVisible,deleteBlog,updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState(blog.likes)
  const toggleVisibility = () => {setVisible(!visible)}

  const likePlus = async () => {
      await updateBlog({...blog, likes: like + 1})
        setLike(like + 1)
  }

  const handleDeleteBlog = async ()=>{
      deleteBlog(blog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (visible){
    return (
        <div style={blogStyle} className='blog'>
          <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div>
          {blog.title}<button onClick={toggleVisibility}>hide</button>
          <br/>
          {blog.url}
          <br/>
          likes: {like}<button onClick={likePlus}>like</button>
          <br/>
          {blog.author}
            <br/>
            <button style={deleteVisible} onClick={handleDeleteBlog}>delete</button>
        </div>
        </div>

    )
  }else {
    return (
        <div style={blogStyle} className='blog'>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
    )
  }
}

export default Blog