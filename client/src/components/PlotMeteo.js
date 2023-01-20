
import TBarChartNMD from './charts/TBarChartNMD';
import BarChartNMD from './charts/BarChartNMD';
import TBarChartPrecip from './charts/BarCharPrecip';
import TimeChartT from './charts/TimeChartT';
import MultiAxLineChart from './charts/MultiAxLineChart';
import MultiTypeChart from './charts/MultiTypeChart';
import { createNMData, createNMData2 } from '../utils/testdata';
import { getDateStrFromTs } from './Date';
import { WeatherButton } from './Buttons';

import { useDataContext } from '../providers/dataContext';
import { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import styled from 'styled-components';

//----------------------------------------------------------


const PlotMeteo = ({ itemMeteo, date }) => {

    const { getWeatherData, weatherData, diary } = useDataContext()

    const dataNMDSet = createNMData();
    const dataNMDSet2 = createNMData();
    const dataNMDSet3 = createNMData2();

    const [active, setActive] = useState(false);

    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;
    const xVal2 = dataNMDSet2.dateString;
    const yVal2 = dataNMDSet2.values;
    const xVal3 = dataNMDSet3.dateString;
    const yVal3 = dataNMDSet3.values;


    const handleClick = () => {
        const city = diary.city;
        const startDate = getDateStrFromTs(date[0]);
        const endDate = getDateStrFromTs(date[date.length - 1]);
        console.log("Wetterdaten holen")
        getWeatherData(city, startDate, endDate);
        setActive(!active)
    }

    useEffect(() => {
        console.log("active", active)
    }, [active])

    //.................................................

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.0rem' }} >
            <div styled={{ padding: '5.0rem' }} >
                <WeatherButton onClick={handleClick} >
                    {
                        active ?
                            'Wetterdaten ausblenden'
                            : ' Wetterdaten einblenden'
                    }
                </WeatherButton >
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
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 1200px) {
    width: 85%;
  }
`