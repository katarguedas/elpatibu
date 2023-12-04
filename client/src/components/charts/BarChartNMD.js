import { ChartStyle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';

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
 * @param {*} yVal - values for the y axis 
 * @returns Bar chart
 ***********************************************************/

const BarChartNMD = ({ xVal, yVal, name }) => {


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

	//........................................

	let bgcolor;

	let colors = []
	for (let i = 0; i < yVal.length; i++) {

		switch (yVal[i]) {
			case 1:
				bgcolor = "#7dfd7d";
				break;
			case 2:
				bgcolor = "#bafc50";
				break;
			case 3:
				bgcolor = "#f2f53b";
				break;
			case 4:
				bgcolor = "#f3bf4e";
				break;
			case 5:
				bgcolor = '#f75b5b';
				break;
			default:
				bgcolor = theme.colors.col4;
		}
		colors[i] = bgcolor;
	}

	/******************
	 * Chart data
	 ******************/

	const myData = yVal.map((e, i) => {
		return ({ x: xVal[i], y: e })
	})

	let suggestedMinY = 0;
	let suggestedMaxY = 5;

	if (Math.min(yVal) > 0) {
		suggestedMinY = Math.round(Math.min(yVal)) - 1;
	}

	if (Math.max(yVal) > 5) {
		suggestedMaxY = Math.round(Math.max(yVal)) + 1;
	}


	const callbackFn = function (value) {
		let y = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
		return [y[value | 0]]
	}

	const data = {
		labels: xVal,
		datasets: [
			{
				// label: '',
				data: myData,
				borderColor: 'grey',
				backgroundColor: colors,
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
				suggestedMin: suggestedMinY,
				suggestedMax: suggestedMaxY,
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
					display: true,
					callback: !name.includes('Stunden') ? callbackFn : undefined
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


export default BarChartNMD;
