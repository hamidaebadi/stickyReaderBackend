const LearningPath = require('../models/learningPaths')
const User = require('../models/users')
const pathRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

pathRouter.get('/', async(req, res) => {
    const allPaths = await LearningPath.find()
    res.json(allPaths) 
})

pathRouter.post('/', async(req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'Token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    const path = new LearningPath({
        topic: body.topic,
        category: body.category,
        description: body.description,
        author: user._id
    })

    const savedPath = await path.save()
    user.paths = user.paths.concat(savedPath._id)
    await user.save()
    
    res.json(savedPath)
})

module.exports = pathRouter