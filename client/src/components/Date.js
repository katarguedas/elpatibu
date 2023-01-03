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

export const fullDate = () => {

    const now = DateTime.now();
    let today = now.toLocaleString(DateTime.DATE_HUGE)
    // console.log(today)
    return(today)

}

export default Date;

