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


    // const images = ["../../pictures/01.png", "../../pictures/02.png", "../../pictures/03.png", "../../pictures/04.png", "../../pictures/05.png"];

    const color1 = theme.colors.col11;
    const color2 = theme.colors.col13;
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


    let bgcolor;

    let colors = []
    for (let i = 0; i < yVal.length; i++) {

        switch (yVal[i]) {
            case 1:
                bgcolor = "#6efd6e";
                break;
            case 2:
                bgcolor = "#befa5e";
                break;
            case 3:
                bgcolor = "#f7fa57";
                break;
            case 4:
                bgcolor = "#f3bf4e";
                break;
            case 5:
                bgcolor = '#f75b5b';
                break;
        }
        colors[i] = bgcolor;
    }


    let picLabels = [];

    // for ( let i = 0; i < 5; i++) {
    //     picLabels.push(objectToUse[i].title)
    // }


    const data = {
        labels: xVal,
        datasets: [
            {
                // label: '',
                data: myData,
                borderColor: 'grey',
                backgroundColor: colors,
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
                display: false,
                labels: {
                    font: { size: 14 }
                }
                // position: 'top',
            },
            title: {
                display: true,
                text: name,
                font: { size: 20 },
                color: textColor,
            },
            annotation: {
                annotations: {
                }
            },
            // afterDraw: chart => {
            //     let ctx = chart.chart.ctx;
            //     let xAxis = chart.scales['x-axis-0'];
            //     let yAxis = chart.scales['y-axis-0'];
            //     yAxis.ticks.forEach((value, index) => {  
            //         let y = yAxis.getPixelForTick(index);  
            //         let image = new Image();
            //         image.src = images[index];    
            //         ctx.drawImage(image);
            //       });
            //       ctx.restore();  
            // }
        },
        layout: {
            padding: {
                right: 60,
                top: 50
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Datum',
                    font: { size: 18 },
                    color: textColor,
                    padding: 0
                },
                ticks: {
                    font: { size: 16 },
                    maxRotation: 90,
                },
                grid: {
                    tickColor: 'grey',
                    display: false
                }
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 5,
                title: {
                    display: true,
                    // text: 'keine |  ----- | starke',
                    font: { size: 18 },
                    color: textColor,
                    padding: 10
                },
                ticks: {
                    font: { size: 14 },
                    stepSize: 1,
                    display: true,
                    callback: function (value) {
                        let x = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
                        return [x[value | 0]]
                    }
                },
                grid: {
                    display: true
                },
            }
        }
    };

    return (
        <div >
            <Bar
                style={{ marginTop: '3.0rem', marginBottom: '3.0rem' }}
                type='bar'
                options={options}
                data={data}
                redraw={true} />
        </div>
    )
};




export default BarChartNMD;

