import BarChartNMD from './charts/BarChartNMD';
import { createNMData, createNMData2 } from '../utils/testdata';
import { getStrFromTs, getdmStrFromTs } from '../utils/Date';
import { useDataContext } from '../providers/dataContext';
import styled from 'styled-components';

//----------------------------------------------------------

const PlotSymptoms = ({ itemSymptoms }) => {

	const { diary, demo } = useDataContext()


	let dateString = {};
	if ((diary.date.length > 0) && (!demo)) {
		dateString = [...diary.timestamp];
		dateString.forEach((e, i) => {
			dateString[i] = getdmStrFromTs(e);
		})
		// console.log("date", dateString);
	}

	let dataNMDSet = {};

	if (demo === true) {
		dataNMDSet = createNMData();
		console.log("data", dataNMDSet)
		dataNMDSet.dateString.forEach((e, i) => {
			dataNMDSet.dateString[i] = getdmStrFromTs(e);
		})
	}

	//.................................................

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2.0rem'
		}} >
			<ChartsGroup >
				{
					demo ?
						itemSymptoms.items.map(e => (
							e.selected &&
							<BarChartNMD
							key={e.id}
								xVal={dataNMDSet.dateString}
								yVal={dataNMDSet.values}
								name={e.label}
							/>
						))
						:
						itemSymptoms.items.map(e => (
							e.selected &&
							<BarChartNMD
							key = {e.id}
								xVal={dateString}
								yVal={e.values}
								name={e.label}
							/>
						))
				}
			</ChartsGroup>
		</div>
	)
}

export default PlotSymptoms;


//-------------------------------------------------------------------------


const ChartsGroup = styled.div`

			width: 85%;
			@media (max-width: 1200px) {
				width: 90%;
  }
			@media (max-width: 768px) {
				width: 100%;
  }
			`