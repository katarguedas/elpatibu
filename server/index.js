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
const apiData = require('./routes/apiMongoData')
const apiWeather = require('./routes/apiWeather')



//------------------------------------------------------

const MONGO_URI = process.env.EXPRESS_MONGO_URI;


//----middleware----------------------------------------

app.use(express.json())
app.use(cors())

// app.use(express.static(path.join(__dirname, "../client/build")));


app.use(async function (req, res, next) {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error)
  }
  next();
})


app.use(apiUser);
app.use(apiData);
app.use(apiWeather);

//------------------------------------------------------

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



// app.get('/', function(req,res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})