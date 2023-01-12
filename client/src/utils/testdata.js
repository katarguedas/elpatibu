
import { DateTime } from "luxon";

//------------------------------------------------------


export const createTData = () => {


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
        str = '2022-12-' + day + 'T00:00:00';
        datestringArray.push(str);

        temperature.push(36.5 + Math.random() * 1.6);
    }
    for (let i = 2; i < 30; i = i + 6) {
        temperature[i] = temperature[i] + 0.9;
        temperature[i + 3] = temperature[i + 3] - 0.3;
    }

    let tsArray = [];
    for (let k = 0; k < datestringArray.length; k++) {
        const tmp = DateTime.fromISO(datestringArray[k])
        tsArray.push(tmp.toMillis())
    }

    // console.log(tsArray)

    const dataSet = {
        tsArray: tsArray,
        temperature: temperature
    }

    return dataSet
}

//........................................

export const createPData = () => {

    let pressureH = [];
    let pressureL = [];
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

        pressureH.push(122 + Math.random() * 20);
        pressureL.push(80 + Math.random() * 11);
    }

    let tsArray = [];
    for (let k = 0; k < datestringArray.length; k++) {
        const tmp = DateTime.fromISO(datestringArray[k])
        tsArray.push(tmp.toMillis())
    }


    const dataSet = {
        tsArray: tsArray,
        pressureH: pressureH,
        pressureL: pressureL
    }

    return dataSet
}