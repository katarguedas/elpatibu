import BarChartNMD from '../charts/BarChartNMD';
import { PlotSection } from '../../styled/globalStyles';
import { createNMData } from '../../utils/testdata';
import { getdmStrFromTs } from '../../utils/Date';
import { useDataContext } from '../../providers/dataContext';
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
		<PlotSection>
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
								key={e.id}
								xVal={dateString}
								yVal={e.values}
								name={e.label}
							/>
						))
				}
			</ChartsGroup>
		</PlotSection>
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