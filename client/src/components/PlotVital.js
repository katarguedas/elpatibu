import LineChartT from '../components/charts/LineChartT';
import TimeChartT from '../components/charts/TimeChartT';
import TimeChartP2 from '../components/charts/TimeChartP2';
import TimeChartP from './charts/TimeChartP';
import LineChartP2 from './charts/LineChartP2';
import { createTData, createP2Data, createPData } from '../utils/testdata';
import { getStrFromTs } from '../utils/Date';
import { StSpan } from '../styled/globalStyles';
import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components';
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { DateTime } from "luxon";

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

	const { diary, demo } = useDataContext();
	const { userData, getEventsFromBackend, timeCatArrays } = useUserContext();

	const [showTherapie, setShowTherapie] = useState(false);

	// console.log("DIARY.date", diary)
	// console.log("timeCatArrays", timeCatArrays)

	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createTData(), createPData();)

	let dataTSet = {};
	if (demo) {
		dataTSet = createTData();
	}
	else {
		dataTSet.temperature = itemVital.items[0].values;
		// console.log("22222", typeof(diary.timestamp[0]), diary.timestamp[0])
		dataTSet.tsArray =[...diary.timestamp];
		// console.log(dataTSet.tsArray)

		// dataTSet.tsArray.forEach((e, i) => {
		// 	console.log(typeof(e), e, DateTime.fromISO(e))
		// 	dataTSet.tsArray[i] = (DateTime.fromISO(e).ts)
		// })
	}

	// console.log("dataTSet",dataTSet)
	// console.log("tsArray",dataTSet.tsArray)

	// const xValues = [...dataTSet.tsArray];
	// console.log("XVALUES", xValues)
	// const yTValues = dataTSet.temperature;


	let dataP2Set = {};
	if (demo) {
		dataP2Set = createP2Data();
	} else {
		dataP2Set.pressureH = itemVital.items[1].values;
		dataP2Set.pressureL = itemVital.items[2].values;
		dataP2Set.tsArray = diary.timestamp;
	}

	// const yP1Values = dataPSet.pressureH;
	// const yP2Values = dataPSet.pressureL;

	// let dateStr = dataTSet.tsArray;
	// // console.log("tsARray", dataTSet.tsArray)
	// dateStr.forEach((e, i) => {
	// 	dateStr[i] = getStrFromTs(e);
	// })

	let dataPSet = {};
	if (demo) {
		dataPSet = createPData();
	} else {
		dataPSet.pulse = itemVital.items[3].values;
		dataPSet.tsArray = diary.timestamp;
	}
	// console.log("pulse",dataPSet.pulse)

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
					<div >
						{
							itemVital.items[0].selected &&
							<div>
								< TimeChartT
									xValues={dataTSet.tsArray}
									yValues={dataTSet.temperature}
									titel={'Körpertemperatur'}
									name={itemVital.items[0].label}
									unit={itemVital.items[0].unit}
									showTherapie={showTherapie}
								/>
							</div>
						}
						{
							itemVital.items[1].selected && itemVital.items[2].selected &&
							<div>
								<TimeChartP2
									xValues={dataP2Set.tsArray}
									y1Values={dataP2Set.pressureH}
									y2Values={dataP2Set.pressureL}
									name={itemVital.items[2].label}
									unit={itemVital.items[2].unit}
								/>
							</div>
						}
						{
							itemVital.items[3].selected &&
							<div>
								<TimeChartP
									xValues={dataPSet.tsArray}
									yValues={dataPSet.pulse}
									titel={'Puls'}
									name={itemVital.items[3].label}
									unit={itemVital.items[3].unit}
								/>
							</div>
						}
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
