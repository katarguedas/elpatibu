import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { theme } from '../../themes/theme';
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

    const lastDay = xValues[xValues.length - 1];
    const firstDay = xValues[0];
    console.log(firstDay, lastDay);


    const color1 = theme.colors.col11;
    const color2 = theme.colors.col10;
    const color3 = theme.colors.col23;
    const color4 = theme.colors.col21;
    const textColor = theme.colors.col11;

    const bgcolor1 = "rgb(110, 253, 110, 0.3)";
    const bgcolor2 = "rgb(190, 250, 94, 0.3)";
    const bgcolor3 = "rgb(247, 250, 87, 0.3)";
    const bgcolor4 = "rgb(243, 191, 78, 0.3)";
    const bgcolor5 = 'rgb(247, 89, 89, 0.3)';


    //...................

    const myData = xValues.map((e, i) => {
        return ({ x: e, y: yValues[i] })
    })
    // console.log(typeof(myData))

    const data = {
        // labels, //nur bei type: Line
        datasets: [
            {
                // label: 'Körpertemperatur',
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
            annotation: {
                annotations: {
                    // line1: {
                    //     type: 'line',
                    //     xMin: myData[7].x,
                    //     xMax: myData[7].x,
                    //     borderColor: 'rgb(255, 99, 132)',
                    //     borderWidth: 2,
                    // },
                    line2: {
                        type: 'line',
                        yMin: 39,
                        yMax: 39,
                        borderColor: 'rgb(206, 23, 93)',
                        borderWidth: 3,
                        label: {
                            display: true,
                            content: 'hohes Fieber',
                            position: 'end',
                            yAdjust: -15,
                            padding: 5,
                            backgroundColor: 'rgb(206, 23, 93)',
                            color: '#fff'
                        }
                    },
                    box1: {
                        type: 'box',
                        // xMin: 1669892400000,
                        // xMin: 1669849200000,
                        xMin: firstDay,
                        xMax: lastDay,
                        yMin: 36,
                        yMax: 37.5,
                        backgroundColor: bgcolor1,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box2: {
                        type: 'box',
                        xMin: firstDay,
                        xMax: lastDay,
                        yMin: 37.5,
                        yMax: 38,
                        backgroundColor: bgcolor3,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box3: {
                        type: 'box',
                        xMin: firstDay,
                        xMax: lastDay,
                        yMin: 38,
                        yMax: 39.0,
                        backgroundColor: bgcolor4,
                        drawTime: 'beforeDatasetsDraw',
                    },
                    box4: {
                        type: 'box',
                        xMin: firstDay,
                        xMax: lastDay,
                        yMin: 39.0,
                        yMax: 40,
                        backgroundColor: bgcolor5,
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
                    font: { size: 16 },
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
                    font: { size: 16 },
                },
            },
        }
    };




    return (
        <div >
            <Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem' }} options={options} data={data} redraw={true} />
        </div>
    )
};




export default TimeChartT;

