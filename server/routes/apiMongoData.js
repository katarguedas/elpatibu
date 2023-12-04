const express = require('express')
const { Diary } = require('../models/DataModel');
const dotenv = require('dotenv');
dotenv.config()

const router = express.Router();

/************************************************************************
 * MIDDLEWARE
 ****************/

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

/************************************************************************
 * ROUTES
**/

/************************************************************************
 * Save new diary 
 ***************************/

router.post('/api/newDiary', async (req, res) => {

  try {
    const data = new Diary({
      id: req.body.id,
      diaryName: req.body.diaryName,
      city: req.body.city,
      date: req.body.date,
      timestamp: req.body.ts,
      groups: req.body.groups
    })
    data.save(function (err) {
      if (err) return handleError(err);
    });

    res.status(200).send({ status: "ok", message: "new diary created", data });
    return;
  } catch (error) {
    res.status(400).send({ status: 'error', message: '', error })
  }
})


/*****************************************************************
 * get diary
 ***************************/

router.get('/api/getDiary', async (req, res) => {
  console.log("id:", req.query.id)

  try {
    const result = await Diary.findOne({ id: req.query.id })
    return res.status(200).send({ status: 'ok', message: 'Diary found', data: result });
  } catch (error) {
    res.status(400).send({ status: 'error', error })
    return;
  }
})

/*****************************************************************
 * Save data in the diary
 *****************************/

router.put('/api/saveData', async (req, res) => {

  try {
    const response = await Diary.findOne({ id: req.body.id })

    if (response) {
      if (req.body.update === false) {

        response.date.push(req.body.date)
        response.timestamp.push(req.body.timestamp)
      }

      response.groups.map(e => {
        e.id === req.body.groupId ?
          e.items.map(el => {
            req.body.items.map(element => {
              if (element.id === el.id) {
                console.log("GEFUNDEN!", el.id, el.values, element.values.slice())
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
    res.status(400).send({ status: 'error', message: "Daten nicht gefunden", error })
  }
})



//*****************************************************************

module.exports = router;

//-- END --|
