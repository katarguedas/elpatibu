
import TBarChartNMD from './charts/TBarChartNMD';
import BarChartNMD from './charts/BarChartNMD';
import TBarChartPrecip from './charts/BarCharPrecip';
import TimeChartT from './charts/TimeChartT';
import MultiAxLineChart from './charts/MultiAxLineChart';
import MultiTypeChart from './charts/MultiTypeChart';
import { createNMData, createNMData2 } from '../utils/testdata';
import { getDateStrFromTs, getStrFromTs } from './Date';
import { WeatherButton } from './Buttons';
import { DateTime } from "luxon";
import { useDataContext } from '../providers/dataContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//----------------------------------------------------------


const PlotMeteo = ({ itemMeteo, date }) => {

    const { getWeatherData, weatherData, diary } = useDataContext()

    const [active, setActive] = useState(false);
    const [done, setDone] = useState(false);




    let dataNMDSet = {
        values: [],
        dateString: []
    };
    if (itemMeteo.items[0].values.length > 30) {
        dataNMDSet.values = itemMeteo.items[0].values;
        for (let i = 0; i < diary.date.length - 1; i++) {
            dataNMDSet.dateString.push(getStrFromTs(diary.date[i]))
        }
    }
    else
        dataNMDSet = createNMData();

    //............

    let dataNMDSet2 = {
        values: [],
        dateString: []
    };
    if (itemMeteo.items[2].values.length > 30) {
        // console.log(itemMeteo.items[2].values)
        dataNMDSet2.values = itemMeteo.items[2].values;
        for (let i = 0; i < diary.date.length - 1; i++) {
            dataNMDSet2.dateString.push(getStrFromTs(diary.date[i]))
        }
    }
    else
        dataNMDSet = createNMData2();

    //............

    let dataNMDSet3 = {
        values: [],
        dateString: []
    };
    if (itemMeteo.items[4].values.length > 30) {
        dataNMDSet3.values = itemMeteo.items[4].values;
        for (let i = 0; i < diary.date.length - 1; i++) {
            dataNMDSet3.dateString.push(getStrFromTs(diary.date[i]))
        }
    }
    else
        dataNMDSet3 = createNMData2();


    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;
    const xVal2 = dataNMDSet2.dateString;
    const yVal2 = dataNMDSet2.values;
    const xVal3 = dataNMDSet3.dateString;
    const yVal3 = dataNMDSet3.values;


    // useEffect(() => {
    //     const city = diary.city;
    //     const startDate = getDateStrFromTs(date[0]);
    //     const endDate = getDateStrFromTs(date[date.length - 1]);
    //     getWeatherData(city, startDate, endDate);
    // }, [])


    const handleClick = () => {
        if (weatherData === undefined) {
            console.log(weatherData)
            const city = diary.city;
            const startDate = getDateStrFromTs(date[0]);
            const endDate = getDateStrFromTs(date[date.length - 1]);
            console.log("Wetterdaten holen")
            getWeatherData(city, startDate, endDate);
        }
        if (weatherData)
            setDone(true)
    }

    const handleClickActive = () => {
        setActive(!active)
    }

    useEffect(() => {
        if (weatherData)
            setDone(true)
    }, [weatherData])


    //.................................................

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.0rem' }} >
            <div styled={{ padding: '5.0rem' }} >
                {
                    (done === false) &&
                    <WeatherButton onClick={handleClick} >
                        Wetterdaten abrufen
                    </WeatherButton >
                }
                {
                    done &&
                    <WeatherButton onClick={handleClickActive} >
                        {
                            active ?
                                'Wetterdaten ausblenden'
                                : ' Wetterdaten einblenden'
                        }
                    </WeatherButton >
                }
            </div>
            {
                itemMeteo.items.filter(e => e.selected === true).length > 0 &&
                <ChartsGroup >
                    {active ?
                        weatherData &&
                        itemMeteo.items.map(e => (

                            <div key={e.id}>
                                {
                                    e.name === 'headache' &&
                                    <MultiTypeChart
                                        xValues={xVal}
                                        y1Values={weatherData[0].values}
                                        y2Values={yVal}
                                        labels={e.dateStr}
                                        name={e.label}
                                        label2={weatherData[0].label}
                                        unit={weatherData[0].unit}
                                    />
                                }
                                {
                                    e.name === 'fatigue' &&
                                    <MultiTypeChart
                                        xValues={xVal2}
                                        y1Values={weatherData[0].values}
                                        y2Values={yVal2}
                                        name={e.label}
                                        label2={weatherData[0].label}
                                        unit={weatherData[0].unit} />
                                }
                                {
                                    e.name === 'joint pain' &&
                                    <MultiTypeChart
                                        xValues={xVal3}
                                        y1Values={weatherData[3].values}
                                        y2Values={yVal3}
                                        name={e.label}
                                        label2={weatherData[3].label}
                                        unit={weatherData[3].unit} />
                                }
                            </div>
                        ))
                        :
                        itemMeteo.items.map(e => (
                            <div key={e.id}>
                                {
                                    e.name === 'headache' &&
                                    <BarChartNMD xVal={xVal} yVal={yVal} name={e.label} />
                                }
                                {
                                    e.name === 'fatigue' &&
                                    <BarChartNMD xVal={xVal2} yVal={yVal2} name={e.label} />
                                }
                                {
                                    e.name === 'joint pain' &&
                                    <BarChartNMD xVal={xVal3} yVal={yVal3} name={e.label} />
                                }

                            </div>
                        ))

                    }
                </ChartsGroup>
            }

        </div >
    )
}

export default PlotMeteo;


//-------------------------------------------------------------------------


const ChartsGroup = styled.div`
  width: 80%;
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`