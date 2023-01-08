
const express = require('express')
const auth = require('../controllers/auth')
const Router = express.Router()

Router.post('/signin', auth.signin)
Router.post('/signup', auth.signup)

module.exports = Router
