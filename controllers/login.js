const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const config = require('../utils/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email}).populate('paths')
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
        return res.status(401).json({
            error: "invalid username or password"
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken,
         config.SECRET,
         {expiresIn: 60*60}
         )
    res.status(200)
    .send({token, email: user.email, firstName: user.firstName, lastName: user.lastName, paths: user.paths})
})

module.exports = loginRouter