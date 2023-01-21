
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


const PlotSymptoms = ({ item, date }) => {

    const { diary } = useDataContext()

    const dataNMDSet = createNMData();
    const dataNMDSet2 = createNMData();
    const dataNMDSet3 = createNMData2();

    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;
    const xVal2 = dataNMDSet2.dateString;
    const yVal2 = dataNMDSet2.values;
    const xVal3 = dataNMDSet3.dateString;
    const yVal3 = dataNMDSet3.values;


    //.................................................

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.0rem' }} >
            <div styled={{ padding: '5.0rem' }} >
            </div>
            {
                item.items.filter(e => e.selected === true).length > 0 &&
                <ChartsGroup >
                    {
                        item.items.map(e => (
                            <div key={e.id}>
                                {
                                    e.name === 'pain' &&
                                    <BarChartNMD xVal={xVal} yVal={yVal} name={e.label} />
                                }
                                {
                                    e.name === 'fatigue' &&
                                    <BarChartNMD xVal={xVal2} yVal={yVal2} name={e.label} />
                                }
                                {
                                    e.name === 'nausea' &&
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

export default PlotSymptoms;


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