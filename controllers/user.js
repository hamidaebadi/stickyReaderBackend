const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.post('/', async(req, res) => {
    //create new user
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        passwordHash,
    })

    user.save()
    .then(returnedObject => res.json(returnedObject))
    .catch(error => res.json({error: error.message}))
})

module.exports = userRouter

