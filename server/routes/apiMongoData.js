const express = require('express')

// const mongoose = require('mongoose')

const {Temperature, TestData, DateData, DataSet} = require('../models/DataModel');

const dotenv = require('dotenv');
const { findOne } = require('../models/UserModel');
dotenv.config()

const router = express.Router();




// const sizeSchema = new mongoose.Schema({
//   date1pd: [Date],
//   date5pd: Date,
//   arr1: [Number],
//   arr2: [String],
//   Str1: String,
//   num: Number
// })
// const sizeSet = mongoose.model('SizeSeS', sizeSchema)

//----middleware-----------------------------------------

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

//----ROUTES---------------------------------------------

router.post('/api/saveTemperature', async(req, res) => {
console.log('req.body', req.body)
  try {
    const res = await Temperature.create({
      id: req.body.id,
      label: req.body.label,
      unit: req.body.unit,
      values: req.body.values,
      date: req.body.date
    })
    console.log("RES:",res)
    res.status(200).send({status: 'ok', message: 'Temperature Data saved'})
    return;
  } catch (error) {

    console.log("ERROR",error)
    res.status(400).send({status: 'error', error})
    return;
  }
})

//.........................................................

router.get('/api/getTemp', async(req, res) => {
  console.log("id:",req.query.id)
  try {
    const result = await Temperature.findOne({id: req.query.id})
    console.log("res",result)
    return res.status(200).send({ status: 'ok', message: 'Data found', data: result });
  } catch (error) {
    res.status(400).send({ status: 'error', error})
    return;
  }
})

//tests
router.post('/api/size', async(req, res) => {
  try {
    const result = await sizeSet.create({
      date5pd: Date.now(),
      arr1: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      arr2: ["test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test","test"],
      Str1: "alsdjkföasdjifaoir füaoiwrun",
      num: 66666
    })
    res.status(200).send({status: 'ok', result})
    return;
  } catch (error) {
    res.status(400).send({status: 'error', error})
    return;
  }
})


module.exports = router;