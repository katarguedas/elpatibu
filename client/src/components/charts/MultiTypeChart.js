import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

import { theme } from '../../themes/theme'

// import annotationPlugin from 'chartjs-plugin-annotation';

//---------------------------------------------------------------------

const MultiTypeChart = ( {xValues, y1Values, y2Values, labels, name, label2, unit} ) => {


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
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                suggestedMin: 0, 
                suggestedMax: 5,
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: name + ' [Intensität]',
                    font: { size: 18 },
                    color: color1,
                    padding: 10
                },
            },
            y1: {
                min: 980, 
                suggestedMax: 1040,
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
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
                label: 'Dataset 1',
                borderColor: color11,
                backgroundColor: color22,
                borderWidth: 2,
                fill: false,
                data: values1,
                yAxisID: 'y1',
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor:  color1,
                backgroundColor: color2,
                data: values2,
                borderColor: 'white',
                borderWidth: 2,
                yAxisID: 'y',
            },
            // {
            //     type: 'bar',
            //     label: 'Dataset 3',
            //     backgroundColor: 'rgb(53, 162, 235)',
            //     data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            // },
        ],
    };


    return <Chart type='bar' data={data} options={options} />;
}


export default MultiTypeChart