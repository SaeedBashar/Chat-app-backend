
const express = require('express')
const users = require('../controllers/users')
const Router = express.Router()

Router.get('/all-users/:id', users.getAllUsers)

module.exports = Router
