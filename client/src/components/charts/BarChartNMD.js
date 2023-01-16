import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, PointElement, Title, Tooltip, Legend, BarController, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import 'chartjs-adapter-luxon';

import annotationPlugin from 'chartjs-plugin-annotation';

import { theme } from '../../themes/theme'


//----------------------------------------------------------------------

const BarChartNMD = ({ xVal, yVal, name }) => {

    // console.log("x", xVal)
    // console.log("y", yVal)

    ChartJS.register(
        CategoryScale,
        PointElement,
        BarElement,
        BarController,
        annotationPlugin,
        Title,
        Tooltip,
        Legend,
    );

    //................................................



    const color1 = theme.colors.col11;
    const color2 = theme.colors.col15;
    const textColor = theme.colors.col11;

    const bgreen = ['rgba(146, 250, 61, 0.3)']
    const bgyellow = ['rgba(238, 252, 48, 0.2)']
    const bgorange = ['rgba(248, 194, 16, 0.3)']
    const bgred = ['rgba(250, 97, 36, 0.3)']
    const test = ['rgba(225, 248, 18, 0.425)']

    //...................


    const myData = xVal.map((e, i) => {
        return ({ x: e, y: yVal[i] })
    })
    // console.log(myData)



    const data = {
        labels: xVal,
        datasets: [
            {
                // label: 'Systolischer Druck',
                data: myData,
                borderColor: color1,
                backgroundColor: color2,
                tension: 0,
                borderWidth: 1,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 6
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: { size: 14 }
                }
                // position: 'top',
            },
            title: {
                display: true,
                text: name,
                font: { size: 22 },
                color: textColor
            },
            annotation: {
                annotations: {
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Datum',
                    font: { size: 18 },
                    color: textColor,
                    padding: 20
                },
                ticks: {
                    font: {size: 16},
                    maxRotation: 90,
                },
                grid: {
                    tickColor: 'grey'
                }
            },
            y: {
                suggestedMin: 0, 
                suggestedMax: 5,
                title: {
                    display: true,
                    text: 'Intensität',
                    font: { size: 18 },
                    color: textColor,
                    padding: 20
                },
                ticks: {
                    font: {size: 16},
                }
            }
        }
    };

    return (
        <div >
            <Bar style={{ marginTop: '3.0rem', marginBottom: '2.0rem' }} type='bar' options={options} data={data} redraw={true} />
        </div>
    )
};




export default BarChartNMD;

