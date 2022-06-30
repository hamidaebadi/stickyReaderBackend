const mongoose = require('mongoose')

const learningPathSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    category: {
        type: String,
        requried: true
    },
    description: String,
    stickies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sticky'
    }],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

learningPathSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const LearningPath = mongoose.model('LearningPath', learningPathSchema)

module.exports = LearningPath