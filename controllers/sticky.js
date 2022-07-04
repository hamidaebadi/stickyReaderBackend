const stickyRouter = require('express').Router()
const Sticky = require('../models/stickies')
const LearningPath = require('../models/learningPaths')
const User = require('../models/users')

stickyRouter.post('/', async(req, res) => {
    const body = req.body
    const learningPath = await LearningPath.findOne({topic: body.pathTopic})
    const author = await User.findById(body.id)
    const newStickyObj = new Sticky({
        content: body.content,
        author: author._id,
        learningPath: learningPath._id,
        publishedDate: new Date()
    })
    
    try{
        const returnedObj = await newStickyObj.save()
        learningPath.stickies = learningPath.stickies.concat(returnedObj._id)
        await learningPath.save()
        res.json(returnedObj)
    }catch(exception){
        console.log(exception)
        res.status(500).json({error: "Something went wront on server!"})
    }
    
})

module.exports = stickyRouter