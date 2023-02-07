import { theme } from '../../themes/theme';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../providers/userContext';

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

	//---------------------------------------------------}}

	const lastDay = xValues[xValues.length - 1];
	const firstDay = xValues[0];

	const colorArray = [bgcolor1, bgcolor2, bgcolor3, bgcolor4];
	const yMinArray = [36, 37.5, 38, 39];
	const yMaxArray = [37.5, 38, 39, 40];

	const [myAnnotations, setMyAnnotations] = useState([]);
	const initState = [];

	console.log("show Therapie:", showTherapie)
	console.log("first and last day", firstDay, lastDay, timeCatArrays)

	useEffect(() => {
		let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))

		if (!timeCatArrays) {
			console.log("test")
			setTimeArrays(eventsArray)
		}
	}, [])

	useEffect(() => {
		console.log("arrayLength:", timeCatArrays.therapie.length)

		if (showTherapie === true) {
			if (timeCatArrays.therapie.length > 0) {
				console.log("es gibt therapietermine zum Plotten")
				timeCatArrays.therapie.map((e, i) => {
					console.log(timeCatArrays.therapie[i])
					if ((firstDay < timeCatArrays.therapie[i]) && (timeCatArrays.therapie[i] < lastDay)) {
						console.log("....", firstDay - timeCatArrays.therapie[i] , timeCatArrays.therapie[i]-lastDay)
						console.log("myAnnotations mit Lines")
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

			colorArray.map((e, i) => {
				setMyAnnotations([
					...myAnnotations, myAnnotations.push({
						type: 'box',
						xMin: firstDay,
						xMax: lastDay,
						yMin: yMinArray[i],
						yMax: yMaxArray[i],
						backgroundColor: e,
						drawTime: 'beforeDatasetsDraw',
					})
				])
			})

			setMyAnnotations([
				...myAnnotations, myAnnotations.push({
					type: 'line',
					yMin: 39,
					yMax: 39,
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
		} else {
			console.log("-------------keine lineAnnotations")
			colorArray.map((e, i) => {
				setMyAnnotations([
					...myAnnotations, myAnnotations.push({
						type: 'box',
						xMin: firstDay,
						xMax: lastDay,
						yMin: yMinArray[i],
						yMax: yMaxArray[i],
						backgroundColor: e,
						drawTime: 'beforeDatasetsDraw',
					})
				])
			})

			setMyAnnotations([
				...myAnnotations, myAnnotations.push({
					type: 'line',
					yMin: 39,
					yMax: 39,
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
	}, [showTherapie])


	useEffect(() => {

		setMyAnnotations(initState)
		console.log("myAnnotations", myAnnotations)
	}, [showTherapie])

	//...................


	let options;
	if (name === 'Temperatur') {
		options = {
			responsive: true,
			plugins: {
				legend: {
					display: false
					// position: 'top',
				},
				title: {
					display: true,
					text: titel,
					font: { size: 22 },
					color: textColor
				},
				annotation:
				{
					annotations:
						// eventLines,
						myAnnotations,
				},
			},
			scales: {
				x: {
					// type: 'timeseries',
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
	} else {
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
					color: textColor,
				},
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
						font: { size: 16 },
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
						stepSize: 1,
						font: { size: 14 },
						callback: function (value) {
							let x = ['', 'keine', 'leichte', 'mittelstarke', 'starke', 'sehr starke'];
							return [x[value | 0]]
						}
					},
				},
			}
		};
	}


	//...................

	const myData = xValues.map((e, i) => {
		return ({ x: e, y: yValues[i] })
	})
	// console.log(myData)



	let data;

	if (name === 'Temperatur') {
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
	}
	else {
		data = {
			// labels, //nur bei type: Line
			datasets: [
				{
					// label: 'Körpertemperatur',
					data: myData,
					fill: true,
					borderColor: theme.colors.col2,
					backgroundColor: theme.colors.col4,
					tension: 0,
					borderWidth: 1,
					spanGaps: true,
					connect: false,
					pointStyle: 'circle',
					pointBorderColor: '#000',
					radius: 0,
					stepped: true,
				}
			],
		}
	}

	useEffect(() => {

	}, [])


	return (
		<div >
			{showTherapie ?
				<Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem' }} options={options} data={data} redraw={true} done='true' />
				:
				<Line style={{ marginTop: '3.0rem', marginBottom: '2.0rem' }} options={options} data={data} redraw={true} dataidkey='id' />
			}

		</div>
	)
};





export default TimeChartT;