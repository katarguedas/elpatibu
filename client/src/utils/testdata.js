
import { DateTime } from "luxon";

//------------------------------------------------------

export const createData = () =>{


    const { tempData} = useDataContext()

    // const string = '2022-12-01 12:00:00'

    let temperature = [];
    let day;
    let str;
    let datestringArray = [];
    for (let i = 1; i < 32; i++) {
        if (i < 10)
            day = '0' + i;
        else
            day = i;
        str = '2022-12-' + day + 'T12:00:00';
        datestringArray.push(str);

        temperature.push(36.3 + Math.random() * 0.7);
    }

    console.log(datestringArray)
    console.log(temperature)



    let tsArray = [];
    for (let k = 0; k < datestringArray.length; k++) {
        const tmp = DateTime.fromISO(datestringArray[k])
        tsArray.push(tmp.toMillis())
    }

    console.log(tsArray)

    return [temperature, tsArray]

}