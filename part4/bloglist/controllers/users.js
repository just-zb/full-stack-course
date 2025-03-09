const UserRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

UserRouter.post('/',async (req, res)=>{
    const { username, password,name } = req.body
    if (!username || !password) {
        return res.status(400).send('missing Username or password')
    }
    if (username.length <=3 || password.length <=3) {
        return res.status(400).send('username or password length must be greater than 3')
    }
    // password hash
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await user.save()
    return res.status(201).send(savedUser)
})

UserRouter.get('/',async (req, res)=>{
    const users = await User.find({}).populate('blogs')
    return res.status(200).json(users)
})

module.exports = UserRouter