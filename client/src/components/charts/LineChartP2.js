import React from 'react';
import { ChartStyle } from '../../styled/globalStyles';
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

import { theme } from '../../themes/theme'

//----------------------------------------------------------------------

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

  // const labels = xValues.slice();
  // const labels = structuredClone(xValues);

  // console.log("LABELS:", labels)
  // console.log("DATA1", structuredClone(y1Values))

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

  //....................................................................

  return (
    <ChartStyle >
      <Line options={options} data={data} redraw={true} />
    </ChartStyle>
  )
};




export default LineChartP2;
