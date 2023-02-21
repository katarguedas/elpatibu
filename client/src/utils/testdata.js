
import { DateTime } from "luxon";

//------------------------------------------------------

export const setDateRange = () => {
	const yearS = '2022';
	const monthS = '11';
	const dayS = '04';

	const datumStrS = yearS + '-' + monthS + '-' + dayS + 'T12:00:00';
	const datumS = DateTime.fromISO(datumStrS)

	const yearE = '2022';
	const monthE = '12';
	const dayE = '20';

	const datumStrE = yearE + '-' + monthE + '-' + dayE + 'T12:00:00';
	const datumE = DateTime.fromISO(datumStrE)

	const oneday = 24 * 60 * 60 * 1000;

	let lastDay = datumE.ts;
	let currentDay = datumS.ts;
	let tsArray = [datumS.ts];
	while (currentDay < lastDay) {
		currentDay = currentDay + oneday;
		tsArray.push(currentDay)
	}
	return tsArray;
}

//........................................

export const createTData = () => {

	const tsArray = setDateRange()

	let temperature = [];
	for (let i = 0; i < tsArray.length - 12; i++) {
		temperature.push(36.8 + Math.random() * 1.4);
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
	// console.log('dataSet', dataSet)

	return dataSet;
}

//........................................

export const createP2Data = () => {

	const tsArray = setDateRange()

	let pressureH = [];
	let pressureL = [];

	for (let i = 0; i < tsArray.length; i++) {

		pressureH.push(parseInt(118 + Math.random() * 20));
		pressureL.push(parseInt(78 + Math.random() * 11));
	}

	const dataSet = {
		tsArray: tsArray,
		pressureH: pressureH,
		pressureL: pressureL
	}

	// console.log('dataSet', dataSet)

	return dataSet;

}

//----------------------------------------------

export const createPData = () => {

	const tsArray = setDateRange()

	let pulse = [];

	for (let i = 0; i < tsArray.length; i++) {

		pulse.push(60 + Math.random() * 5);
	}

	const dataSet = {
		tsArray: tsArray,
		pulse: pulse,
	}
	// console.log('dataSet', dataSet)

	return dataSet;
}
//-------------------------------------------------

export const createWData = () => {

	const tsArray = setDateRange()

	let weight = [];
	for (let i = 0; i < tsArray.length - 12; i++) {
		weight.push(parseFloat((53.8 + Math.random() * 0.4).toFixed(1)));
	}
	for (let i = tsArray.length - 12; i < tsArray.length; i++) {
		weight.push(parseFloat((53.55 + Math.random() * 0.3).toFixed(1)));
	}


	const dataSet = {
		tsArray: tsArray,
		weight: weight
	}
	// console.log('dataWset', dataSet)

	return dataSet;
}

//-------------------------------------------------
export const createSData = () => {

	const tsArray = setDateRange()

	let hours = [];
	for (let i = 0; i < tsArray.length; i++) {
		hours.push(parseInt((6 + Math.random() * 1.5).toFixed(1)) + 0.5);
	}
	hours[3] = hours[3] + 1;
	hours[6] = hours[6] + 0.5;
	hours[22] = hours[22] - 0.5;
	hours[13] = hours[13] + 0.5;
	hours[11] = hours[11] - 1;
	hours[25] = hours[25] - 0.5;
	hours[19] = hours[19] - 1;
	hours[11] = hours[11] - 1;

	const dataSet = {
		dateString: tsArray,
		hours: hours
	}

	return dataSet;
}
//-------------------------------------------------
export const createNMData = () => {

	const tsArray = setDateRange();

	let values = [];
	let min = 1;
	let max = 4;
	for (let i = 0; i < tsArray.length; i++) {
		let x = Math.round((Math.random() * (max - min)) + min);
		if (i === 6)
			x = 5
		if ((i === 9) || (i === 21) || (i === 1) || (i === 3) || (i === 12) || (i === 11) || (i === 26) || (i === 24) || (i === 23) || (i === 22) || (i === 30) || (i === 31) || (i === 32) || (i === 33))
			x = 1
		values.push(x)
	}

	const dataSet = {
		dateString: tsArray,
		values: values
	}
	return dataSet
}

//----------------------------------------
export const createNMData2 = () => {

	const tsArray = setDateRange();

	let values = [];
	let min = 1;
	let max = 4;
	for (let i = 0; i < tsArray.length; i++) {
		let x = Math.round((Math.random() * (max - min)) + min);
		if ((i === 9) || (i === 21) || (i === 1) || (i === 3) || (i === 4) || (i === 5) || (i === 6) || (i === 24) || (i === 23) || (i === 20) || (i === 27) || (i === 28) || (i === 29) || (i === 36))
			x = 1
		values.push(x)
	}
	// console.log("dataStringArray: ", datestringArray)

	const dataSet = {
		dateString: tsArray,
		values: values
	}
	return dataSet
}


