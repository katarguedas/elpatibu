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
    // const [diaryInit, setDiaryInit] = useState({
    //     id: uuidv4(),
    //     diaryName: 'Tagebuch1',
    //     city: 'Welt',
    //     date: [],
    //     groups: [
    //         {
    //             id: uuidv4(),
    //             name: 'vital',
    //             label: 'Vitalwerte',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'temperature',
    //                     id: uuidv4(),
    //                     label: 'Temperatur',
    //                     unit: '°C',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'pressureHigh',
    //                     id: uuidv4(),
    //                     label: 'Systolischer Blutdruck',
    //                     unit: 'mmHg',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'pressureLow',
    //                     id: uuidv4(),
    //                     label: 'Diastolischer Blutdruck',
    //                     unit: 'mmHg',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'pulse',
    //                     id: uuidv4(),
    //                     label: 'Pulse',
    //                     unit: '1/Min',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'weight',
    //             label: 'Körpergewicht',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'weight',
    //                     id: uuidv4(),
    //                     label: 'Körpergewicht',
    //                     unit: 'kg',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 },
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'wellBeing',
    //             label: 'Allgemeines Wohlbefinden',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'weight',
    //                     id: uuidv4(),
    //                     label: 'Allgemeines Wohlbefinden',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'mood',
    //             label: 'Stimmung',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'mood',
    //                     id: uuidv4(),
    //                     label: 'Stimmung',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'moodSwings',
    //                     id: uuidv4(),
    //                     label: 'Stimmungsschwankungen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'sleep',
    //             label: 'Schlaf',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'hours',
    //                     id: uuidv4(),
    //                     label: 'Stunden Schlaf por Nacht',
    //                     unit: 'Std.',
    //                     selected: false,
    //                     measurable: true,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'interruption',
    //                     id: uuidv4(),
    //                     label: 'Schlafunterbrechungen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'restful',
    //                     id: uuidv4(),
    //                     label: 'Erholung durch Schlaf',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'meteorosensitivity',
    //             label: 'Wetterfühligkeit',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'headache',
    //                     id: uuidv4(),
    //                     label: 'Kopfschmerzen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'fatigue',
    //                     id: uuidv4(),
    //                     label: 'Müdigkeit / Erschöpfung',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'circulationProblems',
    //                     id: uuidv4(),
    //                     label: 'Kreislaufprobleme',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'insomnia',
    //                     id: uuidv4(),
    //                     label: 'Schlafstörungen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 }
    //             ]
    //         },
    //         {
    //             id: uuidv4(),
    //             name: 'symptoms',
    //             label: 'Symptome',
    //             visible: false,
    //             items: [
    //                 {
    //                     name: 'pain',
    //                     id: uuidv4(),
    //                     label: 'Schmerzen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'nausea',
    //                     id: uuidv4(),
    //                     label: 'Übelkeit',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'vomiting',
    //                     id: uuidv4(),
    //                     label: 'Erbrechen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'diarrhea',
    //                     id: uuidv4(),
    //                     label: 'Durchfall',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'pyrosis',
    //                     id: uuidv4(),
    //                     label: 'Sodbrennen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'fatigue',
    //                     id: uuidv4(),
    //                     label: 'Müdigkeit / Abgeschlagenheit',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'insomnia',
    //                     id: uuidv4(),
    //                     label: 'Schlafstörungen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'vertigo',
    //                     id: uuidv4(),
    //                     label: 'Schwindelgefühl',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'appetiteLoss,',
    //                     id: uuidv4(),
    //                     label: 'Appetitlosigkeit',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'fingerTingling',
    //                     id: uuidv4(),
    //                     label: 'Kribbeln in den Fingern',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 },
    //                 {
    //                     name: 'memoryDisorder',
    //                     id: uuidv4(),
    //                     label: 'Gedaechtnisstörungen',
    //                     unit: '-',
    //                     selected: false,
    //                     measurable: false,
    //                     values: []
    //                 }
    //             ]
    //         }
    //     ]
    // }
    // )



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
    // return [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved];

}

export default useData;

