const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const learningPathRouter = require('./controllers/learningPath')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
.then(()=>console.log("Connected to database"))
.catch((error) => console.log("Error while connecting to database: ", error))

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/paths', learningPathRouter)


module.exports = app