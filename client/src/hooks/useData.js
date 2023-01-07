
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

//---------------------------------------------------------


const useData = () => {



    const [items, setItems] = useState([
        {
            id: uuidv4(),
            group: 'vital',
            name: 'Vitalwerte',
            visible: false,
            itemList: [
                {
                    item: 'temperature',
                    label: 'Temperatur',
                    unit: '°C',
                    selected: true,
                },
                {
                    item: 'pressureHigh',
                    label: 'Systolischer Blutdruck',
                    unit: 'mmHg',
                    selected: true,
                },
                {
                    item: 'pressureLow',
                    label: 'Diastolischer Blutdruck',
                    unit: 'mmHg',
                    selected: true,
                },
                {
                    item: 'pulse',
                    label: 'Puls',
                    unit: '1/Min',
                    selected: true,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'weight',
            name: 'Körpergewicht',
            visible: false,
            itemList: [
                {
                    item: 'weight',
                    label: 'Körpergewicht',
                    unit: 'kg',
                    selected: false,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'wellBeing',
            name: 'Allgemeines Wohlbefinden',
            visible: false,
            itemList: [
                {
                    item: 'wellBeing',
                    label: 'Wohlbefinden',
                    unit: '',
                    selected: true,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'mood',
            name: 'Stimmung',
            visible: false,
            itemList: [
                {
                    item: 'mood',
                    label: 'Stimmung',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'moodSwings',
                    label: 'Stimmungsschwankungen',
                    unit: '',
                    selected: false,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'sleep',
            name: 'Schlaf',
            visible: false,
            itemList: [
                {
                    item: 'hours',
                    label: 'Anzahl der Schlafstunden',
                    unit: 'Std.',
                    selected: false,
                },
                {
                    item: 'interruption',
                    label: 'Schlafunterbrechungen',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'restful',
                    label: 'Erholung durch Schlaf',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'medication',
                    label: 'Medikamenteneinnahme',
                    unit: '',
                    selected: false,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'meteorosensitivity',
            name: 'Wetterfühligkeit',
            visible: false,
            itemList: [
                {
                    item: 'headache',
                    label: 'Kopfschmerzen',
                    unit: '',
                    selected: true,
                },
                {
                    item: 'fatigue',
                    label: 'Müdigkeit / Erschöpfung',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'circulationProblems',
                    label: 'Kreislaufprobleme',
                    unit: '',
                    selected: true,
                },
                {
                    item: 'insomnia',
                    label: 'Schlafstörungen',
                    unit: '',
                    selected: false,
                }
            ]
        },
        {
            id: uuidv4(),
            group: 'symptoms',
            name: 'Symptome',
            visible: false,
            itemList: [
                {
                    item: 'pain',
                    label: 'Schmerzen',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'nausea',
                    label: 'Übelkeit',
                    selected: false, unit: '',
                },
                {
                    item: 'vomiting',
                    label: 'Erbrechen',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'diarrhea',
                    label: 'Durchfall',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'pyrosis',
                    label: 'Sodbrennen',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'fatigue',
                    label: 'Erschöpfung / Müdigkeit',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'insomnia',
                    label: 'Schlaflosigkeit',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'vertigo',
                    label: 'Schwindelgefühl',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'appetiteLoss',
                    label: 'Appetitlosigkeit',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'fingerTingling',
                    label: 'Kribbeln in den Fingern / Fingerspitzen',
                    unit: '',
                    selected: false,
                },
                {
                    item: 'memoryDisorder',
                    label: 'Gedächtnisstörungen',
                    unit: '',
                    selected: false,
                }
            ]
        }
    ])

    const [tempData, setTempData] = useState(
        {
            id: uuidv4(),
            label: 'Temperatur',
            unit: '°C',
            values: [],
            date: [],
        }
    )

    const [diary, setDiary] = useState({
        id: uuidv4(),
        diaryName: 'Test1',
        date: [],
        vital: {
            temperature: {
                id: uuidv4(),
                label: 'Temperatur',
                unit: '°C',
                selected: false,
                values: []
            },
            pressureHigh: {
                id: uuidv4(),
                label: 'Systolischer Blutdruck',
                unit: 'mmHg',
                selected: false,
                values: []
            },
            pressureLow: {
                id: uuidv4(),
                label: 'Diastolischer Blutdruck',
                unit: 'mmHg',
                selected: false,
                values: []
            },
            pulse: {
                id: uuidv4(),
                label: 'Puls',
                unit: '1/Min',
                selected: false,
                values: []
            }
        },
        weight: {
            id: uuidv4(),
                label: 'Gewicht',
                unit: 'kg',
                selected: false,
                values: []
        },
        wellBeing: {},
        mood: {
            mood: {},
            moodSwing: {}
        },
        sleep: {
            hours: {},
            interruption: {},
            restful: {},
        },
        meteorosensitivity: {
            headache: {},
            fartigue: {},
            circulationProblems: {},
            insomnia: {},
        },
        symptoms: {
            pain: {},
            nausea: {},
            vomiting: {},
            diarrhea: {},
            pyrosis: {},
            fatigue: {},
            insomnia: {},
            vertigo: {},
            appetiteLoss: {},
            fingerTingling: {},
            memoryDisorder: {}
        },
    });

    const [tempResults, setTempResults] = useState("");



    const createNewDiary = () => {

        console.log("items ", items)
        console.log("diary ", diary)
        newDiaryInBackend(diary);
    }



    const newDiaryInBackend = async () => {

        let raw = JSON.stringify({
            id: diary.id,
            diaryName: diary.diaryName,
            date: diary.date,
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
                console.log(response)

            })
            .catch(error => console.log("error: ", error))
    }

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




    return [items, setItems, createNewDiary, saveTemp, tempData, setTempData, getTemp, tempResults, diary, setDiary];

}

export default useData;