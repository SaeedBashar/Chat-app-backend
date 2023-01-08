const express = require('express')
const cors = require('cors');

const authRoutes = require('./routes/auth')

require("dotenv").config();

const app = express()

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`[STARTING] Server starting at port: ${process.env.PORT}`);
})