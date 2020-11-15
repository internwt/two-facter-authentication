const express = require('express')
const app = express.Router()
const {signUp } = require('./userController')

app.post('/signUp',signUp)


module.exports = app