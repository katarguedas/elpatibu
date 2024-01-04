import { eventsActions } from './eventsSlice';

import { DateTime } from "luxon";
import { fullDate } from '../utils/Date';



/**
 * fetch Events from Backend
 * @param {*} id 
 * @returns 
 */

export const fetchEvents = id => {

  return async (dispatch) => {
    dispatch(eventsActions.clearCategorySortedEvents());

    let requestOptions = {
      method: 'GET',
    };
    if (id) {
      await fetch('/api/getEvents?id=' + id, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Could not fetch events');
          }
          return response.json();
        })
        .then(data => {
          dispatch(eventsActions.saveEvents({ events: data.events }));
          dispatch(eventsActions.saveCategorySortedEvents(
            { events: getSortedEvents(data.events) }));
          dispatch(eventsActions.saveNextEvents(
            { events: getNextEvents(data.events) }));
        })
        .catch(error => console.log("Error fetching the events: ", error))
    }
  }
};

/**
 * saves a new event in backend
 * @param {*} event 
 * @param {*} userId 
 * @returns 
 */
export const saveEventInBackend = (event, userId) => {

  return async (dispatch) => {

    const raw = JSON.stringify({
      id: userId,
      event: event
    })

    let requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: 'follow'
    };

    await fetch('/api/saveEvent', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not save the event in backend');
        }
        // if (response.status === 200) {
        //   console.log(response.status)
        // }
        return response.ok;
      })
      .catch(error => console.log("Error: Could not send the event to the backend", error))
  }
}



export const deleteEventInBackend = (userId, eventId) => {

  return async (dispatch) => {
    let raw = JSON.stringify(
      {
        userId: userId,
        eventId: eventId
      }
    )
    let requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: 'follow'
    };

    await fetch('/api/deleteEvent', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not save the event in backend');
        }
        return response.ok;
      })
      .catch(error => console.log("error:", error))
  }

}



/**
 * creates an array with all events in the future
 * @param {*} allEvents 
 * @returns 
 */

export const getNextEvents = (allEvents) => {
  let array = [];

  if (allEvents) {
    const today = DateTime.local(fullDate());
    array = allEvents.filter(e => (DateTime.fromISO(e.start).ts > today.ts))
  }

  const sortedArray = array.sort((a, b) => {
    return DateTime.fromISO(a.start).ts - DateTime.fromISO(b.start).ts;
  });

  return sortedArray;
}


/**
 * sorts the events due to their categories
 * @param {*} events 
 * @returns 
 */

const getSortedEvents = events => {

  let sortedEvents = {
    arzttermin: [],
    therapie: [],
    untersuchung: [],
    sonstiges: []
  };
  if (events) {
    console.log("Es gibt events");

    events.forEach((event) => {
      switch (event.category) {
        case 'Therapie':
          sortedEvents.therapie.push(DateTime.fromISO(event.end).ts);
          break;
        case 'Arzttermin':
          sortedEvents.arzttermin.push(DateTime.fromISO(event.end).ts);
          break;
        default:
          sortedEvents.sonstiges.push(DateTime.fromISO(event.end).ts);
      };
    });
  }
  return sortedEvents;
}