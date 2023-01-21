
import { DateTime } from "luxon";

//------------------------------------------------------

export const setDateRange = () => {
    const yearS = '2022';
    const monthS = '11';
    const dayS = '04';

    const datumStrS = yearS + '-' + monthS + '-' + dayS + 'T12:00:00';
    // console.log('datumStr', datumStrS)
    const datumS = DateTime.fromISO(datumStrS)
    // console.log('Startdatum', datumS)
    // console.log('Startdatum, ts', datumS.ts)

    const yearE = '2022';
    const monthE = '12';
    const dayE = '20';

    const datumStrE = yearE + '-' + monthE + '-' + dayE + 'T12:00:00';
    // console.log('datumStr', datumStrE)
    const datumE = DateTime.fromISO(datumStrE)
    // console.log('Enddatum', datumE)
    // console.log('Enddatum, ts', datumE.ts)

    const oneday = 24 * 60 * 60 * 1000;
    // console.log("24h in timestamp: ", oneday)

    let lastDay = datumE.ts;
    let currentDay = datumS.ts;
    let tsArray = [datumS.ts];
    while (currentDay < lastDay) {
        currentDay = currentDay + oneday;
        tsArray.push(currentDay)
    }
    // console.log("tsArray:", tsArray)

    return tsArray;
}

//........................................

export const createTData = () => {

    const tsArray = setDateRange()

    let temperature = [];
    for (let i = 0; i < tsArray.length - 12; i++) {
        temperature.push(36.9 + Math.random() * 1.4);
    }
    for (let i = tsArray.length - 12; i < tsArray.length; i++) {
        temperature.push(36.5 + Math.random() * 1.1);
    }
    for (let i = 2; i < 30; i = i + 5) {
        temperature[i] = temperature[i] + 0.9;
        temperature[i + 3] = temperature[i + 3] - 0.3;
    }

    const dataSet = {
        tsArray: tsArray,
        temperature: temperature
    }
    console.log('dataSet', dataSet)

    return dataSet;
}

//........................................

export const createPData = () => {

    const tsArray = setDateRange()

    let pressureH = [];
    let pressureL = [];

    for (let i = 0; i < tsArray.length; i++) {

        pressureH.push(122 + Math.random() * 20);
        pressureL.push(80 + Math.random() * 11);
    }

    const dataSet = {
        tsArray: tsArray,
        pressureH: pressureH,
        pressureL: pressureL
    }

    console.log('dataSet', dataSet)

    return dataSet;
}

export const createNMData = () => {

    let datestringArray = [];

    const tsArray = setDateRange()
    for (let i = 0; i < tsArray.length; i++) {
        let date = DateTime.fromSeconds(tsArray[i] / 1000);
        let day = date.day;
        let month = date.month;
        let year = date.year;
        // console.log(day, month);
        const dateStr = day + '.' + month + '.' + year;
        datestringArray.push(dateStr)
    }
    let values = [];
    let min = 1;
    let max = 4;
    for (let i = 0; i < datestringArray.length; i++) {
        let x = Math.round((Math.random() * (max - min)) + min);
        if (i === 6)
            x = 5
        if ((i === 9) || (i === 21) || (i === 1) || (i === 3) || (i === 12) || (i === 11)  || (i === 26)  || (i === 24)  || (i === 23)  || (i === 22)  || (i === 30)  || (i === 31)  || (i === 32)  || (i === 33))
            x = 1
        values.push(x)
    }
    // console.log("dataStringArray: ", datestringArray)

    const dataSet = {
        dateString: datestringArray,
        values: values
    }
    return dataSet
}

export const createNMData2 = () => {

    let datestringArray = [];

    const tsArray = setDateRange()
    for (let i = 0; i < tsArray.length; i++) {
        let date = DateTime.fromSeconds(tsArray[i] / 1000);
        let day = date.day;
        let month = date.month;
        let year = date.year;
        // console.log(day, month);
        const dateStr = day + '.' + month + '.' + year;
        datestringArray.push(dateStr)
    }
    let values = [];
    let min = 1;
    let max = 4;
    for (let i = 0; i < datestringArray.length; i++) {
        let x = Math.round((Math.random() * (max - min)) + min);
        if ((i === 9) || (i === 21) || (i === 1) || (i === 3) || (i === 4) || (i === 5)  || (i === 6)  || (i === 24)  || (i === 23)  || (i === 22)  || (i === 27)  || (i === 28)  || (i === 29)  || (i === 36))
            x = 1
        values.push(x)
    }
    // console.log("dataStringArray: ", datestringArray)

    const dataSet = {
        dateString: datestringArray,
        values: values
    }
    return dataSet
}


