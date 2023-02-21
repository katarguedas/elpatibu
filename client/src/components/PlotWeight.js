import TimeChartW from '../components/charts/TimeChartW';
import { createWData } from '../utils/testdata';
import { getStrFromTs } from '../utils/Date';
import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

//----------------------------------------------------------


const PlotWeight = ({ itemWeight }) => {

	const { diary, demo } = useDataContext();

	// bei fehlenden Daten in der Datenbank werden zu Test- und Vorführtzwecken welche generiert (createWData())


	let dataWset = {};
	if (demo) {
		dataWset = createWData();
	} else {
		dataWset.tsArray = diary.timestamp;
		dataWset.weight = itemWeight.items[0].values;
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
				itemWeight.items.filter(e => e.selected === true).length > 0 &&
				<ChartsGroup>
					<div  >
						{
							itemWeight.items[0].selected &&
							< TimeChartW
								xValues={dataWset.tsArray}
								yValues={dataWset.weight}
								titel={'Körpergewicht'}
								name={itemWeight.items[0].label}
								unit={itemWeight.items[0].unit}
							/>
						}
					</div>
				</ChartsGroup>
			}
		</div >
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