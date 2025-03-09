require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoUrl = process.env.NODE_ENV === 'test' ? config.TEST_MONGODB_URL : config.MONGODB_URL

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected!')
}).catch(err => console.log(err))

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.json())

app.use('/api/blogs', middleware.userExtractor,blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app