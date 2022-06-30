const mongoose = require('mongoose')

const stickySchema = new mongoose.Schema({
    stars: {
        type: Number,
        default: 0
    },
    
    content: {
        type: String,
        requied: true
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    learningPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningPath'
    },

})

stickySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__V
    }
})

const Sticky = mongoose.model('Sticky', stickySchema)

module.exports = Sticky