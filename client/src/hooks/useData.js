
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import { useUserContext } from "../providers/userContext";

//---------------------------------------------------------


const useData = () => {

    const { saveDiaryId, diaryIdSaved } = useUserContext()

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

    const [diaryInit, setDiaryInit] = useState({
        id: uuidv4(),
        diaryName: 'test',
        date: [],
        groups: [
            {
                id: uuidv4(),
                name: 'vital',
                label: 'Vitalwerte',
                visible: false,
                items: [
                    {
                        name: 'temperature',
                        id: uuidv4(),
                        label: 'Temperatur',
                        unit: '°C',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'pressureHigh',
                        id: uuidv4(),
                        label: 'Systolischer Blutdruck',
                        unit: 'mmHg',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'pressureLow',
                        id: uuidv4(),
                        label: 'Diastolischer Blutdruck',
                        unit: 'mmHg',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'pulse',
                        id: uuidv4(),
                        label: 'Pulse',
                        unit: '1/Min',
                        selected: false,
                        values: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'weight',
                label: 'Körpergewicht',
                visible: false,
                items: [
                    {
                        name: 'weight',
                        id: uuidv4(),
                        label: 'Körpergewicht',
                        unit: 'kg',
                        selected: false,
                        values: []
                    },
                ]
            },
            {
                id: uuidv4(),
                name: 'wellBeing',
                label: 'Allgemeines Wohlbefinden',
                visible: false,
                items: [
                    {
                        name: 'weight',
                        id: uuidv4(),
                        label: 'Allgemeines Wohlbefinden',
                        unit: '-',
                        selected: false,
                        values: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'mood',
                label: 'Stimmung',
                visible: false,
                items: [
                    {
                        name: 'moodSwings',
                        id: uuidv4(),
                        label: 'Stimmung',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'weight',
                        id: uuidv4(),
                        label: 'Stimmungsschwankungen',
                        unit: '-',
                        selected: false,
                        values: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'sleep',
                label: 'Schlaf',
                visible: false,
                items: [
                    {
                        name: 'hours',
                        id: uuidv4(),
                        label: 'Stunden Schlaf por Nacht',
                        unit: 'Std.',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'interruption',
                        id: uuidv4(),
                        label: 'Schlafunterbrechungen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'restful',
                        id: uuidv4(),
                        label: 'Erholung durch Schlaf',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'medication',
                        id: uuidv4(),
                        label: 'Medikamenteneinnahme',
                        unit: '-',
                        selected: false,
                        values: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'meteorosensitivity',
                label: 'Wetterfühligkeit',
                visible: false,
                items: [
                    {
                        name: 'headache',
                        id: uuidv4(),
                        label: 'Kopfschmerzen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'fatigue',
                        id: uuidv4(),
                        label: 'Müdigkeit / Erschöpfung',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'circulationProblems',
                        id: uuidv4(),
                        label: 'Kreislaufprobleme',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'insomnia',
                        id: uuidv4(),
                        label: 'Schlafstörungen',
                        unit: '-',
                        selected: false,
                        values: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'symptoms',
                label: 'Symptome',
                visible: false,
                items: [
                    {
                        name: 'pain',
                        id: uuidv4(),
                        label: 'Schmerzen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'nausea',
                        id: uuidv4(),
                        label: 'Übelkeit',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'vomiting',
                        id: uuidv4(),
                        label: 'Erbrechen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'diarrhea',
                        id: uuidv4(),
                        label: 'Durchfall',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'pyrosis',
                        id: uuidv4(),
                        label: 'Sodbrennen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'fatigue',
                        id: uuidv4(),
                        label: 'Müdigkeit / Abgeschlagenheit',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'insomnia',
                        id: uuidv4(),
                        label: 'Schlafstörungen',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'vertigo',
                        id: uuidv4(),
                        label: 'Schwindelgefühl',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'appetiteLoss,',
                        id: uuidv4(),
                        label: 'Appetitlosigkeit',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'fingerTingling',
                        id: uuidv4(),
                        label: 'Kribbeln in den Fingern',
                        unit: '-',
                        selected: false,
                        values: []
                    },
                    {
                        name: 'memoryDisorder',
                        id: uuidv4(),
                        label: 'Gedaechtnisstörungen',
                        unit: '-',
                        selected: false,
                        values: []
                    }
                ]
            }
        ]
    }
    )

    // console.log("DiaryTemplate:", diaryTemplate)

    const [tempResults, setTempResults] = useState("");

    //---------------------------------------------------------

    const createNewDiary = (diaryId) => {
        console.log("ID:", diaryId)
        // console.log("diaryTemplate ", diaryTemplate)

        // 
        if (diaryId) {
            newDiaryInBackend();
            saveDiaryId(diaryTemplate.id);

            console.log("diaryIdSaved:", diaryIdSaved)
            console.log("diarySaved:", diarySaved)
            const tempDiary = diaryTemplate;
            setDiary(tempDiary);
            // if (diarySaved && diaryIdSaved) {

            //     setDiaryTemplate('');
            //     return (true)
            // }
            // else {
            //     setDiaryTemplate();
            //     return (false)
            // }
        }
        // console.log("diaryIdSaved:", diaryIdSaved)
        // console.log("diarySaved:", diarySaved)

        setDiaryTemplate('');
        return (true)
    }

    //................................................

    const newDiaryInBackend = async () => {
        console.log("diary in fkt als template:", diaryTemplate)
        let raw = JSON.stringify({
            id: diaryTemplate.id,
            diaryName: diaryTemplate.diaryName,
            date: diaryTemplate.date,
            groups: diaryTemplate.groups
        })

        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };
        fetch('/api/newDiary', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                console.log("diary wird im backend gespeichert")
                if (response.status = "ok") {
                    console.log("yes")
                    setDiarySaved(true) // Funktioniert nicht. WARUM????
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
                console.log("result", response.data)
                console.log("response", response)
                setDiary(response.data)     // HIER GUCKEN!!!!
            })
            .catch(error => console.log("error: ", error))
    }



    //................................................

    const saveDataToBackend = async (id, groupId, items, ts, update) => {

        // console.log(id)
        // console.log(groupId)
        // console.log(items)
        console.log(update)

        // saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, update);

        let raw = JSON.stringify(
            {
                id: id,
                groupId: groupId,
                items: items,
                ts: ts,
                update: update,
            }
        )

        console.log("raw", raw)

        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };

        await fetch('/api/saveData', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result", result.message)
                console.log(result.data)
            })
            .catch(error => console.log('error', error))
    }

    //-------------------------------------------------------------

    const saveTemp = async () => {

        if (tempData) {
            console.log("tempData", tempData)

            let raw = JSON.stringify({
                id: tempData.id,
                label: tempData.label,
                unit: tempData.unit,
                values: tempData.values,
                date: tempData.date,
            })

            console.log("                 raw:", raw)

            let requestOptions = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: raw,
                redirect: 'follow'
            };

            await fetch('/api/saveTemperature', requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log("result", result.message)
                })
                .catch(error => console.log('error', error))
        }
    }

    const getTemp = async (id) => {

        let requestOptions = {
            method: 'GET',
        };

        await fetch('/api/getTemp?id=' + id, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log("result", response.data)
                console.log("result2", response)
                setTempResults(response.data)     // HIER GUCKEN!!!!
            })
            .catch(error => console.log("error: ", error))
    }




    return [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults];

}

export default useData;

