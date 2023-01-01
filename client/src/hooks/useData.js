
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

//---------------------------------------------------------


const useData = () => {

    const [diary, setDiary] = useState({
        id: uuidv4(),

    });

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
                    selected: false,
                },
                {
                    item: 'pressureHigh',
                    label: 'Systolischer Blutdruck',
                    selected: true,
                },
                {
                    item: 'pressureLow',
                    label: 'Diastolischer Blutdruck',
                    selected: false,
                },
                {
                    item: 'pulse',
                    label: 'Puls',
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
                    selected: false,
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
                    selected: false,
                },
                {
                    item: 'moodSwings',
                    label: 'Stimmungsschwankungen',
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
                    selected: false,
                },
                {
                    item: 'interruption',
                    label: 'Schlafunterbrechungen',
                    selected: false,
                },
                {
                    item: 'restful',
                    label: 'Erholung durch Schlaf',
                    selected: false,
                },
                {
                    item: 'medication',
                    label: 'Medikamenteneinnahme',
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
                    selected: false,
                },
                {
                    item: 'fatigue',
                    label: 'Müdigkeit / Erschöpfung',
                    selected: false,
                },
                {
                    item: 'circulationProblems',
                    label: 'Kreislaufprobleme',
                    selected: false,
                },
                {
                    item: 'insomnia',
                    label: 'Schlafstörungen',
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
                    selected: false,
                },
                {
                    item: 'nausea',
                    label: 'Übelkeit',
                    selected: false,
                },
                {
                    item: 'vomiting',
                    label: 'Erbrechen',
                    selected: false,
                },
                {
                    item: 'diarrhea',
                    label: 'Durchfall',
                    selected: false,
                },
                {
                    item: 'pyrosis',
                    label: 'Sodbrennen',
                    selected: false,
                },
                {
                    item: 'fatigue',
                    label: 'Erschöpfung / Müdigkeit',
                    selected: false,
                },
                {
                    item: 'insomnia',
                    label: 'Schlaflosigkeit',
                    selected: false,
                },
                {
                    item: 'vertigo',
                    label: 'Schwindelgefühl',
                    selected: false,
                },
                {
                    item: 'appetiteLoss',
                    label: 'Appetitlosigkeit',
                    selected: false,
                },
                {
                    item: 'fingerTingling',
                    label: 'Kribbeln in den Fingern / fingerspitzen',
                    selected: false,
                },
                {
                    item: 'memoryDisorder',
                    label: 'Gedächtnisstörungen',
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
            date: []
        }
    )

    const [tempResults, setTempResults] = useState("");

    const createNewDiary = () => {

    }


    const newDiaryInBackend = async () => {

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




    return [items, setItems, createNewDiary, saveTemp, tempData, setTempData, getTemp, tempResults];

}

export default useData;