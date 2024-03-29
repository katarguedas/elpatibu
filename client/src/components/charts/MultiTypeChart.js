import { ChartStyle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';

import React, { useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale, LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { useState } from 'react';


/***********************************************************
 * Chart.js component
 * Chart type: Multi type chart (with 2 axis)
 * @param {*} xValues - labels for the x axis 
 * @param {*} y1Values - values for the y axis (like bar chart)
 * @param {*} y2Values - values for the y axis (like line chart)
 * @param {*} name - name to label the  y axis 
 * @returns Line chart
 *****************************************/

const MultiTypeChart = ({ xValues, y1Values, y2Values, labels, name, label2, unit }) => {

	const [sMin, setSMin] = useState();
	const [sMax, setSMax] = useState();
	const [TitleName, setTitleName] = useState();

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);


	useEffect(() => {
		if (label2 === 'Relative Feuchtigkeit') {
			setSMin(20)
			setSMax(100)
			setTitleName('Relative Feuchtigkeit')
		}
		else if (label2 === 'Meeresspiegeldruck') {
			setSMin(980)
			setSMax(1040)
			setTitleName('Luftdruck')
		}
	}, [])


	const color1 = theme.colors.col3;

		/******************
	 * Chart options
	 ******************/

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		stacked: false,
		plugins: {
			title: {
				display: true,
				font: { size: 18 },
				text: name + ' vs. ' + TitleName,
			},
		},
		scales: {
			y: {
				suggestedMin: 0,
				suggestedMax: 5,
				type: 'linear',
				display: true,
				position: 'left',
				grid: {
					display: false
				},
				ticks: {
					stepSize: 1,
					font: { size: 14 },
					callback: function (value) {
						let x = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
						return [x[value | 0]]
					}
				},
				title: {
					display: true,
					text: name,
					font: { size: 18 },
					color: color1,
					padding: 10
				},
			},
			y1: {
				min: sMin,
				max: sMax,
				type: 'linear',
				display: true,
				position: 'right',
				grid: {
					drawOnChartArea: false,
					display: false
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
		elements: {
			bar: {
				backgroundColor: '#444'
			}
		}
	};


	//...........

	let bgcolor;

	let colors = []
	for (let i = 0; i < y2Values.length; i++) {

		switch (y2Values[i]) {
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

/******************
 * Chart data
 ******************/

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
				label: label2,
				borderColor: theme.colors.col3,
				backgroundColor: theme.colors.col2,
				borderWidth: 1,
				fill: false,
				data: values1,
				yAxisID: 'y1',
				radius: 4
			},
			{
				type: 'bar',
				label: name,
				backgroundColor: colors,
				borderColor: 'grey',
				data: values2,
				borderWidth: 1,
				yAxisID: 'y',
			},
		],
	};

		//************************************************** */


	if (y1Values)
		return (
			<ChartStyle>
				<Chart
					type='bar'
					data={data}
					options={options}
				/>;
			</ChartStyle>
		)
}


export default MultiTypeChart;
