import { useState } from "react";


//------------------------------------------------------------------------


const useWeatherData = () => {


    const [weatherData, setWeatherData] = useState([]);
    const [newObj, setNewObj] = useState();
    let tempObj = [];

    const LOCAL_STORAGE_WEATHER = 'weather data';


    // ----------------------------------------------------------------------------

    const getWeatherData = (city, startDate, endDate) => {

        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER))

        if (data === null)
            getWeatherDataFromBackend(city, startDate, endDate)
        else {
            const dataNames = ['date', 'sealevelpressure', 'maxt', 'precip', 'humidity'];
            const length = data.locations['Oberhausen'].values.length
            let date = [];
            let humidity = [];
            let sealevelpressure = [];
            let maxt = [];
            let precip = [];
            for (let i = 0; i < length; i++) {
                date.push(data.locations['Oberhausen'].values[i].datetime)
                humidity.push(data.locations['Oberhausen'].values[i].humidity)
                sealevelpressure.push(data.locations['Oberhausen'].values[i].sealevelpressure)
                maxt.push(data.locations['Oberhausen'].values[i].maxt)
                precip.push(data.locations['Oberhausen'].values[i].precip)
            }
            
            const allWeatherDataIneed = [date, sealevelpressure, maxt, precip, humidity];
            for (let i = 1; i < dataNames.length; i++) {
                const units = data.columns[dataNames[i]].unit;
                const labels = data.columns[dataNames[i]].name;

                tempObj[i - 1] =
                {
                    unit: data.columns[dataNames[i]].unit,
                    label: data.columns[dataNames[i]].name,
                    values: allWeatherDataIneed[i],
                    date: allWeatherDataIneed[0],
                }
            }
            setWeatherData(tempObj)

            console.log("allWeatherDataIneed: ......", allWeatherDataIneed)
            console.log("tempObj: ......", tempObj)
        }
    }


    //-------------------------------------------------------------------------

    const getWeatherDataFromBackend = async (city, startDate, endDate) => {

        let requestOptions = {
            method: 'GET',
        };
        console.log("city", city)

        console.log('/api/WeatherData?city=' + city + '&start=' + startDate + '&end=' + endDate);

        let data;
        await fetch('/api/WeatherData?city=' + city + '&start=' + startDate + '&end=' + endDate, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log("response", response.data)
                localStorage.setItem(LOCAL_STORAGE_WEATHER, JSON.stringify(response.data))
            })

            .catch(error => console.log("error: ", error))
    }


    return [getWeatherDataFromBackend, weatherData, getWeatherData]
}


export default useWeatherData;