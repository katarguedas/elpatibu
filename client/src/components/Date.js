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


export default Date;