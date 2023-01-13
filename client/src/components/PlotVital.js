import TimeChartT from '../components/charts/TimeChartT'
import TimeChartP2 from '../components/charts/TimeChartP2'
import TimeChartNMD from './charts/TBarChartNMD'
import { createTData, createPData, createNMData } from '../utils/testdata'

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

    console.log("dataNMDSet",dataNMDSet)

    return (
        <div style={{ marginTop: '2.0rem' }} >
            {
                itemVital.items.filter(e => e.selected === true).length > 0 &&
                <div>
  
                    < TimeChartT
                        xValues={xValues} yValues={yTValues}
                    />
          
                    < TimeChartP2 xValues={xValues} y1Values={yP1Values} y2Values={yP2Values} />

                </div>

            }

        </div >
    )
}

export default PlotVital