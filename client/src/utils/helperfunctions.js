import { todayDate } from "./Date";

//--------------------------------------------------------

export const checkTs = (diaryDate, setUpdate) => {

	const ts = todayDate();

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

//----------------------------------------------------------

export const sortminmax = arr => {
	console.log("events zum Sortieren", arr)
	let resSort = arr.slice();
	return (resSort.sort(function (a, b) { return a - b })).reverse();
}

//--------------------------------------------------------

export const sortTs = (tsArr, events) => {
	let maxnum = null;
	console.log(maxnum);

	for (let i of tsArr) {
		if (maxnum < i) {
			maxnum = i;
			console.log(maxnum);
		}
	}
}

//----------------------------------------------------------


export const checkAllValuesToday = (diary) => {

	const today = todayDate();
	console.dir(today);

	let savedAll = true;

	const saveState = (saved) => {
		if (saved === false)
			savedAll = false;
	}

	if (diary) {
		const lastTs = diary.date[diary.date.length - 1];
		console.log("lastTs", lastTs)
		if (lastTs < today) {
			console.log("noch gar keine Werte heute erfasst")
		}
		else if (lastTs === today) {
			diary.groups.map((e, i) => {
				e.items.forEach((el, index) => {
					// editedGroups.groups[i].items[index].selected  = el.selected;
				})
				saveState(e.items.every(el => el.selected.true));
			})
		}
	}
	console.log("savedAll", savedAll)
	return savedAll;
}

//-----------------------------------------------------------------

export const checkGroupToday = (editedGroups, diary) => {

	const today = todayDate();
	console.dir(today);

	console.dir(editedGroups)
	if ((diary) && (diary.date.length > 0)) {
		const lastTs = diary.date[diary.date.length - 1];
		const timeLength = diary.date.length;
		console.log("lastTs", lastTs)
		if (lastTs < today) {
			console.log("noch gar keine Werte heute erfasst")
		}
		else if (lastTs === today) {
			console.log("heute bereits Werte eigegeben")
			diary.groups.map((e, i) => {
				e.items.forEach((el, index) => {
					console.log(el.values)
					if (el.values) {
						console.log("test", timeLength, el.values.length, el.values[el.values.length - 1] );
						if ((timeLength === el.values.length) &&
							(el.values[el.values.length - 1] !== null) && (el.values[el.values.length - 1]))
							editedGroups.groups[i].items[index].done = true;
						else
							editedGroups.groups[i].items[index].done = false;
					}
				})
			})
		}
		console.log("editedGroups", editedGroups);
	}

	return editedGroups;
}

//-----------------------------------------------------------------