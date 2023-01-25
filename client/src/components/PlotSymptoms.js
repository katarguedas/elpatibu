
import TBarChartNMD from './charts/TBarChartNMD';
import BarChartNMD from './charts/BarChartNMD';
import TBarChartPrecip from './charts/BarCharPrecip';
import TimeChartT from './charts/TimeChartT';
import MultiAxLineChart from './charts/MultiAxLineChart';
import MultiTypeChart from './charts/MultiTypeChart';
import { createNMData, createNMData2 } from '../utils/testdata';
import { WeatherButton } from './Buttons';
import { getDateStrFromTs, getStrFromTs } from './Date';
import { useDataContext } from '../providers/dataContext';
import { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import styled from 'styled-components';

//----------------------------------------------------------


const PlotSymptoms = ({ itemSymptoms, date }) => {

    const { diary } = useDataContext()



    let dataNMDSet = {
        values: [],
        dateString: []
    };
    if (itemSymptoms.items[0].values.length > 30) {
        dataNMDSet.values = itemSymptoms.items[0].values;
        for (let i = 0; i < diary.date.length - 1; i++) {
            dataNMDSet.dateString.push(getStrFromTs(diary.date[i]))
        }
    }
    else
        dataNMDSet = createNMData();


    let dataNMDSet2 = {
        values: [],
        dateString: []
    };
    if (itemSymptoms.items[1].values.length > 30) {
        dataNMDSet2.values = itemSymptoms.items[1].values;
        for (let i = 0; i < diary.date.length - 1; i++) {
            dataNMDSet2.dateString.push(getStrFromTs(diary.date[i]))
        }
    }
    else
        dataNMDSet2 = createNMData();

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
                itemSymptoms.items.filter(e => e.selected === true).length > 0 &&
                <ChartsGroup >
                    {
                        itemSymptoms.items.map(e => (
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
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`