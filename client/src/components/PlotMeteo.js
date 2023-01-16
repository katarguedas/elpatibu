
import TBarChartNMD from './charts/TBarChartNMD';
import BarChartNMD from './charts/BarChartNMD';
import { createNMData } from '../utils/testdata';
import { Button } from './Buttons';

import { useDataContext } from '../providers/dataContext';
import { useEffect, useState } from 'react';
import { GiConsoleController } from 'react-icons/gi';

//----------------------------------------------------------


const PlotMeteo = ({ itemMeteo }) => {

    const { getWeatherData, weatherData } = useDataContext()

    const dataNMDSet = createNMData();

    const [active, setActive] = useState(false);
    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;
    let x, y;

    console.log("weatherData",weatherData)

    useEffect(() => {
        console.log("active?  ", active)
        if (active === true) {
            const city = 'Oberhausen';
            const startDate = '2022-12-05';
            const endDate = '2022-12-1';
            getWeatherData(city, startDate, endDate);
            if (weatherData !== undefined) {
                console.log("weatherData",weatherData)
                // const x = weatherData.date.slice();
                // const y = weatherData.sealevelpressure.slice();
            }
        }
    }, [active])

    useEffect(() => {
        console.log("weatherData", weatherData)
    }, [weatherData])

    //.................................................

    return (
        <div style={{ marginTop: '2.0rem' }} >
            {
                itemMeteo.items.filter(e => e.selected === true).length > 0 &&
                <div>
                    {itemMeteo.items.map(e => (

                        <div key={e.id}>
                            {
                                e.name === 'headache' &&
                                <BarChartNMD xVal={xVal} yVal={yVal} name={e.label} />
                            }
                            {
                                e.name === 'fatigue' &&
                                <TBarChartNMD xVal={xVal} yVal={yVal} name={e.label} />
                            }

                        </div>
                    ))


                    }
                </div>

            }
            <div>
                <Button onClick={() => setActive(true)} style={{ border: 'solid' }}>
                    Wetterdaten
                </Button >
                <TBarChartNMD xVal={x} yVal={y} name={"..."} />
            </div>

        </div >
    )
}

export default PlotMeteo