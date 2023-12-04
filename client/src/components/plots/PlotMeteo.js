
import BarChartNMD from '../charts/BarChartNMD';
import MultiTypeChart from '../charts/MultiTypeChart';
import { PlotSection } from '../../styled/globalStyles';
import { createNMData, createNMData2, setDateRange } from '../../utils/testdata';
import { getDateStrFromTs, getdmStrFromTs } from '../../utils/Date';
import { WeatherButton, WeatherButton2 } from '../../styled/Buttons';
import { useDataContext } from '../../providers/dataContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//----------------------------------------------------------


const PlotMeteo = ({ itemMeteo }) => {

	const { getWeatherData, weatherData, diary, demo } = useDataContext()

	const [active, setActive] = useState(false);
	const [done, setDone] = useState(false);


	let dataNMDSet = {};
	let dataNMD2Set = {};
	let dataNMD3Set = {};


	if (itemMeteo.items[0].selected === true) {
		if (demo === true) {
			dataNMDSet = createNMData();
		}
		else {
			dataNMDSet.values = itemMeteo.items[0].values;
			dataNMDSet.dateString = [...diary.timestamp];
		}
		dataNMDSet.dateString.forEach((e, i) => {
			dataNMDSet.dateString[i] = getdmStrFromTs(e);
		})
	}


	if (itemMeteo.items[1].selected === true) {
		if (demo === true) {
			dataNMD2Set = createNMData2();
		}
		else {
			dataNMD2Set.values = itemMeteo.items[1].values;
			dataNMD2Set.dateString = [...diary.timestamp];
		}
		dataNMD2Set.dateString.forEach((e, i) => {
			dataNMD2Set.dateString[i] = getdmStrFromTs(e);
		})
	}

	if (itemMeteo.items[2].selected === true) {
		if (demo === true) {
			dataNMD3Set = createNMData2();
		}
		else {
			dataNMD3Set.values = itemMeteo.items[2].values;
			dataNMD3Set.dateString = [...diary.timestamp];
		}
		dataNMD3Set.dateString.forEach((e, i) => {
			dataNMD3Set.dateString[i] = getdmStrFromTs(e);
		})
	}

	//............

	const handleClick = () => {
		if (weatherData === undefined) {
			const city = diary.city;
			if (demo) {
				const tsArray = setDateRange();
				const startDate = getDateStrFromTs(tsArray[0]);
				const endDate = getDateStrFromTs(tsArray[tsArray.length - 1]);
				getWeatherData(city, startDate, endDate);
			} else {
				const startDate = getDateStrFromTs(diary.timestamp[0]);
				if (diary.timestamp.length > 1) {
					const endDate = getDateStrFromTs(diary.timestamp[diary.timestamp.length - 2]);
					getWeatherData(city, startDate, endDate);
				}
			}
		}
	}

	const handleClickActive = () => {
		setActive(!active)
	}

	useEffect(() => {
		if (weatherData)
			setDone(true)
	}, [weatherData])


	//.................................................

	return (
		<PlotSection>
			<div styled={{ padding: '1.0rem' }} >
				{
					!done && !weatherData &&
					<WeatherButton onClick={handleClick} >
						Wetterdaten abrufen
					</WeatherButton >
				}
				{weatherData &&
					done &&
					<WeatherButton2 onClick={handleClickActive} >
						{
							active ?
								'Wetterdaten ausblenden'
								: ' Wetterdaten einblenden'
						}
					</WeatherButton2 >
				}
			</div>
			{
				itemMeteo.items.filter(e => e.selected === true).length > 0 &&
				<ChartsGroup >
					{active ?
						weatherData &&
						itemMeteo.items.map(e => (
							<div key={e.id}>
								{
									e.name === 'headache' &&
									<MultiTypeChart
										xValues={dataNMDSet.dateString}
										y1Values={weatherData[0].values}
										y2Values={dataNMDSet.values}
										labels={e.dateStr}
										name={e.label}
										label2={weatherData[0].label}
										unit={weatherData[0].unit}
									/>
								}
								{
									e.name === 'fatigue' &&
									<MultiTypeChart
										xValues={dataNMD2Set.dateString}
										y1Values={weatherData[0].values}
										y2Values={dataNMD2Set.values}
										name={e.label}
										label2={weatherData[0].label}
										unit={weatherData[0].unit} />
								}
								{
									e.name === 'joint pain' &&
									<MultiTypeChart
										xValues={dataNMD3Set.dateString}
										y1Values={weatherData[3].values}
										y2Values={dataNMD3Set.values}
										name={e.label}
										label2={weatherData[3].label}
										unit={weatherData[3].unit} />
								}
							</div>
						))
						:
						itemMeteo.items.map(e => (
							<div key={e.id}>
								{
									e.name === 'headache' &&
									<BarChartNMD
										xVal={dataNMDSet.dateString}
										yVal={dataNMDSet.values}
										name={e.label} />
								}
								{
									e.name === 'fatigue' &&
									<BarChartNMD
										xVal={dataNMD2Set.dateString}
										yVal={dataNMD2Set.values}
										name={e.label} />
								}
								{
									e.name === 'joint pain' &&
									<BarChartNMD
										xVal={dataNMD3Set.dateString}
										yVal={dataNMD3Set.values}
										name={e.label} />
								}
							</div>
						))
					}
				</ChartsGroup>
			}

		</PlotSection >
	)
}

export default PlotMeteo;


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