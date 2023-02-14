import TimeChartSleep from '../components/charts/TimeChartW';
import { createWData } from '../utils/testdata';
import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components';
import { useState } from 'react';

//----------------------------------------------------------


const PlotSleep = ({ itemSleep }) => {

	const { diary } = useDataContext();
	const { userData, getEventsFromBackend, timeCatArrays } = useUserContext();


	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createWData())

	let dataTSet = {};
	if (itemSleep.items[0].values.length > 30) {
		// console.log("daten aus der Datembank")
		dataTSet.weight = itemSleep.items[0].values;
		dataTSet.tsArray = diary.date;
	}
	else
		dataTSet = createWData();

	const xValues = dataTSet.tsArray;
	const yTValues = dataTSet.weight;

	//............................

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2.0rem'
		}} >
			{
				itemSleep.items.filter(e => e.selected === true).length > 0 &&
				<ChartsGroup>
					<div  >
						{
							itemSleep.items[0].selected &&
							< TimeChartSleep
								xValues={xValues}
								yValues={yTValues}
								titel={'Körpergewicht'}
								name={itemSleep.items[0].label}
								unit={itemSleep.items[0].unit}
							/>
						}
					</div>
				</ChartsGroup>
			}
		</div >
	)
}

export default PlotSleep;

//---------------------------------------------------------------------


const ChartsGroup = styled.div`
  width: 85%;
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`