const _ = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item
	}

	const blogsLikes = blogs.map((blogs) => blogs.likes)

	return blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const blogsLikes = blogs.map((blogs) => blogs.likes)
	const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes))
	const largestInfo = blogs[largestIndex]

	return {
		title: largestInfo.title,
		author: largestInfo.author,
		likes: largestInfo.likes,
	}
}

const mostBlogs = (blogs) => {
	const blogsAuthor = blogs.map((blogs) => blogs.author)

	let mode = _.chain(blogsAuthor)
		.countBy()
		.entries()
		.maxBy(_.last)
		.thru(_.head)
		.value()

	let count = 0

	blogsAuthor.forEach((element) => {
		if (element === mode) {
			count += 1
		}
	})

	return {
		author: mode,
		blogs: count,
	}
}

const calculateAuthorStats = (blogs) => {
	const blogsByAuthor = _.groupBy(blogs, 'author')

	const authorLikesStats = _.map(blogsByAuthor, (authorBlogs) => ({
		author: authorBlogs[0].author,
		likes: _.sumBy(authorBlogs, 'likes')
	}))

	const topAuthor = _.maxBy(authorLikesStats, 'likes')

	return {
		author: topAuthor.author,
		likes: topAuthor.likes
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes: calculateAuthorStats,
}
