const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if (blogs.length < 1) {
        return 0
    }
    return blogs.reduce((total, blog) => total+blog.likes,0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length < 1) {
        return null
    }
    let maxLikes = 0
    let target = null
    blogs.forEach(blog => {if (blog.likes>maxLikes) {maxLikes=blog.likes;target=blog}})
    return target
}

const mostBlog = (blogs) => {
    if (blogs.length < 1) {
        return {}
    }
    const groupedByAuthor = _.groupBy(blogs, 'author');
    const authorsWithCount = _.map(groupedByAuthor, (blogs,author) => {
        return {
            author: author,
            blogs: blogs.length
        }
    })
    return _.maxBy(authorsWithCount, 'blogs')
}
const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return {}
    }
    const groupedByAuthor = _.groupBy(blogs, 'author');
    const authorsWithCount = _.map(groupedByAuthor, (blogs, author) => {
        return {
            author: author,
            likes: _.reduce(blogs,(sum,blog) => sum + blog.likes,0)
        }
    })
    return _.maxBy(authorsWithCount, 'likes')
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}