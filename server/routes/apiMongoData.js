const express = require('express')

// const mongoose = require('mongoose')

const { Temperature, TestData, DateData, DataSet } = require('../models/DataModel');

const dotenv = require('dotenv');
const { findOne } = require('../models/UserModel');
dotenv.config()

const router = express.Router();


//----middleware-----------------------------------------

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

//---- ROUTES ---------------------------------------------

router.post('/api/newDiary', async (req, res) => {
  
  console.log("body", req.body)
  // console.log(
  //   'id:', req.body.id,
  //   'diaryName', req.body.diaryName,
  //   'date', req.body.date,
  //   'vital', req.body.vital,
  //   'weight', req.body.weight,
  //   'wellBeing', req.body.wellBeing,
  //   'mood', req.body.mood,
  //   'sleep', req.body.sleep,
  //   'meteorosensitivity', req.body.meteorosensitivity,
  //   'symptoms', req.body.symptoms
  // );
  
//   const Tank = mongoose.model('Tank', yourSchema);

// const small = new Tank({ size: 'small' });
// small.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });
// // or

// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });
// // or, for inserting large batches of documents
// Tank.insertMany([{ size: 'small' }], function(err) {
// });

  try {
    // const result = await DataSet.create( req.body, function (err) {
    //   if (err) return handleError(err);
    // }
    const data = new DataSet({ 
      id: req.body.id,
      diaryName: req.body.diaryName,
      date: req.body.date,
      // vital: req.body.vital,
      // weight: req.body.weight,
      // wellBeing: req.body.wellBeing,
      // mood: req.body.mood,
      // sleep: req.body.sleep,
      // meteorosensitivity: req.body.meteorosensitivity,
      // symptoms: req.body.symptoms
    })
    data.save(function (err) {
         if (err) return handleError(err);
       });

    console.log("data:", data)
    res.status(200).send({ status: "ok", message: "new diary created" });
    return;
  } catch (error) {
    console.log("error: ", error)
    res.status(400).send({ status: 'error', message: '', error })
  }
})

//............................................................

router.post('/api/saveTemperature', async (req, res) => {
  console.log('req.body', req.body)
  try {
    const result = await Temperature.create({
      id: req.body.id,
      label: req.body.label,
      unit: req.body.unit,
      values: req.body.values,
      date: req.body.date
    })
    console.log("result:", result)
    res.status(200).send({ status: 'ok', message: 'Temperature Data saved', data: result })
    return;
  } catch (error) {

    console.log("ERROR", error)
    res.status(400).send({ status: 'error', error })
    return;
  }
})

//.........................................................

router.get('/api/getTemp', async (req, res) => {
  console.log("id:", req.query.id)
  try {
    const result = await Temperature.findOne({ id: req.query.id })
    console.log("res", result)
    return res.status(200).send({ status: 'ok', message: 'Data found', data: result });
  } catch (error) {
    res.status(400).send({ status: 'error', error })
    return;
  }
})



module.exports = router;