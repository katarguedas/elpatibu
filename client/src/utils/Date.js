import React from "react";
import { DateTime } from "luxon";

/*************************************************************************
 * 
 * @returns Provides some help functions around the 'date'
 * 
 *************************************************************************/

const Date = () => {

  const now = DateTime.now();
  const currentDate = now.toLocaleString(DateTime.DATE_FULL)

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
  return today
}

/*************************************************************************
 * Creates a string which describe the date of today at 12:00 and 
 * converts the string into a timestamp.
 * 
 * @returns timeestamp 'ts' of today at 12:00
 */
export const todayDateTs = () => {
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

  const ts = datum.toMillis()
  return ts;
}

/*************************************************************************
 * Creates a string which describe the date of today at 12:00 and 
 * converts the string into a date format.
 * @returns date of today at 12:00
 */
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

  return datum;
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

  return dateStr;
}

//---------------------------------------------------------------------

export const getStrFromTs = (date) => {

  let datetmp = DateTime.fromSeconds(date / 1000);
  let dateStr = datetmp.setLocale('de').toLocaleString(DateTime.DATE_MED)

  return dateStr;
}

//-------------------------------------------------------------------
export const getdmStrFromTs = (date) => {

  let datetmp = DateTime.fromSeconds(date / 1000);
  let tmp = datetmp.setLocale('de').toLocaleString(DateTime.DATE_MED);
  let dateStr = tmp.slice(0, (tmp.length - 5))

  return dateStr;

}
//---------------------------------------


export default Date;

