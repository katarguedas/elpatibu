import { theme } from '../../themes/theme';
import { ChartStyle } from '../../styled/globalStyles';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';

//----------------------------------------------------------------------

const TimeChartW = ({ xValues, yValues, titel, name, unit }) => {

	// console.log("x-", xValues)
	// console.log("y", yValues)

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
	//...................

	const myData = xValues.map((e, i) => {
		return ({ x: e, y: yValues[i] })
	})

	const yMin = Math.round(Math.min(...yValues)) - 1;
	const yMax = Math.round(Math.max(...yValues)) + 1;

	console.log("MIN; MAX", yMin, yMax)

	let data;

	data = {
		// labels, //nur bei type: Line
		datasets: [
			{
				// label: 'Körpergewicht',
				data: myData,
				fill: false,
				borderColor: theme.colors.col3,
				backgroundColor: theme.colors.col2,
				tension: 0,
				borderWidth: 1,
				spanGaps: true,
				connect: false,
				pointStyle: 'circle',
				pointBorderColor: '#000',
				radius: 5,
				stepped: false,
			}
		],
	}

	//...................

	let options;
	options = {
		responsive: true,
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
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'day',
					tooltipFormat: 'DD',
					// displayFormat: {day: "mm:dd"}
				},
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
					tickColor: 'grey'
				}
			},
			y: {
				min: yMin,
				max: yMax,
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
			// style={{
			// 	marginTop: '3.0rem',
			// 	marginBottom: '2.0rem',
			// 	padding: '0.5rem',
			// 	border: '2px solid',
			// 	borderColor: theme.colors.col4,
			// 	borderRadius: '0.5rem',
			// 	boxShadow: 'rgba(0, 0, 0, 0.2) 3.0px 5.0px 4.2px'
			// }}
				options={options}
				data={data}
				redraw={true} />
		</ChartStyle>
	)
};


export default TimeChartW;
