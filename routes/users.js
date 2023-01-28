
const express = require('express')
const users = require('../controllers/users')
const Router = express.Router()

Router.get('/all-users/:id', users.getAllUsers)
Router.get('/get-status/:id', users.getStatus)
Router.post('/update-status', users.updateStatus)
module.exports = Router
