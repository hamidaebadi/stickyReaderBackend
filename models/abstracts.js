const mongoose = require('mongoose')

const abstractSchema = new mongoose.Schema({
    title: String,
    content: String,
    learningPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LearningPath'
    }
})

abstractSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__V
    }
})

const Abstract = mongoose.model('Abstract', abstractSchema)

module.exports = Abstract