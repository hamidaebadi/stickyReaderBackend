const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.post('/', async(req, res) => {
    //create new user
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)


    //check if user already exists
    const existingUser = await User.findOne({ email: body.email })
    if(existingUser){
        return res.status(400).json({
            error: "User with this email address already exists!"
        })
    }
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        passwordHash,
    })

    const savedUser = await user.save()
    res.json(savedUser)
    
})

module.exports = userRouter

