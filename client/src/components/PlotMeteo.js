
import TimeChartNMD from './charts/TBarChartNMD'
import { createNMData } from '../utils/testdata'

//----------------------------------------------------------


const PlotMeteo = ({ itemMeteo }) => {


    const dataNMDSet = createNMData();

    const xVal = dataNMDSet.dateString;
    const yVal = dataNMDSet.values;

    // console.log("dataNMDSet", dataNMDSet)

    return (
        <div style={{ marginTop: '2.0rem' }} >
            {
                itemMeteo.items.filter(e => e.selected === true).length > 0 &&
                <div>
                    {itemMeteo.items.map(e => (

                        <TimeChartNMD xVal={xVal} yVal={yVal} name={e.label} />
                    ))



                    }
                </div>

            }

        </div >
    )
}

export default PlotMeteo