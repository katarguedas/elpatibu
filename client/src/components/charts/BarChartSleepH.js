import { ChartStyle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme'

import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
	BarController,
	BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

import 'chartjs-adapter-luxon';


/***********************************************************
 * Chart.js component 
 * Chart type: Bar Chart
 * @param {*} xVal - labels for the x axis
 *            yVal - values for the y axis 
 * @returns Bar chart
 ***********************************************************/

const BarChartSleepH = ({ xVal, yVal, name }) => {

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

	const textColor = theme.colors.col3;

	//...................

	const myData = yVal.map((e, i) => {
		return ({ x: xVal[i], y: e })
	})
	// console.log(myData)

	const data = {
		labels: xVal,
		datasets: [
			{
				// label: '',
				data: myData,
				borderColor: theme.colors.col3,
				backgroundColor: theme.colors.col4,
				borderRadius: 2,
				tension: 0,
				borderWidth: 0,
				spanGaps: true,
				connect: false,
				fill: false,
				pointStyle: 'circle',
				pointBorderColor: '#000',
				radius: 6,
				barPercentage: 0.6,

			},
		],
	};

	/******************
	 * Chart options
	 ******************/

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
				labels: {
					font: { size: 14 }
				}
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
					font: { size: 16 },
					maxRotation: 90,
				},
				grid: {
					tickColor: 'grey',
					display: false
				}
			},
			y: {
				suggestedMin: 3,
				suggestedMax: 9,
				title: {
					display: true,
					text: name,
					font: { size: 18 },
					color: textColor,
					padding: 5,
				},
				ticks: {
					font: { size: 14 },
					stepSize: 1,
					display: true
				},
				grid: {
					display: true
				},
			}
		}
	};

		//************************************************** */

	return (
		<ChartStyle >
			<Bar
				type='bar'
				options={options}
				data={data}
				redraw={true} />
		</ChartStyle>
	)
};




export default BarChartSleepH;
