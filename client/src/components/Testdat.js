
import { useDataContext } from "../providers/dataContext";
const { DateTime } = require("luxon");



export const Testdat = () => {

    const { tempData} = useDataContext()

    // const string = '2022-12-01 12:00:00'

    let temper = [];
    let day;
    let str;
    let datestringArray = [];
    for (let i = 1; i < 32; i++) {
        if (i < 10)
            day = '0' + i;
        else
            day = i;
        str = '2022-12-' + day + 'T12:00:00';
        datestringArray.push(str);

        temper.push(36.3 + Math.random() * 0.7);
    }

    // console.log(datestringArray)
    // console.log(temper)

    // let dateArray = [];
    // for (let j = 0; j < datestringArray.length; j++) {
    //     dateArray.push(new Date(datestringArray[j]))
    // }

    // console.log(dateArray)

    const dt = DateTime.local()
    // console.log(dt)
    // console.log("klappt's?", dt.toMillis())
    let later = DateTime.local(2022, 12, 10);
    // console.log(later)
    // console.log("klappt's?", later.toMillis())
    let later2 = DateTime.fromISO("2017-05-15T08:30:00")
    // console.log("klappt's?", later2.toMillis())
    // console.log(later2)


    let tsArray = [];
    for (let k = 0; k < datestringArray.length; k++) {
        const tmp = DateTime.fromISO(datestringArray[k])
        tsArray.push(tmp.toMillis())
    }

    // console.log(tsArray)


    // console.log("typeof", typeof(tempData))
    // console.log(tempData)

    return [temper, tsArray]
}