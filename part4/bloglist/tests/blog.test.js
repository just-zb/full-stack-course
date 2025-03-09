const {test,describe,beforeEach,after}=require('node:test')
const {totalLikes,dummy,favoriteBlog, mostBlog,mostLikes} = require('../utils/list_helper')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const {initBlogs,blogsInDB} = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = async ()=>{
    const request = await api
        .post('/api/login')
        .send({
            "username": "test",
            "password": "123456"
        }).expect(200)
    return request.body.token
}

beforeEach(async ()=>{
    await Blog.deleteMany({})
    const blogObjs = initBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjs.map(blogObj => blogObj.save()))
})

// api test
describe('blogs api test',()=>{
    const testUser = {
        username: 'abcdef',
        name: 'Matti Luukkainen',
        password: '123456',
    }

    test('notes are returned as json', async () => {
        const token = await getToken()
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all notes are returned',async ()=>{
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length,initBlogs.length)
    })
    test('there are 6 blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initBlogs.length)
    })
    test('return json has id param', async ()=>{
        const response = await api.get('/api/blogs')
        assert.ok(response.body[0].id !== undefined)
    })

    test('post blog failed without authorization', async ()=>{
        const newBlog =     {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogAtEnd = await blogsInDB()
        assert.strictEqual(blogAtEnd.length,initBlogs.length)
    })
    test('post a blog', async ()=>{
        const token = await getToken()
        const newBlog =     {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogAtEnd = await blogsInDB()
        assert.strictEqual(blogAtEnd.length,initBlogs.length+1)
    })
    test('if miss likes then set to 0', async () => {
        const token = await getToken()
        const newBlog =     {
            title: "kksk",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
        assert.ok(response.body.likes===0)
    })
    test('if miss title or url return 400 bad request', async ()=>{
        const token = await getToken()
        let newBlog =     {
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        newBlog = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    describe('delete blog', ()=>{
        test('delete blog by id',async ()=>{
            const token = await getToken()
            const id = initBlogs[0]._id
            await api
                .delete(`/api/blogs/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const blogs = await blogsInDB()
            assert.strictEqual(blogs.length+1,initBlogs.length)
        })
    })
    describe('update blog',()=>{
        test('update blog by id',async ()=>{
            const token = await getToken()
            const id = initBlogs[0]._id
            const blog = initBlogs[0]
            blog.title = "zhubao's blog"
            blog.author = "zhubao"
            const updatedBlog = await api
                .put(`/api/blogs/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            assert.strictEqual(updatedBlog.body.title,"zhubao's blog")
            assert.strictEqual(updatedBlog.body.author,"zhubao")
        })
    })
})

after(async ()=>{
    await mongoose.connection.close()
})
test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    test('list is empty', done => {
        assert.ok(totalLikes([]) === 0)
    })

    test('list contains one', done => {
        assert.strictEqual(totalLikes([{likes:10}]),10)
    })
    test('list all', done => {
        assert.ok(totalLikes(initBlogs) === 36)
    })
})

describe('favoriteBlog',()=>{
    test('list is empty', done => {
        assert.ok(favoriteBlog([])===null)
    })
    test('list contains one', done => {
        assert.deepStrictEqual(favoriteBlog([{
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }]), {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        })
    })
    test('full list', done => {
        assert.deepStrictEqual(favoriteBlog(initBlogs),{
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})
describe('mostBlog', () => {
    test('list is empty', done => {
        assert.ok(mostBlog([]))
    })
    test('full list', done => {
        assert.deepStrictEqual(mostBlog(initBlogs),{
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})
describe('mostLikes', () => {
    test('list is empty', done => {
        assert.ok(mostLikes([]))
    })
    test('full list', done => {
        assert.deepStrictEqual(mostLikes(initBlogs),{
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

