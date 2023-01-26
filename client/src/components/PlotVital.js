import TimeChartT from '../components/charts/TimeChartT';
import TimeChartP2 from '../components/charts/TimeChartP2';
import { createTData, createPData, createNMData } from '../utils/testdata';
import { useDataContext } from '../providers/dataContext';
import styled from 'styled-components';

// import { get } from 'mongoose';
// import { DatasetController } from 'chart.js';

//----------------------------------------------------------


const PlotVital = ({ itemVital }) => {

    const { diary } = useDataContext();


    let dataTSet = {};
    if (itemVital.items[0].values.length > 30) {
        console.log("daten aus der Datembank")
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

    // console.log(dataPSet)

    const yP1Values = dataPSet.pressureH;
    const yP2Values = dataPSet.pressureL;


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.0rem' }} >
            {
                itemVital.items.filter(e => e.selected === true).length > 0 &&
                <ChartsGroup>
                    <div  >
                        {
                            itemVital.items[0].selected &&
                            < TimeChartT
                                xValues={xValues}
                                yValues={yTValues}
                                titel={'Körpertemperatur'}
                                name={itemVital.items[0].label}
                                unit={itemVital.items[0].unit}
                            />
                        }
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

//---------------------------------------------------------------------

const ChartsGroup = styled.div`
  width: 80%;
  @media (max-width: 1200px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`