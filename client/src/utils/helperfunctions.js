import { todayDate } from "./Date";
import { DateTime } from "luxon";
import { useUserContext } from "../providers/userContext";

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
	let resSort = arr.slice();
	return (resSort.sort(function (a, b) { return a - b })).reverse();
}

//----------------------------------------------------------


