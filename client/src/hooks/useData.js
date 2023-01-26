import { useUserContext } from "../providers/userContext";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


//---------------------------------------------------------


const useData = () => {

    const { saveDiaryIdInBackend, diaryIdSaved } = useUserContext()
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

    //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

    // console.log(diary)

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
                console.log(response.data)
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

    const getDiaryFromBackend = async (id) => {

        console.log("Aufruf der Routine getDiaryFromBackend")

        let requestOptions = {
            method: 'GET',
        };

        await fetch('/api/getDiary?id=' + id, requestOptions)
            .then(response => response.json())
            .then(response => {
                // console.log("result", response.data)
                setDiary(response.data)     // HIER GUCKEN!!!!
            })
            .catch(error => console.log("error: ", error))
    }

    //................................................

    const saveDataToBackend = async (id, groupId, items, ts, update) => {

        // console.log(id)
        // console.log(groupId)
        console.log(ts)
        console.log(update)

        let raw = JSON.stringify(
            {
                id: id,
                groupId: groupId,
                items: items,
                ts: ts,
                update: update,
            }
        )

        // console.log("raw", raw)

        let requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };

        await fetch('/api/saveData', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result", result.message)
                console.log(result)
            })
            .catch(error => console.log('error', error))
    }

    //-------------------------------------------------------------


    return [diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved];

}

export default useData;

