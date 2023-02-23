import { ChartStyle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'chartjs-adapter-luxon';


/********************************************************
 * Chart.js component
 * Cahrt type: Line Chart
 * @param {*} xValues - labels for the x axis 
 * @param {*} y1Values - values for the y axis 
 * @param {*} y2Values - values for the y axis 
 * @param {*} name - name to label the  y axis 
 * @param {*} name - unit for the y axis label
 * @returns Line Chart
 *******************************************************/

const LineChartP2 = ({ xValues, y1Values, y2Values, name, unit }) => {

  // console.log("y", y1Values)
  // console.log("y", y2Values)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  //................................................

  const textColor = theme.colors.col3;

  /******************
* Chart data
******************/

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'Systolischer Druck',
        data: y1Values,
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
        data: y2Values,
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
      },
    ],
  };


  /******************
 * Chart options
 ******************/

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blutdruck',
        font: { size: 22 },
        color: textColor
      },
      annotation: {
        annotations: {
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
        title: {
          display: true,
          text: 'Datum',
          font: { size: 18 },
          color: textColor,
          padding: 10
        },
        ticks: {
          font: { size: 15 },
          maxRotation: 90,
        },
      },
      y: {
        suggestedMin: 60,
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
      }
    }
  };


  //************************************************** */

  return (
    <ChartStyle >
      <Line options={options} data={data} redraw={true} />
    </ChartStyle>
  )
};


export default LineChartP2;
