import { useEffect } from "react";
import { useUserContext } from "../providers/userContext";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";


//---------------------------------------------------------

const useData = () => {

	const { saveDiaryIdInBackend, user } = useUserContext()
	const [tempData, setTempData] = useState(
		{
			id: uuidv4(),
			label: 'Temperatur',
			unit: '°C',
			values: [],
			date: [],
		}
	);

	const [diarySaved, setDiarySaved] = useState();
	const [diaryTemplate, setDiaryTemplate] = useState('');
	const [diary, setDiary] = useState('');
	const [closePanels, setClosePanels] = useState();

	const [demo, setDemo] = useState(false);

	useEffect(() => {
		if(user === "gast@gast.de")
		setDemo(true)
	},[user])


	const createNewDiary = (diaryId) => {
		if (diaryId) {
			newDiaryInBackend();
			saveDiaryIdInBackend(diaryTemplate.id);
		}
	}

	//................................................

	const newDiaryInBackend = async () => {

		let raw = JSON.stringify({
			id: diaryTemplate.id,
			diaryName: diaryTemplate.diaryName,
			city: diaryTemplate.city,
			date: diaryTemplate.date,
			timestamp: diaryTemplate.timestamp,
			groups: diaryTemplate.groups
		})

		let requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};
		await fetch('/api/newDiary', requestOptions)
			.then(response => response.json())
			.then(response => {
				console.log("diary wird im backend gespeichert")
				if (response.status = "ok") {
					setDiarySaved(true) // Funktioniert nicht. 
				}
				return;
			})
			.catch(error => console.log("error: ", error))
		return;
	}

	//................................................

	useEffect(() => {
		if (closePanels && diary) {
			setDiary({ ...diary }, diary.groups.map(e => {
				e.visible = false;
				return e;
			}))
		}

	}, [closePanels])

	const getDiaryFromBackend = async (id) => {
		// console.log("Aufruf der Routine getDiaryFromBackend")

		let requestOptions = {
			method: 'GET',
		};

		await fetch('/api/getDiary?id=' + id, requestOptions)
			.then(response => response.json())
			.then(response => {
				setDiary(response.data)     // HIER GUCKEN!!!!
				setClosePanels(true)
			})
			.catch(error => console.log("error: ", error))
	}

	//................................................

	const saveDataToBackend = async (id, groupId, items, date, ts, update) => {

		let raw = JSON.stringify(
			{
				id: id,
				groupId: groupId,
				items: items,
				date: date,
				timestamp: ts,
				update: update,
			}
		)

		let requestOptions = {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};

		await fetch('/api/saveData', requestOptions)
			.then(response => response.json())
			.then(result => {
				// console.log("result", result.message)
				// console.log(result)
			})
			.catch(error => console.log('error', error))
	}

	//-------------------------------------------------------------


	return [diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved, demo, setDemo];

}

export default useData;

