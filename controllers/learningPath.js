const LearningPath = require('../models/learningPaths')
const User = require('../models/users')
const Sticky = require('../models/stickies')
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
    const allPaths = await LearningPath.find().populate('author')
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

    res.json(savedPath)
})


//deleting path
pathRouter.delete('/:id', async(req, res) => {
    const pathId = req.params.id

    try{
        //remove stickies related to path
        await Sticky.deleteMany({learningPath: pathId})
        //delete path
        await LearningPath.findByIdAndRemove(pathId)
        res.status(204).end()
    }catch(error){
        res.status(500).json({error: "server error!"})
    }

    
    
})

module.exports = pathRouter