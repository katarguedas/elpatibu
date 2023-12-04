import getAnnotations from './annotations';
import { getYminMax } from '../../utils/helperfunctions';
import { theme } from '../../themes/theme';
import { ChartStyle } from '../../styled/globalStyles';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Filler,
	Tooltip,
	Legend,
	TimeScale,
	TimeSeriesScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';

//----------------------------------------------------------------------

const TimeChart = ({ xValues, yValues, titel, name, unit, rm, identifier }) => {

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		TimeScale,
		TimeSeriesScale,
		LinearScale,
		annotationPlugin,
		Title,
		Tooltip,
		Legend,
		Filler
	);

	//................................................

	const textColor = theme.colors.col3;
	const bgColor = [theme.colors.col5, theme.colors.col2, theme.colors.col1, theme.colors.col4]

	const yMinMaxValue = getYminMax(yValues, rm);
	const annotations = getAnnotations(identifier);

	/******************
 * Chart data
 ******************/

	let myData = [];

	myData = yValues.map((y) => {
		const data = xValues.map((e, i) => {
			return ({ x: e, y: y[i] })
		})
		return data;
	})

	// xValues.map(x=>console.log(new Date(x)))


	let data;

	const datasetArray = myData.map((data, index) => {
		return {
			data: data,
			fill: false,
			borderColor: bgColor[index],
			backgroundColor: bgColor[index],
			tension: 0,
			borderWidth: 1,
			spanGaps: true,
			connect: false,
			pointStyle: 'circle',
			pointBorderColor: '#000',
			radius: 5,
			stepped: false,
		}
	})

	data = {
		datasets: datasetArray,
	}

	/******************
	 * Chart options
	 ******************/

	let options;
	options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: titel,
				font: { size: 22 },
				color: textColor
			},
			annotation: annotations
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'day',
					tooltipFormat: 'DD',
				},
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
				grid: {
					tickColor: 'grey'
				}
			},
			y: {
				min: yMinMaxValue.yMin,
				max: yMinMaxValue.yMax,
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
			},
		}
		// }
	};


	//-------------------------------------------------------------
	return (
		<ChartStyle >
			<Line
				options={options}
				data={data}
				redraw={true}
			/>
		</ChartStyle>
	)
};


export default TimeChart;
