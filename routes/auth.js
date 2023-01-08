
const express = require('express')
const auth = require('../controllers/auth/auth')
const Router = express.Router()

Router.get('/login', auth.login)

module.exports = Router
