const express = require('express')
const app = express()
var cors = require('cors')
const port = 3001

const mongoose = require('mongoose');
// const User = require('./models/UserModel')

const dotenv = require('dotenv');
dotenv.config()

const bcrypt = require('bcrypt');
const { request } = require('express');

const apiUser = require('./routes/apiMongoUser')


//------------------------------------------------------

const MONGO_URI = process.env.EXPRESS_MONGO_URI;


//----middleware----------------------------------------

app.use(express.json())
app.use(cors())

app.use(async function (req, res, next) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URI);
  next();
})

app.use(apiUser);

//------------------------------------------------------

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})