import BarChartSleepH from '../components/charts/BarChartSleepH';
import BarChartNMD from './charts/BarChartNMD';
import { createSData } from '../utils/testdata';
import { useDataContext } from '../providers/dataContext';
import styled from 'styled-components';
import { createNMData } from '../utils/testdata';
import { getdmStrFromTs } from '../utils/Date';
import { calcAverage } from '../utils/helperfunctions';
import { StP } from '../styled/globalStyles';
import { theme } from '../themes/theme';

//----------------------------------------------------------

const PlotSleep = ({ itemSleep }) => {

	const { diary, demo } = useDataContext();


	let dataSset = {};
	let dataSIset = {};
	let dataSRset = {};


	if (itemSleep.items[0].selected === true) {
		if (demo) {
			dataSset = createSData();
			dataSset.dateString.forEach((e, i) => {
				dataSset.dateString[i] = getdmStrFromTs(e);
			})
		} else {
			dataSset.hours = [...itemSleep.items[0].values];
			dataSset.dateString = [...diary.timestamp];
			dataSset.dateString.forEach((e, i) => {
				dataSset.dateString[i] = getdmStrFromTs(e);
			})
		}
	}

	if (itemSleep.items[1].selected === true) {
		if (demo) {
			dataSIset = createNMData();
		} else {
			dataSIset.values = [...itemSleep.items[1].values];
			dataSIset.dateString = [...diary.timestamp];
		}
		dataSIset.dateString.forEach((e, i) => {
			dataSIset.dateString[i] = getdmStrFromTs(e);
		})
	}

	if (itemSleep.items[2].selected === true) {
		if (demo) {
			dataSRset = createNMData();
		} else {
			dataSRset.values = [...itemSleep.items[2].values];
			dataSRset.dateString = [...diary.timestamp];
		}
		dataSRset.dateString.forEach((e, i) => {
			dataSRset.dateString[i] = getdmStrFromTs(e);
		})
	}

	//-----------------------------------------


	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '2.0rem'
		}} >

			<ChartsGroup >
				<StP style={{
					fontWeight: '500',
					textAlign: 'center',
					color: theme.colors.col3,
					backgroundColor: theme.colors.col4,
					borderRadius: '0.5rem',
					padding: '0.25rem'
				}} >
					Du hast im erfassten Zeitraum im Durchschnitt {(calcAverage(dataSset.hours)).toFixed(1)} Stunden geschlafen.
				</StP>
				{diary &&
					itemSleep.items[0].selected &&
					<BarChartSleepH
						xVal={dataSset.dateString}
						yVal={dataSset.hours}
						name={itemSleep.items[0].label} />
				}
				{diary &&
					itemSleep.items[1].selected &&
					<BarChartNMD
						xVal={dataSIset.dateString}
						yVal={dataSIset.values}
						name={itemSleep.items[1].label}
					/>
				}
				{diary &&
					itemSleep.items[2].selected &&
					<BarChartNMD
						xVal={dataSRset.dateString}
						yVal={dataSRset.values}
						name={itemSleep.items[2].label}
					/>
				}

			</ChartsGroup>

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