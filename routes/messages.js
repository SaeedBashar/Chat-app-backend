
const express = require('express')
const msg = require('../controllers/messages')
const Router = express.Router()

Router.post('/send', msg.messageSend)
Router.post('/get-all', msg.getMessages)

module.exports = Router
