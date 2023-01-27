import TimeChartT from '../components/charts/TimeChartT';
import TimeChartP2 from '../components/charts/TimeChartP2';
import { createTData, createPData } from '../utils/testdata';
import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { DateTime } from "luxon";


// import { get } from 'mongoose';
// import { DatasetController } from 'chart.js';

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

	const { diary } = useDataContext();
	const { events, userData, getEventsFromBackend } = useUserContext();

	const [tsArray, setTsArray] = useState([]);


	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createTData(), createPData();)

	let dataTSet = {};
	if (itemVital.items[0].values.length > 30) {
		console.log("daten aus der Datembank")
		dataTSet.temperature = itemVital.items[0].values;
		dataTSet.tsArray = diary.date;
	}
	else
		dataTSet = createTData();

	const xValues = dataTSet.tsArray;
	const yTValues = dataTSet.temperature;


	let dataPSet = {};
	if (itemVital.items[1].values.length > 30) {
		dataPSet.pressureH = itemVital.items[1].values;
		dataPSet.pressureL = itemVital.items[2].values;
		dataTSet.tsArray = diary.date;
	} else
		dataPSet = createPData();


	const yP1Values = dataPSet.pressureH;
	const yP2Values = dataPSet.pressureL;

	//..........................

	useEffect(() => {
		if (!events)
			getEventsFromBackend(userData.id)
	}, [])


	useEffect(() => {
		if (events) {
			let array = [];
			events.map((e, i) => {
				// console.log(e.category)
				if (e.category === 'Therapie') {
					array.push(DateTime.fromISO(e.end).ts)
					// console.log("-------", e.category, ts, array)
					return (e)
				}
			})
			setTsArray(array)
		}
	}, [], [events])


	//............................

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2.0rem'
		}} >
			{
				itemVital.items.filter(e => e.selected === true).length > 0 &&
				<ChartsGroup>
					<div  >
						{
							itemVital.items[0].selected &&
							< TimeChartT
								xValues={xValues}
								yValues={yTValues}
								titel={'Körpertemperatur'}
								name={itemVital.items[0].label}
								unit={itemVital.items[0].unit}
								tsArray={tsArray}
							/>
						}
					</div>
					<div  >
						< TimeChartP2 xValues={xValues} y1Values={yP1Values} y2Values={yP2Values} />

					</div>
				</ChartsGroup>

			}

		</div >
	)
}

export default PlotVital

//---------------------------------------------------------------------


const ChartsGroup = styled.div`
  width: 80%;
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`