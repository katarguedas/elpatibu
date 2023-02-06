const express = require('express')

// const mongoose = require('mongoose');
const User = require('../models/UserModel')

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config()

const router = express.Router();


//----middleware-----------------------------------------

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

router.use(cookieparser());

//----ROUTES---------------------------------------------


//--- verify user -- LOGIN ------------------------------

router.post('/api/login', async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).send({ status: "error", message: "Invalid user" })
  } else {
    const isPasswordValid = await bcrypt.compare(req.body.pwd, user.pwd)

    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          diaries: user.diaries
        }, process.env.EXPRESS_ACCESS_JWT_KEY,
        {
          expiresIn: '20m'
        }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email
        }, process.env.EXPRESS_REFRESH_TOKEN_KEY,
        {
          expiresIn: '24h'
        });
      // Assigning refresh token in http-only cookie 
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        // maxAge: 24 * 60 * 60 * 1000 // 1 day
        maxAge: 24 * 60 * 60 * 1000
      });

      res.status(200).send({ status: "ok", message: "user verified", access: accessToken });
      return;
    }
    res.status(400).send({ status: "error", message: "Invalid password" })
  }
})


//--- refresh Token  -------------------------------------

router.post('/api/refreshToken', async (req, res) => {
  // console.log("req", req.body)

  const user = await User.findOne({ email: req.body.email })


  if (!user) {
    res.status(400).send({ status: "error", message: "Invalid user" })
  } else {
    if (req.cookies?.jwt) {
      const refreshToken = req.cookies.jwt;
      // console.log("refreshToken", refreshToken)

      jwt.verify(refreshToken, process.env.EXPRESS_REFRESH_TOKEN_KEY, err => {
        if (err) {
          console.log("Error refreshing accessToken")
          return res.status(406).json({ status: 'error', message: 'Unauthorized' })
        }
        else {
          // console.log("token refreshed")
          const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            diaries: user.diaries
          },
            process.env.EXPRESS_ACCESS_JWT_KEY,
            {
              expiresIn: '20m',
            });
          return res.status(200).send({ status: 'ok', message: 'authorized', access: accessToken });
        }
      })
    } else {
      res.status(400).send({ status: 'error', message: 'invalid user' })
      return;
    }
  }

})

//--- add user ------------------------------------------

router.post('/api/register', async (req, res) => {
  console.log("test")
  const encryptedPassword = await bcrypt.hash(req.body.pwd, 10);

  try {
    const result = await User.create({
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      pwd: encryptedPassword
    });
    res.status(200).send({ status: "ok", message: 'user created', result })
    return;
  } catch (error) {
    if (error.code === 11000) {
      // console.log("existiert schon")
      res.status(400).send({ status: "1", message: 'User already exists', code: 11000, error })
      return;
    } else {
      res.status(400).send({ status: "error", error })
      return;
    }
  }
})

//------------------------------------------------------


// Delete cookie
router.get('/clear-cookie', (req, res) => {
  res.clearCookie('jwt').send();
});


//------------------------------------------------------

router.post('/api/saveDiaryId', async (req, res) => {
  console.log("bin im backend")

  console.log("body", req.body)
  try {
    const result = await User.findOneAndUpdate({ email: req.body.email }, { diaries: req.body.diaryId }, { new: true })
    // console.log("\n result:", result)
    res.status(200).send({ status: 'OK', message: 'saved diaryId', result })
  } catch (error) {
    res.status(400).send({ status: "error", error })
    console.log("error", error)
    return;
  }
})

//------------------------------------------------------

router.get('/api/getEvents', async (req, res) => {

  console.log("id:", req.query.id)
  try {
    const result = await User.findOne({ id: req.query.id })
    // console.log(result)
    // console.log("\n")
    // console.log( "result.events",result.events)
    //.....
    const events = result.events;
    res.status(200).send({ status: 'ok', message: 'found events', events })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'error', error })
    //....
  }
})

//------------------------------------------------------

router.post('/api/saveEvent', async (req, res) => {
  console.log("body", req.body.event)
  try {
    const response = await User.findOneAndUpdate({ id: req.body.id }, { $push: { events: req.body.event } }, { new: true })
    // console.log("response", response)
    res.status(200).send({ status: 'ok', message: 'event added', response })
  } catch (error) {
    res.status(400).send({ message: 'Error updating events', error })
  }
})

//------------------------------------------------------

router.put('/api/deleteEvent', async (req, res) => {
  console.log("body:", req.body)

  try {
    const response = await User.findOne({ id: req.body.userId })

    let index;
    response.events.map((e, i) => {
      // console.log("eventId",req.body.eventId)
      if (e.id === req.body.eventId) {
        // console.log("e.id:", e.id)
        // console.log("gefunden!!!", e, i)
        index = i;
        return e;
      }
    })
    // console.log("Index:", index)
    response.events.splice(index, 1)

    response.save()

    res.status(200).send({ status: 'ok', message: 'Event deleted', response })
  } catch (error) {
    res.status(400).send({ message: "Error deleting the event", error })
  }
})

//------------------------------------------------------

module.exports = router;



//-- END --|