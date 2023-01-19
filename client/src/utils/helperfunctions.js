import { todayDate } from "../components/Date";



export const checkTs = ( diaryDate, setUpdate ) => {

    const ts = todayDate();

    console.log("---------------------------\n", ts)

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
