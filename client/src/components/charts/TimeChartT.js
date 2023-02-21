import { theme } from '../../themes/theme';
import { useUserContext } from '../../providers/userContext';
import { ChartStyle } from '../../styled/globalStyles';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';
import { useEffect, useState } from 'react';

//----------------------------------------------------------------------

const TimeChartT = ({ xValues, yValues, titel, name, unit, showTherapie }) => {

	const { timeCatArrays, LOCAL_STORAGE_EVENTS, setTimeArrays } = useUserContext();

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

	const bgcolor1 = "rgb(110, 253, 110, 0.3)";
	const bgcolor2 = "rgb(247, 250, 87, 0.3)";
	const bgcolor3 = "rgb(243, 191, 78, 0.3)";
	const bgcolor4 = 'rgb(247, 89, 89, 0.3)';

	const lastDay = xValues[xValues.length - 1];
	const firstDay = xValues[0];

	const colorArray = [bgcolor1, bgcolor2, bgcolor3, bgcolor4];
	const yMinArray = [36, 37.5, 38, 39];
	const yMaxArray = [37.5, 38, 39, 40];

	
	const [myAnnotations, setMyAnnotations] = useState([]);
	const initState = [];
	const [done, setDone] = useState();

	// console.log("show Therapie:", showTherapie)
	console.log("first and last day", firstDay, lastDay, timeCatArrays)


	const setYline = (yValue) => {
		setMyAnnotations([
			...myAnnotations, myAnnotations.push({
				type: 'line',
				yMin: yValue,
				yMax: yValue,
				borderColor: 'rgb(206, 23, 93)',
				borderWidth: 3,
				label: {
					display: true,
					content: 'hohes Fieber',
					position: 'end',
					yAdjust: -15,
					padding: 5,
					backgroundColor: 'rgb(206, 23, 93)',
					color: '#fff'
				}
			})
		])
	}

	const setColorBoxes = (colorArray, xMin, xMax, yMinArray, yMaxArray) => {

		colorArray.map((e, i) => {
			setMyAnnotations([
				...myAnnotations, myAnnotations.push({
					type: 'box',
					xMin: xMin,
					xMax: xMax,
					yMin: yMinArray[i],
					yMax: yMaxArray[i],
					backgroundColor: e,
					drawTime: 'beforeDatasetsDraw',
				})
			])
		})
	}

	useEffect(() => {
		let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
		if (!timeCatArrays) {
			setTimeArrays(eventsArray)
		}
		setDone(true)
	}, [])



	useEffect(() => {
		setColorBoxes(colorArray, firstDay, lastDay, yMinArray, yMaxArray);
		setYline(39);

		if (showTherapie === true) {
			if (timeCatArrays.therapie.length > 0) {
				console.log("es gibt therapietermine zum Plotten")
				timeCatArrays.therapie.map((e, i) => {
					if ((firstDay < timeCatArrays.therapie[i]) && (timeCatArrays.therapie[i] < lastDay)) {
						console.log("myAnnotations mit TherapieLines")
						setMyAnnotations([...myAnnotations, myAnnotations.push({
							id: 'line_' + timeCatArrays.therapie[i],
							type: 'line',
							label: {
								display: true,
								content: 'Therapie',
								position: 'end',
								yAdjust: -5,
								xAdjust: -5,
								padding: 5,
								backgroundColor: theme.colors.col3,
								color: '#fff'
							},
							xMin: timeCatArrays.therapie[i],
							xMax: timeCatArrays.therapie[i],
							backgroundColor: 'red',
							borderWidth: 2
						})
						])
					}
				})
			}
		}
		checkAnnotations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showTherapie, done])


	const checkAnnotations = () => {
		if (myAnnotations.length > 0)
			setMyAnnotations(myAnnotations.filter(e => (typeof (e) === 'object')))
	}


	useEffect(() => {
		setMyAnnotations(initState)
	}, [showTherapie])

	//...................

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
				color: textColor,

			},
			annotation:
			{
				annotations:
					myAnnotations,
			},
		},
		scales: {
			x: {
				type: 'time',
				time: {
					// parser: 'MM/DD/YYYY HH:mm',
					unit: 'day',
					tooltipFormat: 'DD',
					displayFormat: {day: "yyyy:mm:dd"}
				},
				title: {
					display: true,
					text: 'Datum',
					font: { size: 18 },
					color: textColor,
					padding: {
						top: 10,
						bottom: 10
				}
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
		},
		layout: {
			padding: 10
	}
		// }
	};


	//...................

	const myData = xValues.map((e, i) => {
		return ({ x: e, y: yValues[i] })
	})
	// console.log(myData)


	let data;

		data = {
			// labels, //nur bei type: Line
			datasets: [
				{
					// label: 'Körpertemperatur',
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


//-------------------------------------------------------------
	return (
		<ChartStyle >
				<Line 
					options={options} 
					data={data} 
					redraw={true} />
		</ChartStyle>
	)
};




export default TimeChartT;
