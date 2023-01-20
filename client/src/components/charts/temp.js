import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { useState } from 'react';

import { theme } from '../../themes/theme'

// import annotationPlugin from 'chartjs-plugin-annotation';

//---------------------------------------------------------------------

const MultiTypeChart = ( {xValues, y1Values, y2Values, labels, name, label2, unit} ) => {

    console.log(y1Values, y2Values, label2)

    const [sMin, setSMin] =  useState();
    const [sMax, setSMax] =  useState();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        TimeScale,
        TimeSeriesScale,
        Title,
        Tooltip,
        Legend
    );

    // useEffect(()=> {
    //     if(name === 'Gelenschmerzen') {
    //         setSMin(10)
    //         setSMax(100)
    //     } 
    //     else if(label2 === 'Meeresspiegeldruck') {
    //         console.log("Werte: ", 980, 1040)
    //         setSMin(980)
    //         setSMax(1040) 
    //     }
    // },[])

    // console.log(name, sMax)

    const color1 = theme.colors.col11;
    const color2 = theme.colors.col13;
    const color11 = theme.colors.col21;
    const color22 = theme.colors.col24;
    const textColor = theme.colors.col11;



    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: '...',
            },
        },
        scales: {
            y: {
                suggestedMin: 0, 
                suggestedMax: 5,
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    // display: false
                },
                title: {
                    display: true,
                    text: name + ' [Intensität]',
                    font: { size: 18 },
                    color: color1,
                    padding: 10
                },
            },
            y1: {
                // suggestedMax: (name === 'Gelenschmerzen') ? 0 : 980, 
                // suggestedMax: (name === 'Gelenschmerzen') ? 100 : 1040,
                suggestedMax: 1040,
                suggestedMin: 980,
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    display: false
                },
                title: {
                    display: true,
                    text: label2 + ' [' + unit + ']',
                    font: { size: 18 },
                    color: color1,
                    padding: 10
                },
            },
        },
    };

    const values1 = xValues.map((e, i) => {
        return ({ x: e, y: y1Values[i] })
    })
    const values2 = xValues.map((e, i) => {
        return ({ x: e, y: y2Values[i] })
    })


    const data = {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: label2,
                borderColor: color11,
                backgroundColor: color22,
                borderWidth: 2,
                fill: false,
                data: values1,
                yAxisID: 'y1',
            },
            {
                type: 'bar',
                label: name,
                backgroundColor:  color1,
                backgroundColor: color2,
                data: values2,
                borderColor: 'white',
                borderWidth: 2,
                yAxisID: 'y',
            },
        ],
    };


    if(y1Values)
    return <Chart type='bar' data={data} options={options} />;
}


export default MultiTypeChart