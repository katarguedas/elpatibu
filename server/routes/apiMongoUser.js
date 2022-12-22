const express = require('express')

// const mongoose = require('mongoose');
const User = require('../models/UserModel')

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config()

const router = express.Router();


//----middleware-----------------------------------------

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

//----ROUTES---------------------------------------------


//--- verify user ---------------------------------------

router.post('/api/login', async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).send({ status: "error", message: "Invalid user", error: error })
  } else {
    const isPasswordValid = await bcrypt.compare(req.body.pwd, user.pwd)

    console.log(isPasswordValid);

    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name
        }, process.env.EXPRESS_ACCESS_JWT_KEY,
        {
          expiresIn: '15m'
        }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email
        }, process.env.EXPRESS_REFRESH_TOKEN_KEY,
        {
          expiresIn: '48h'
        });
      // Assigning refresh token in http-only cookie 
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        // maxAge: 24 * 60 * 60 * 1000 // 1 day
        maxAge: 48 * 60 * 60 * 1000
      });
      // console.log("accessToken:", accessToken)
      res.status(200).send({ status: "ok", message: "user verified", access: accessToken });
      return;
    }
    res.status(400).send({status: "error", message: "Invalid password or email", error})
  }
})

//--- add user ------------------------------------------


router.post('/api/register', async (req, res) => {
  console.log("test")
  const encryptedPassword = await bcrypt.hash(req.body.pwd, 10);
  // console.log("email:", req.body.email)
  // console.log("name:", req.body.name)
  // console.log("pwd:", encryptedPassword)
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
      console.log("existiert schon")
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


module.exports = router;