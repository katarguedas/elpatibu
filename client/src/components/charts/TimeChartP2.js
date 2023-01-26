import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

import annotationPlugin from 'chartjs-plugin-annotation';

import { theme } from '../../themes/theme'

//----------------------------------------------------------------------

const TimeChartP2 = ({ xValues, y1Values, y2Values }) => {


    // console.log("y", y1Values)
    // console.log("y", y2Values)

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

    const textColor = theme.colors.col3;

    //...................

    const pressureH = xValues.map((e, i) => {
        return ({ x: e, y: y1Values[i] })
    })
    const pressureL = xValues.map((e, i) => {
        return ({ x: e, y: y2Values[i] })
    })
    // console.log(myData)

    const data = {
        // labels, //nur bei type: Line
        datasets: [
            {
                label: 'Systolischer Druck',
                data: pressureH,
                borderColor: theme.colors.col5,
                backgroundColor: theme.colors.col5,
                tension: 0,
                borderWidth: 1,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 5
            },
            {
                label: 'diastolischer Druck',
                data: pressureL,
                borderColor: theme.colors.col2,
                backgroundColor: theme.colors.col2,
                tension: 0,
                borderWidth: 1,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 5
            }
        ],
    };

    //...................


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
                text: 'Blutdruck',
                font: { size: 22 },
                color: textColor
            },
            annotation: {
                annotations: {
                    // point1: {
                    //     type: 'point',
                    //     xValue: 1,
                    //     yValue: 60,
                    //     backgroundColor: 'rgba(255, 99, 132, 0.25)'
                    //   },
                    line1: {
                        type: 'line',
                        yMin: 120,
                        yMax: 120,
                        borderColor: theme.colors.col5,
                        borderWidth: 2,
                        label: {
                            display: true,
                            content: 'Optimalwert',
                            position: 'end',
                            yAdjust: 15,
                            padding: 5,
                            backgroundColor: theme.colors.col4,
                            color: theme.colors.col5
                        }
                      },
                      line2: {
                        type: 'line',
                        yMin: 80,
                        yMax: 80,
                        borderColor: theme.colors.col3,
                        borderWidth: 2,
                        label: {
                            display: true,
                            content: 'Optimalwert',
                            position: 'end',
                            yAdjust: 15,
                            padding: 5,
                            backgroundColor: theme.colors.col4,
                            color: theme.colors.col3
                        }
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
                suggestedMin: 60, 
                // suggestedMax: 200,
                title: {
                    display: true,
                    text: 'Druck [mmHg]',
                    font: { size: 18 },
                    color: textColor,
                    padding: 10
                },
                ticks: {
                    font: {size: 16},
                }
            }
        }
    };




    return (
        <div >
            <Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem'}}  options={options} data={data} redraw={true}  />
        </div>
    )
};




export default TimeChartP2;

