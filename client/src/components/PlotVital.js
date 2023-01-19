import TimeChartT from '../components/charts/TimeChartT'
import TimeChartP2 from '../components/charts/TimeChartP2'
import TimeChartNMD from './charts/TBarChartNMD'
import { createTData, createPData, createNMData } from '../utils/testdata'
import styled from 'styled-components';

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

    // console.log(itemVital.items)

    const dataTSet = createTData();

    const xValues = dataTSet.tsArray;
    const yTValues = dataTSet.temperature;


    const dataPSet = createPData();

    console.log(dataPSet)

    const yP1Values = dataPSet.pressureH;
    const yP2Values = dataPSet.pressureL;


    const dataNMDSet = createNMData();

    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;

    console.log("dataNMDSet", dataNMDSet)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.0rem' }} >
            {
                itemVital.items.filter(e => e.selected === true).length > 0 &&
                <ChartsGroup>
                    <div  >
                        < TimeChartT
                            xValues={xValues} yValues={yTValues} name={'Temperatur'}
                        />
                    </div>
                    <div  >
                        < TimeChartP2 xValues={xValues} y1Values={yP1Values} y2Values={yP2Values} />

                    </div>
                </ChartsGroup>

            }

        </div >
    )
}

export default PlotVital



const ChartsGroup = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 1200px) {
    width: 85%;
  }
`