const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const router = express.Router();


/************************************************************************
 * MIDDLEWARE
 ****************/

router.use((req, res, next) => {
  // console.log('Time:', Date.now());
  next();
})

/************************************************************************
 * ROUTES
 ****************/

router.get('/api/WeatherData', async (req, res) => {

  const urlConst = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?";
  const lang = "de";
  const contentType = "json";
  const unitGroup = "metric";
  const aggregateHours = "24";
  const key = process.env.EXPRESS_WEATHER_VISUALCROSSING_KEY;

  let url = `${urlConst}&unitGroup=${unitGroup}&contentType=${contentType}&lang=${lang}&startDateTime=${req.query.start}&endDateTime=${req.query.end}&aggregateHours=${aggregateHours}&location=${req.query.city}&key=${key}`;

  // console.log("Stadt:", req.query.city, " start:", req.query.start, " Ende:", req.query.end);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("status:", response.status)
    res.status(200).send({status: 'ok', message: 'data found', data: data})
  } catch (error) {
    console.log("Error, weather data couldn't be fetched", error)
  }
})

//******************************************* */

module.exports = router;

//-- END --|
