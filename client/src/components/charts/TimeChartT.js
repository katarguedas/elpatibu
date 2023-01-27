import { useUserContext } from '../../providers/userContext';
import { theme } from '../../themes/theme';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';
import { DateTime } from "luxon";
// import { ReturnDocument } from 'mongodb';


//----------------------------------------------------------------------

const TimeChartT = ({ xValues, yValues, titel, name, unit }) => {

    const { events, userData, getEventsFromBackend } = useUserContext();

    const [allAnnotations, setAllAnnotations] = useState({});

    // console.log("x-", test)
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
        Filler
    );

    //................................................

    const lastDay = xValues[xValues.length - 1];
    const firstDay = xValues[0];
    console.log(firstDay, lastDay);


    const textColor = theme.colors.col3;

    const bgcolor1 = "rgb(110, 253, 110, 0.3)";
    const bgcolor2 = "rgb(190, 250, 94, 0.3)";
    const bgcolor3 = "rgb(247, 250, 87, 0.3)";
    const bgcolor4 = "rgb(243, 191, 78, 0.3)";
    const bgcolor5 = 'rgb(247, 89, 89, 0.3)';

    let myAnnotations = [];

    useEffect(() => {

        const tsArray =[];

        if (!events)
        getEventsFromBackend(userData.id)

        if (events) {
            myAnnotations = events.map((e, i) => {
                console.log(e.category)
                if (e.category === 'Therapie') {
                     const ts = DateTime.fromISO(e.end).ts
                     tsArray.push(DateTime.fromISO(e.end).ts) 
                    console.log(e.category, ts, tsArray)
                    return {
                        // type: 'line',
                        // id: 'vline_' + i,
                        // xMin: ts,
                        // xMax: ts,
                        // borderColor: theme.colors.col3,
                        // borderWidth: 3,
                        // label: {
                        //     display: true,
                        //     content: e.category,
                        //     position: 'end',
                        //     yAdjust: -5,
                        //     xAdjust: -5,
                        //     padding: 5,
                        //     backgroundColor: theme.colors.col3,
                        //     color: '#fff'
                        // }
                    }
                }
            })

            myAnnotations = myAnnotations.filter(e => { if (e !== undefined) return e })
        }

        console.log(tsArray)

        setAllAnnotations(
            {
                type: 'line',
                id: 'vline_1',
                xMin: tsArray[0],
                xMax: tsArray[0],
                borderColor: theme.colors.col3,
                borderWidth: 2,
                label: {
                    display: true,
                    content: 'Therapie',
                    position: 'end',
                    yAdjust: -5,
                    xAdjust: -5,
                    padding: 5,
                    backgroundColor: theme.colors.col3,
                    color: '#fff'
                }
            },
            {
                type: 'line',
                id: 'vline_2',
                xMin: tsArray[1],
                xMax: tsArray[1],
                borderColor: theme.colors.col3,
                borderWidth: 2,
                label: {
                    display: true,
                    content: 'Therapie',
                    position: 'end',
                    yAdjust: -5,
                    xAdjust: -5,
                    padding: 5,
                    backgroundColor: theme.colors.col3,
                    color: '#fff'
                }
            },
            {
                type: 'line',
                id: 'vline_3',
                xMin: tsArray[2],
                xMax: tsArray[2],
                borderColor: theme.colors.col3,
                borderWidth: 2,
                label: {
                    display: true,
                    content: 'Therapie',
                    position: 'end',
                    yAdjust: -5,
                    xAdjust: -5,
                    padding: 5,
                    backgroundColor: theme.colors.col3,
                    color: '#fff'
                }
            }
        )

    }, [])


    const annotationBox1 = {
        id: 'box1',
        type: 'box',
        xMin: firstDay,
        xMax: lastDay,
        yMin: 36,
        yMax: 37.5,
        backgroundColor: bgcolor1,
        drawTime: 'beforeDatasetsDraw',
    }
    const annotationBox2 = {
        id: 'box2',
        type: 'box',
        xMin: firstDay,
        xMax: lastDay,
        yMin: 37.5,
        yMax: 38,
        backgroundColor: bgcolor3,
        drawTime: 'beforeDatasetsDraw',
    }
    const annotationBox3 = {
        id: 'box3',
        type: 'box',
        xMin: firstDay,
        xMax: lastDay,
        yMin: 38,
        yMax: 39.0,
        backgroundColor: bgcolor4,
        drawTime: 'beforeDatasetsDraw',
    }
    const annotationBox4 = {
        id: 'box4',
        type: 'box',
        xMin: firstDay,
        xMax: lastDay,
        yMin: 39.0,
        yMax: 40,
        backgroundColor: bgcolor5,
        drawTime: 'beforeDatasetsDraw',
    }

    const annotationLineY = {
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
    }


    useEffect(() => {
        console.log(allAnnotations)
    }, [allAnnotations])

    // console.log(allAnnotations)
    //...................

    let options;
    if (name === 'Temperatur') {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                    // position: 'top',
                },
                title: {
                    display: true,
                    text: titel,
                    font: { size: 22 },
                    color: textColor
                },
                annotation:
                {
                    // annotations: {allAnnotations}
                    // drawTime: 'afterDatasetsDraw',
                    // annotations: { myAnnotations },
                    // }
                    annotations: {
                        // myAnnotations,
                        annotationLineY,
                        allAnnotations,
                        annotationBox1,
                        annotationBox2,
                        annotationBox3,
                        annotationBox4,
                    },
                },
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
                        text: name + ' [' + unit + ']',
                        font: { size: 18 },
                        color: textColor,
                        padding: 10
                    },
                    ticks: {
                        font: { size: 16 },
                    },
                },
            }
            // }
        };
    } else {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: titel,
                    font: { size: 22 },
                    color: textColor,
                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'DD',
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
                        text: name + ' [' + unit + ']',
                        font: { size: 18 },
                        color: textColor,
                        padding: 10
                    },
                    ticks: {
                        stepSize: 1,
                        font: { size: 14 },
                        callback: function (value) {
                            let x = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
                            return [x[value | 0]]
                        }
                    },
                },
            }
        };
    }

    //...................

    const myData = xValues.map((e, i) => {
        return ({ x: e, y: yValues[i] })
    })
    // console.log(myData)

    useEffect(() => {
console.log(allAnnotations)    }, [myData])


    let data;

    if (name === 'Temperatur') {
        data = {
            // labels, //nur bei type: Line
            datasets: [
                {
                    // label: 'Körpertemperatur',
                    data: myData,
                    fill: false,
                    borderColor: theme.colors.col3,
                    backgroundColor: theme.colors.col2,
                    tension: 0,
                    borderWidth: 1,
                    spanGaps: true,
                    connect: false,
                    pointStyle: 'circle',
                    pointBorderColor: '#000',
                    radius: 5,
                    stepped: false,
                }
            ],
        }
    }
    else {
        data = {
            // labels, //nur bei type: Line
            datasets: [
                {
                    // label: 'Körpertemperatur',
                    data: myData,
                    fill: true,
                    borderColor: theme.colors.col2,
                    backgroundColor: theme.colors.col4,
                    tension: 0,
                    borderWidth: 1,
                    spanGaps: true,
                    connect: false,
                    pointStyle: 'circle',
                    pointBorderColor: '#000',
                    radius: 0,
                    stepped: true,
                }
            ],
        }
    }


    return (
        <div >
            <Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem' }} options={options} data={data} redraw={true} />
        </div>
    )
};




export default TimeChartT;

