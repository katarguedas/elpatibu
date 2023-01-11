import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { DateTime } from "luxon";



//----------------------------------------

const TimeChart = ({xValues, yValues}) => {

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


//................................
    const dt = DateTime.local()
    // console.log(dt)

    const conv = dt.toMillis()
    // console.log(conv)

    const rev = new Date()
    // console.log(rev)

    const string = '2022-12-13 22:23:00'
    const datefromstring= new Date(string)
    // console.log(datefromstring)
//...............................


    const options = {
        responsive: true,
        // spanGaps: 1000 * 60 * 60 * 24 * 2, // 2 days
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                // type: 'timeseries',
                type: 'time',
                time: {
                    unit: 'day',
                    //luxon format string
                    tooltipFormat: 'DD T',
                    // tooltipFormat: 'DD T',
                    // displayFormat: {day: "mm:dd"}
                },
                title: {
                    display: true,
                    text: 'Date'
                }    
            },
            y: {
                title: {
                    display: true,
                    text: 'value'
                }
            }
        }
    };

    const xxData = [1672339559073,1672339610779, 1672339622004, 1672339663443,1672339676307, 1672339823914,1672339841336,1672342149148,1672342355951]

    const yyData= [3,5,4,6,8,0,4,null,6]


    const myData = xValues.map((e, i) => {
        return ({x: e, y: yValues[i]})
    })
    // console.log(myData)


    const data = {
        // labels, //nur bei type: Line
        datasets: [
            {
                label: 'Dataset 1',
                data: myData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0,
                borderWidth: 1,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 6
            },
            // {
            //     label: 'Dataset 2',
            //     data: [
            //         {x: '2022-10-02', y: 4},
            //         {x: '2022-10-03', y: 5},
            //         {x: '2022-10-04', y: 6},
            //         {x: '2022-10-06', y: 3},
            //         {x: '2022-10-07', y: 5},
            //         {x: '2022-10-09', y: 4},
            //         {x: '2022-10-10', y: 7}
            //     ],
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            //     tension: 0,
            //     fill: false,
            //     pointStyle: 'rectRot',
            //     pointBorderColor: '#000',
            //     radius: 9
            // },
        ],
    };

    return (
        <div style={{width: '100%'}}>
            <Line options={options} data={data} />
        </div>
    )
};




export default TimeChart;

