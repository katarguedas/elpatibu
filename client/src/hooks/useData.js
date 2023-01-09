
import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from "../providers/userContext";

//---------------------------------------------------------


const useData = () => {

    const { saveDiaryId, diaryIdSaved } = useUserContext()

    // const [items, setItems] = useState([
    //     {
    //         id: uuidv4(),
    //         group: 'vital',
    //         name: 'Vitalwerte',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'temperature',
    //                 label: 'Temperatur',
    //                 unit: '°C',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'pressureHigh',
    //                 label: 'Systolischer Blutdruck',
    //                 unit: 'mmHg',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'pressureLow',
    //                 label: 'Diastolischer Blutdruck',
    //                 unit: 'mmHg',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'pulse',
    //                 label: 'Puls',
    //                 unit: '1/Min',
    //                 selected: true,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'weight',
    //         name: 'Körpergewicht',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'weight',
    //                 label: 'Körpergewicht',
    //                 unit: 'kg',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'wellBeing',
    //         name: 'Allgemeines Wohlbefinden',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'wellBeing',
    //                 label: 'Wohlbefinden',
    //                 unit: '',
    //                 selected: true,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'mood',
    //         name: 'Stimmung',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'mood',
    //                 label: 'Stimmung',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'moodSwings',
    //                 label: 'Stimmungsschwankungen',
    //                 unit: '',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'sleep',
    //         name: 'Schlaf',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'hours',
    //                 label: 'Anzahl der Schlafstunden',
    //                 unit: 'Std.',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'interruption',
    //                 label: 'Schlafunterbrechungen',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'restful',
    //                 label: 'Erholung durch Schlaf',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'medication',
    //                 label: 'Medikamenteneinnahme',
    //                 unit: '',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'meteorosensitivity',
    //         name: 'Wetterfühligkeit',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'headache',
    //                 label: 'Kopfschmerzen',
    //                 unit: '',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'fatigue',
    //                 label: 'Müdigkeit / Erschöpfung',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'circulationProblems',
    //                 label: 'Kreislaufprobleme',
    //                 unit: '',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'insomnia',
    //                 label: 'Schlafstörungen',
    //                 unit: '',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'symptoms',
    //         name: 'Symptome',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'pain',
    //                 label: 'Schmerzen',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'nausea',
    //                 label: 'Übelkeit',
    //                 selected: false, unit: '',
    //             },
    //             {
    //                 item: 'vomiting',
    //                 label: 'Erbrechen',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'diarrhea',
    //                 label: 'Durchfall',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'pyrosis',
    //                 label: 'Sodbrennen',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'fatigue',
    //                 label: 'Erschöpfung / Müdigkeit',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'insomnia',
    //                 label: 'Schlaflosigkeit',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'vertigo',
    //                 label: 'Schwindelgefühl',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'appetiteLoss',
    //                 label: 'Appetitlosigkeit',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'fingerTingling',
    //                 label: 'Kribbeln in den Fingern / Fingerspitzen',
    //                 unit: '',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'memoryDisorder',
    //                 label: 'Gedächtnisstörungen',
    //                 unit: '',
    //                 selected: false,
    //             }
    //         ]
    //     }
    // ])

    const [tempData, setTempData] = useState(
        {
            id: uuidv4(),
            label: 'Temperatur',
            unit: '°C',
            values: [],
            date: [],
        }
    );



    const [test, setTest] = useState({
        id: uuidv4(),
        groups: [{
            id: uuidv4(),
            data: [2, 3]
        }]
    })

    const [diarySaved, setDiarySaved] = useState();

    const [diaryTemplate, setDiaryTemplate] = useState('');

    const [diary, setDiary] = useState('');

    const [diaryInit, setDiaryInit] = useState({
        // const diaryInit = {
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
        console.log("diaryTemplate ", diaryTemplate)

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
        return(true)
    }

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


    const getDiaryFromBackend = async (id) => {

        console.log("Aufruf der Routine getDiaryFromBackend")

        let requestOptions = {
            method: 'GET',
        };

        // const id = 'a55f7892-dbde-47b3-b97b-3f9f05db31c7';

        await fetch('/api/getDiary?id=' + id, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log("result", response.data)
                console.log("response", response)
                setDiary(response.data)     // HIER GUCKEN!!!!
            })
            .catch(error => console.log("error: ", error))
    }



    const saveDataToBackend = async () => {
        let raw = JSON.stringify({
            // id: tempData.id,
            // label: tempData.label,
            // unit: tempData.unit,
            // values: tempData.values,
            // date: tempData.date,
        })

        // let requestOptions = {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: raw,
        //     redirect: 'follow'
        // };

        // await fetch('/api/saveTemperature', requestOptions)
        //         .then(response => response.json())
        //         .then(result => {
        //             console.log("result", result.message)
        //         })
        //         .catch(error => console.log('error', error))
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




    return [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults];

}

export default useData;




// const [diary, setDiary] = useState(
//     {
//         id: uuidv4(),
//         diaryName: 'Test1',
//         date: [],
//         vital: {
//             temperature: {
//                 id: uuidv4(),
//                 label: 'Temperatur',
//                 unit: '°C',
//                 selected: false,
//                 values: []
//             },
//             pressureHigh: {
//                 id: uuidv4(),
//                 label: 'Systolischer Blutdruck',
//                 unit: 'mmHg',
//                 selected: false,
//                 values: []
//             },
//             pressureLow: {
//                 id: uuidv4(),
//                 label: 'Diastolischer Blutdruck',
//                 unit: 'mmHg',
//                 selected: false,
//                 values: []
//             },
//             pulse: {
//                 id: uuidv4(),
//                 label: 'Puls',
//                 unit: '1/Min',
//                 selected: false,
//                 values: []
//             }
//         },
//         weight: {
//             id: uuidv4(),
//             label: 'Gewicht',
//             unit: 'kg',
//             selected: false,
//             values: []
//         },
//         wellBeing: {
//             id: uuidv4(),
//             label: 'Gewicht',
//             unit: 'kg',
//             selected: false,
//             values: []
//         },
//         mood: {
//             mood: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             moodSwing: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             }
//         },
//         sleep: {
//             hours: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             interruption: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             restful: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//         },
//         meteorosensitivity: {
//             headache: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             fartigue: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             circulationProblems: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             insomnia: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//         },
//         symptoms: {
//             pain: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             nausea: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             vomiting: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             diarrhea: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             pyrosis: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             fatigue: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             insomnia: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             vertigo: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             appetiteLoss: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             fingerTingling: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             },
//             memoryDisorder: {
//                 id: uuidv4(),
//                 label: 'Gewicht',
//                 unit: 'kg',
//                 selected: false,
//                 values: []
//             }
//         },
//     });
