import React from 'react';
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

	const textColor = theme.colors.col3;

	//...................

	const myData = yVal.map((e, i) => {
		return ({ x: xVal[i], y: e })
	})
	// console.log(myData)


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
				borderWidth: 1,
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
						let y = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
						return [y[value | 0]]
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

