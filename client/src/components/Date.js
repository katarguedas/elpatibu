import { DateTime } from "luxon";

//---------------------------------------------------------


const Date = () => {

    const now = DateTime.now();
    const currentDate = now.toLocaleString(DateTime.DATE_FULL)

    // console.log(now)

    return (
        <div>
            {currentDate}

        </div>
    )
}

//----------------------------------------------------------------

export const fullDate = () => {

    const now = DateTime.now();
    let today = now.toLocaleString(DateTime.DATE_HUGE)
    // console.log(today)
    return (today)
}


//----------------------------------------------------------------

export const todayDate = () => {
    const dt = DateTime.local()
    const year = dt.c.year
    let month = dt.c.month
    let day = dt.c.day

    if (day < 10)
        day = '0' + day;
    if (month < 10)
        month = '0' + month;

    const datumStr = year + '-' + month + '-' + day + 'T12:00:00';
    const datum = DateTime.fromISO(datumStr)
    // console.log("datum kriiert:", datum, "\n aus dem String: ", datumStr)

    const ts = datum.toMillis()
    // console.log("ts:", ts)
    return ts;
}


//---------------------------------------------------------------------

export const getDateStrFromTs = (date) => {

    let datetmp = DateTime.fromSeconds(date / 1000);
    let day = datetmp.day;
    if (day < 10)
        day = '0' + day;
    let month = datetmp.month;
    let year = datetmp.year;
    const dateStr = year + '-' + month + '-' + day;

    console.log(dateStr);
    return dateStr;
}


export default Date;

