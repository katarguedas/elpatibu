const express = require('express')

// const mongoose = require('mongoose')

const { Diary } = require('../models/DataModel');

const dotenv = require('dotenv');
const { findOne, find } = require('../models/UserModel');
dotenv.config()

const router = express.Router();


//----middleware-----------------------------------------

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

//---- ROUTES ---------------------------------------------

router.post('/api/newDiary', async (req, res) => {

  console.log("body", req.body.date)

  try {
    const data = new Diary({
      id: req.body.id,
      diaryName: req.body.diaryName,
      city: req.body.city,
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
    // console.log("res", result)
    return res.status(200).send({ status: 'ok', message: 'Diary found', data: result });
  } catch (error) {
    res.status(400).send({ status: 'error', error })
    return;
  }
})

//..............................................................

router.put('/api/saveData', async (req, res) => {

  console.log("hier", req.body.ts)
  console.log("hier", req.body.update)

  try {
    const response = await Diary.findOne({ id: req.body.id })
    // console.log(response)

    if (response !== null) {
      console.log("bin drin?")
      if (req.body.update === false) {
        console.log("hier, bin drin, denn update steht auf false")
        response.date.push(req.body.ts)
      }

      response.groups.map(e => {
        e.id === req.body.groupId ?
          e.items.map(el => {
            req.body.items.map(element => {
              if (element.id === el.id) {
                el.values = element.values.slice()
              }
            })
          })
          : null
      })
    }

    response.save()

    res.status(201).send({ status: '0k', message: 'saved data' })
  } catch (error) {
    console.log("....................... \n nix gefunden")
    res.status(400).send({ status: 'error', message: "Daten nicht gefunden", error })
  }
})

//............................................................




//.........................................................



module.exports = router;