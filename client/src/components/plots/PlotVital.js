import TimeChartT from '../charts/TimeChartT';
import TimeChart from '../charts/TimeChart';
import { createTData, createP2Data, createPData } from '../../utils/testdata';
import { StSpan, PlotSection } from '../../styled/globalStyles';
import { useDataContext } from '../../providers/dataContext';
import styled from 'styled-components';
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { useState } from 'react';

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

	const { diary, demo } = useDataContext();

	const [showTherapie, setShowTherapie] = useState(false);

	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createTData(), createPData();)

	let dataTSet = {
		tsArray: [],
		temperature: []
	};
	if (demo) {
		dataTSet = createTData();
	}
	else {
		dataTSet.temperature = [itemVital.items[0].values];
		dataTSet.tsArray = [...diary.timestamp];
	}

	let dataP2Set = {
		tsArray: [],
		pressure: []
	};
	if (demo) {
		dataP2Set = createP2Data();
	} else {
		dataP2Set.pressure.push(itemVital.items[1].values)
		dataP2Set.pressure.push(itemVital.items[2].values)
		dataP2Set.tsArray = diary.timestamp;
	}

	let dataPSet = {
		tsArray: [],
		pulse: []
	};
	if (demo) {
		dataPSet = createPData();
	} else {
		dataPSet.pulse = [itemVital.items[3].values];
		dataPSet.tsArray = diary.timestamp;
	}

	//..................................

	const handleClick = () => {
		setShowTherapie(!showTherapie)
	}

	//............................

	return (
		<PlotSection >
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
								<TimeChart
									xValues={dataP2Set.tsArray}
									yValues={dataP2Set.pressure}
									name={itemVital.items[2].label}
									unit={itemVital.items[2].unit}
									title="asdfad"
									rm={15}
									identifier='P2'
								/>
							</div>
						}
						{
							itemVital.items[3].selected &&
							<div>
								<TimeChart
									xValues={dataPSet.tsArray}
									yValues={[dataPSet.pulse]}
									titel={'Puls'}
									name={itemVital.items[3].label}
									unit={itemVital.items[3].unit}
									rm={-6}
								/>
							</div>
						}
					</div>
				</ChartsGroup>

			}

		</PlotSection >
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
