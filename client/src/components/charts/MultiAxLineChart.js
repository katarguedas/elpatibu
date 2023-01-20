import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

// import annotationPlugin from 'chartjs-plugin-annotation';

//---------------------------------------------------------------------

const MultiAxLineChart = ( {xValues, y1Values, y2Values, name} ) => {

    console.log("y1Values", y1Values)
    console.log(name)

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
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    display: false
                },
                ticks: {
                    // font: {size: 16},
                    stepSize: 1
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    font: {size: 16},
                    stepSize: 1
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
        // labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: values1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Dataset 2',
                data: values2,

                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    return (
        <div>
            <Line options={options} data={data} />;
        </div>
    )

}


export default MultiAxLineChart;