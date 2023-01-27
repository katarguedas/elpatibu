import { useEffect, useState } from "react";

//------------------------------------------------------------------------


const useWeatherAPI = () => {


  const [weatherData, setWeatherData] = useState();
  let temp = [];

  const LOCAL_STORAGE_WEATHER = process.env.REACT_APP_LOCAL_STORAGE_WEATHER;

  // ----------------------------------------------------------------------------


  useEffect(() => {

    if (JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER)) !== null)
      getWeatherData();
  }, [])

  // ----------------------------------------------------------------------------

  const getWeatherData = (city, startDate, endDate) => {

    console.log("city:", city, startDate)

    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER));
    if (data === null)
      getWeatherDataFromBackend(city, startDate, endDate)
  }

  // ------------------------------------

  const convertWeatherData = (city) => {

    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER));

    console.log(data)

    if ((data) && (city)) {
      console.log("weatherdata abgerufen", data.locations[city].values)
      const dataNames = ['date', 'dateStr', 'sealevelpressure', 'maxt', 'precip', 'humidity'];
      const length = data.locations[city].values.length
      let date = [];
      let dateStr = [];
      let humidity = [];
      let sealevelpressure = [];
      let maxt = [];
      let precip = [];
      for (let i = 0; i < length; i++) {
        date.push(data.locations[city].values[i].datetime)
        dateStr.push(data.locations[city].values[i].datetimeStr)
        humidity.push(data.locations[city].values[i].humidity)
        sealevelpressure.push(data.locations[city].values[i].sealevelpressure)
        maxt.push(data.locations[city].values[i].maxt)
        precip.push(data.locations[city].values[i].precip)
      }
      const allWeatherDataIneed = [date, dateStr, sealevelpressure, maxt, precip, humidity];
      for (let i = 2; i < dataNames.length; i++) {
        console.log(data.columns[dataNames[i]].unit)
        temp[i - 2] =
        {
          unit: data.columns[dataNames[i]].unit,
          label: data.columns[dataNames[i]].name,
          values: allWeatherDataIneed[i],
          date: allWeatherDataIneed[0],
          dateStr: allWeatherDataIneed[1],
        }
      }
      setWeatherData(temp)
    }

  }


  //-------------------------------------------------------------------------

  const getWeatherDataFromBackend = async (city, startDate, endDate) => {

    let requestOptions = {
      method: 'GET',
    };
    console.log("city", city)

    await fetch('/api/WeatherData?city=' + city + '&start=' + startDate + '&end=' + endDate, requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log("response", response.data)
        localStorage.setItem(LOCAL_STORAGE_WEATHER, JSON.stringify(response.data))
        convertWeatherData(city)
      })

      .catch(error => console.log("error: ", error))
  }

  return [LOCAL_STORAGE_WEATHER, getWeatherDataFromBackend, weatherData, getWeatherData]
}


export default useWeatherAPI;