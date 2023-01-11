const express = require('express')

// const mongoose = require('mongoose')

const { Diary, Group, Item, Temperature } = require('../models/DataModel');

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

  console.log("body", req.body.id)

  try {
    const data = new Diary({
      id: req.body.id,
      diaryName: req.body.diaryName,
      date: req.body.date,
      groups: req.body.groups
    })
    data.save(function (err) {
      if (err) return handleError(err);
    });

    console.log("data:", data)
    res.status(200).send({ status: "ok", message: "new diary created", data });
    return;
  } catch (error) {
    console.log("error: ", error)
    res.status(400).send({ status: 'error', message: '', error })
  }
})

//.........................................................

router.get('/api/getDiary', async (req, res) => {
  console.log("id:", req.query.id)

    try {
      const result = await Diary.findOne({ id: req.query.id })
      console.log("res", result)
      return res.status(200).send({ status: 'ok', message: 'Diary found', data: result });
    } catch (error) {
      res.status(400).send({ status: 'error', error })
      return;
    }
  
})

//..............................................................

router.post('/api/saveData', async(req, res) => {
  console.log(req.body)

  try {
    const result =  Diary.findOneAndUpdate( { id: req.body.id, $match: { id: req.body.groupId, name: req.body.itemName } }, { $push: {values: "222"} } ,
      { new: true,
      // upsert: true,
      rawResult: true })

    // ([{ $match: { 'name.last': 'Ghost' } }]);


    console.log("result",result)

    res.status(200).send({ status: '0k', message: 'saved data'})
  } catch (error) {
    res.status(400).send({status: 'error', message: "Daten nicht gefunden", error})
  }
})



// const tempCar = await Car.findOneAndUpdate(
//   {
//     make: req.params.make,
//   },
//   { $set: { "models.$[e1].reviews.$[e2]": result.value } },
//   {
//     arrayFilters: [
//       { "e1.name": req.params.model },
//       { "e2._id": req.params._id },
//     ],
//   }
// );

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
    res.status(400).send({ status: 'error' , error})
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