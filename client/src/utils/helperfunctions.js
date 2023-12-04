import { todayDateTs } from "./Date";


/*********************************************************************
 * check if the timestamp for today was already set today
 * @param {*} diaryDate 
 * @param {*} setUpdate 
 *****************************/

export const checkTs = (diaryDate, setUpdate) => {

	const ts = todayDateTs();

	if (diaryDate.length > 0) {
		// checke, ob heutiges Datum bereits gespeichert
		const res = diaryDate.findIndex(e => e === ts);

		if (res >= 0)
			setUpdate(true);   // Heutiges Datum bereits vorhanden
		else
			setUpdate(false);   // Datum noch nicht vorhanden
	} else
		setUpdate(false);    // Datumarray noch leer

}

/***************************************************
 * Function sorts the elements of an array
 * @param {*} arr 
 * @returns 
 **********************/

export const sortminmax = arr => {
	console.log("events zum Sortieren", arr)
	let resSort = arr.slice();
	return (resSort.sort(function (a, b) { return a - b })).reverse();
}


/**
//  * 
//  */

// export const sortTs = (tsArr, events) => {
// 	let maxnum = null;
// 	console.log(maxnum);

// 	for (let i of tsArr) {
// 		if (maxnum < i) {
// 			maxnum = i;
// 			console.log(maxnum);
// 		}
// 	}
// }

/************************************************************************************
 * Checks if all for the diary selected values have been set today
 * @param {*} editedGroups 
 * @param {*} diary 
 * @returns true or false
 ********************************/

export const checkAllValuesToday = (editedGroups, diary) => {

	const today = todayDateTs();
	let savedAll = true;

	const saveState = (saved) => {
		if (saved === false)
			savedAll = false;
	}

	editedGroups = checkGroupsToday(editedGroups, diary);

	if ((diary) && (diary.timestamp.length > 0)) {
		const lastTs = diary.timestamp[diary.timestamp.length - 1];
		if (lastTs === today) {
			diary.groups.map((e, i) => {
				e.items.map((el, index) => {
					if (el.selected)
						saveState(editedGroups.groups[i].items[index].done)
					return el;
				})
				return e;
			})
		}
	}
	return savedAll;
}

/************************************************************************************
 * Checks if each value has been set today and updates the object editedGroups
 * @param {*} editedGroups 
 * @param {*} diary 
 * @returns editedGroups, which contains all groups and items and the information, if values have been set today (see editedGroups in useTemplates.js)
 ********************************/

export const checkGroupsToday = (editedGroups, diary) => {

	const today = todayDateTs();

	if ((diary) && (diary.timestamp.length > 0)) {
		const lastTs = diary.timestamp[diary.timestamp.length - 1];
		const timeLength = diary.timestamp.length;
		if (lastTs < today) {
			// console.log("noch gar keine Werte heute erfasst")
		}
		else if (lastTs === today) {
			// console.log("heute bereits Werte eigegeben")
			diary.groups.map((e, i) => {
				e.items.forEach((el, index) => {
					if (el.values) {
						if ((timeLength === el.values.length) &&
							(el.values[el.values.length - 1] !== null) && (el.values[el.values.length - 1]))
							editedGroups.groups[i].items[index].done = true;
						else
							editedGroups.groups[i].items[index].done = false;
					}
				})
			})
		}
	}
	return editedGroups;
}


/****************************************************************************
 * check if the value of the diary was set today
 * @param {*} editedGroups 
 * @param {*} diary 
 * @param {*} index 
 * @returns the object 'editedGroups' which was edited insite the function
 *****************************************************************************/

export const checkGroupXtoday = (editedGroups, diary, index) => {

	const today = todayDateTs();

	if ((diary) && (diary.timestamp.length > 0)) {
		const lastTs = diary.timestamp[diary.timestamp.length - 1];
		const timeLength = diary.timestamp.length;
		if (lastTs < today) {
			console.log("noch gar keine Werte heute erfasst")
		}
		else if (lastTs === today) {
			console.log("heute bereits Werte eigegeben")
			diary.groups[index].map((el, i) => {
				if (el.values) {
					if ((timeLength === el.values.length) &&
						(el.values[el.values.length - 1] !== null) && (el.values[el.values.length - 1]))
						editedGroups.groups[index].items[i].done = true;
					else
						editedGroups.groups[index].items[i].done = false;
				}
			})
		}
	}
	return editedGroups;
}

/********************************************************************
 * 
 * @param {*} array 
 * @returns the average of the given array values
 *********************************************************/

export const calcAverage = (array) => {
	let sum = 0;
	let nu = 0;

	for (let i = 0; i < array.length; i++) {
		if (typeof (array[i]) === 'number')
			sum += array[i];
		else
			nu += 1;
	}

	// console.log("sum:", sum, "nu", nu)
	return sum / (array.length - nu);
}


/********************************************************************
 * 
 * @param {*} array 
 * @returns yMin and yMax value for the y-Axis of a chart
 *********************************************************/

export const getYminMax = (yValues, rm = 0) => {

	const yMinArray = yValues.map(y => {
		return Math.round(Math.min(...y.filter(value => typeof value === 'number'))) - rm;
	})
	const yMaxArray = yValues.map(y => {
		return Math.round(Math.max(...y.filter(value => typeof value === 'number'))) + rm;
	})
	const yMin = (Math.min(...yMinArray))
	const yMax = Math.max(...yMaxArray)

	return { yMin, yMax }
}

//*******************************************************************
