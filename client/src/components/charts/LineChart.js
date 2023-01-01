import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

import styled from 'styled-components';



const LineChart = () => {

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
                    tooltipFormat: 'DD T'
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

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const xData = ['2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-08', '2022-10-09','2022-10-11'];
    const yData = [2,1,3,2,3,4,6];

    const myData = xData.map((e, i) => {
        return ({x: e, y: yData[i]})
    })
    console.log(myData)


    const data = {
        // labels, //nur bei type: Line
        datasets: [
            {
                label: 'Dataset 1',
                data: myData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0,
                spanGaps: true,
                connect: false,
                fill: false,
                pointStyle: 'circle',
                pointBorderColor: '#000',
                radius: 8
            },
            {
                label: 'Dataset 2',
                data: [
                    {x: '2022-10-02', y: 4},
                    {x: '2022-10-03', y: 5},
                    {x: '2022-10-04', y: 6},
                    {x: '2022-10-06', y: 3},
                    {x: '2022-10-07', y: 5},
                    {x: '2022-10-09', y: 4},
                    {x: '2022-10-10', y: 7}
                ],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0,
                fill: false,
                pointStyle: 'rectRot',
                pointBorderColor: '#000',
                radius: 9
            },
        ],
    };

    return (
        <div style={{width: '100%'}}>
            <Line options={options} data={data} />
        </div>
    )
};




export default LineChart;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------