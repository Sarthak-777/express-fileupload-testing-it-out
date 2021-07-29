const express = require('express')
const userRouter = require('../routers/user')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const app = express()

app.use(fileUpload())
app.use(userRouter)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Process is running on port ${port}`)
})