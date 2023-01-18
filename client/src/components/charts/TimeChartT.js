import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

import annotationPlugin from 'chartjs-plugin-annotation';


//----------------------------------------------------------------------

const TimeChartT = ({ xValues, yValues, name }) => {

    // console.log("x", xValues)
    // console.log("y", yValues)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        TimeScale,
        TimeSeriesScale,
        LinearScale,
        annotationPlugin,
        Title,
        Tooltip,
        Legend,
    );

    //................................................

    
    
    const myColor1 = ['#BF5C54']
    const textColor = ['#1B545C']
    const bggreen = ['rgba(146, 250, 61, 0.3)']
    const bgyellow = ['rgba(238, 252, 48, 0.2)']
    const bgorange = ['rgba(248, 194, 16, 0.3)']
    const bgred = ['rgba(250, 97, 36, 0.3)']

    //...................

    const myData = xValues.map((e, i) => {
        return ({ x: e, y: yValues[i] })
    })
    console.log(typeof(myData))

    const data = {
        // labels, //nur bei type: Line
        datasets: [
            {
                // label: 'Körpertemperatur',
                data: myData,
                borderColor: myColor1,
                backgroundColor: myColor1,
                tension: 0,
                borderWidth: 1,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 6
            }
        ],
    };

    //...................


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
                // position: 'top',
            },
            title: {
                display: true,
                text: 'Körpertemperatur',
                font: { size: 22 },
                color: textColor
            },
            arbitraryLine: {
                lineColor: 'red',
                yPosition: 37,
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        xMin: myData[7].x,
                        xMax: myData[7].x,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                      },
                    box1: {
                        type: 'box',
                        // xMin: 1669892400000,
                        // xMin: 1669849200000,
                        xMin: myData[0].x,
                        xMax: myData[30].x,
                        yMin: 36,
                        yMax: 37.5,
                        backgroundColor: bggreen,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box2: {
                        type: 'box',
                        xMin: myData[0].x,
                        xMax: myData[30].x,
                        yMin: 37.5,
                        yMax: 38,
                        backgroundColor: bgyellow,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box3: {
                        type: 'box',
                        xMin: myData[0].x,
                        xMax: myData[30].x,
                        yMin: 38,
                        yMax: 39.0,
                        backgroundColor: bgorange,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box4: {
                        type: 'box',
                        xMin: myData[0].x,
                        xMax: myData[30].x,
                        yMin: 39.0,
                        yMax: 40,
                        backgroundColor: bgred,
                        drawTime: 'beforeDatasetsDraw',
                    }
                }
            }
        },
        scales: {
            x: {
                // type: 'timeseries',
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'DD',
                    // displayFormat: {day: "mm:dd"}
                },
                title: {
                    display: true,
                    text: 'Datum',
                    font: { size: 18 },
                    color: textColor,
                    padding: 10
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
                title: {
                    display: true,
                    text: 'Temperatur [°C]',
                    font: { size: 18 },
                    color: textColor,
                    padding: 10
                },
                ticks: {
                    font: {size: 16},
                },
            },
        }
    };




    return (
        <div >
            <Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem'}}  options={options} data={data} redraw={true} />
        </div>
    )
};




export default TimeChartT;

