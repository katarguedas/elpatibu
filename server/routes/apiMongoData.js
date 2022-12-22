const express = require('express')

const Data = require('../models/DataModel')

const dotenv = require('dotenv');
dotenv.config()

const router = express.Router();


//----middleware-----------------------------------------

router.use((req, res, next) => {
//   console.log('Time:', Date.now());
  next();
})

//----ROUTES---------------------------------------------




module.exports = router;