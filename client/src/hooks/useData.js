import { useEffect } from "react";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { saveDiaryIdInBackend } from '../store/authActions';

//---------------------------------------------------------

const useData = () => {

	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);

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
		if(userData.id === "gast@gast.de")
		setDemo(true)
	},[userData.id])


	const createNewDiary = (diaryId, setCreated) => {
		if (diaryId) {
			newDiaryInBackend(setCreated);
			dispatch(saveDiaryIdInBackend(diaryTemplate.id));
		}
	}

	//................................................

	const newDiaryInBackend = async (setCreated) => {

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
				// console.log("diary wird im backend gespeichert", response)
				if (response.status = "ok") {
					setCreated(true);
					setDiarySaved(true)  
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

