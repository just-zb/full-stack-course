const BlogRouter = require('express').Router()
const Blog = require("../models/blog")
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

// changed to middleware
// const getTokens = request =>{
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

BlogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

BlogRouter.post('/', async (request, response) => {
    const decodedToken = request.user
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: decodedToken.id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

BlogRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const decodedToken = request.user
    const blog = await Blog.findById(blogId)
    if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(401).json({ error: 'this blog does not belong to the user' })
    }
    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
})

BlogRouter.put('/:id', async (request, response) => {
    const blogId = request.params.id
    const blog = await Blog.findByIdAndUpdate(blogId,request.body,{new:true,runValidators:true,context:"query"})
    response.status(200).json(blog)
})
module.exports = BlogRouter;