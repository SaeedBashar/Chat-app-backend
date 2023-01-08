const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')

require("dotenv").config();

const app = express()

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true)
mongoose
.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Database Connected Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/auth', authRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`[STARTING] Server starting at port: ${process.env.PORT}`);
})