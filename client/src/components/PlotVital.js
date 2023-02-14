import TimeChartT from '../components/charts/TimeChartT';
import TimeChartP2 from '../components/charts/TimeChartP2';
import { createTData, createPData } from '../utils/testdata';
import { StSpan } from '../styled/globalStyles';
import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components';
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { useEffect, useState } from 'react';


// import { get } from 'mongoose';
// import { DatasetController } from 'chart.js';

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

	const { diary } = useDataContext();
	const { userData, getEventsFromBackend, timeCatArrays } = useUserContext();

	const [showTherapie, setShowTherapie] = useState(false);

	console.log("timeCatArrays", timeCatArrays)

	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createTData(), createPData();)

	let dataTSet = {};
	if (itemVital.items[0].values.length > 30) {
		// console.log("daten aus der Datembank")
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


	//..................................


	const handleClick = () => {
		setShowTherapie(!showTherapie)
	}

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

						{showTherapie ?
							<div >
								<BiCheckSquare onClick={handleClick} />
								<StSpan> Therapietermine einblenden</StSpan>
							</div>
							:
							<div>
								<BiSquare onClick={handleClick} />
								<StSpan> Therapietermine einblenden</StSpan>
							</div>
						}

					<div  >
						{
							itemVital.items[0].selected &&
							< TimeChartT
								xValues={xValues}
								yValues={yTValues}
								titel={'Körpertemperatur'}
								name={itemVital.items[0].label}
								unit={itemVital.items[0].unit}
								showTherapie={showTherapie}
							/>
						}
					</div>
					<div  >
						< TimeChartP2 
						xValues={xValues} 
						y1Values={yP1Values} 
						y2Values={yP2Values} 
						/>

					</div>
				</ChartsGroup>

			}

		</div >
	)
}

export default PlotVital;

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
