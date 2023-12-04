import TimeChart from '../charts/TimeChart';
import { PlotSection } from '../../styled/globalStyles';
import { createWData } from '../../utils/testdata';
import { useDataContext } from '../../providers/dataContext';
import styled from 'styled-components';

//----------------------------------------------------------


const PlotWeight = ({ itemWeight }) => {

	const { diary, demo } = useDataContext();

	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createWData())


	let dataWset = {
		tsArray: [],
		weight: []
	};
	if (demo) {
		dataWset = createWData();
	} else {
		dataWset.tsArray = diary.timestamp;
		dataWset.weight = [itemWeight.items[0].values];
	}

	//............................

	return (
		<PlotSection >
			{
				itemWeight.items.filter(e => e.selected === true).length > 0 &&
				<ChartsGroup>
					<div  >
						{
							itemWeight.items[0].selected &&
							< TimeChart
								xValues={dataWset.tsArray}
								yValues={dataWset.weight}
								titel={'Körpergewicht'}
								name={itemWeight.items[0].label}
								unit={itemWeight.items[0].unit}
								rm={1}
							/>
						}
					</div>
				</ChartsGroup>
			}
		</PlotSection >
	)
}

export default PlotWeight;

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