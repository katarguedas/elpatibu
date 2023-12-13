import { useEffect, useState, useCallback } from 'react';
import { DateTime } from "luxon";
import { fullDate } from '../utils/Date';
import { useUserContext } from '../providers/userContext';


/**
 * 
 * @returns states and functions that are related to the events(calendar)
 */
const useEvents = () => {

  const { user, userData, checkToken, LOCAL_STORAGE_EVENTS } = useUserContext();

  const [nextEvents, setNextEvents] = useState();
  const [events, setEvents] = useState();
  const [timeCatArrays, setTimeCatArrays] = useState({
    arzttermin: [],
    therapie: [],
    untersuchung: [],
    sonstiges: []
  });


  useEffect(() => {
    if ((user) && (!userData))
      checkToken();
  }, [])


  //.....................................

  const searchTimeArrays = useCallback((events) => {
    // console.log("Hole Events nach Kategorien für die Diagramme", events)
    if (events) {
      console.log("Es gibt events")
      events.map((e) => {
        if (e.category === 'Therapie') {
          setTimeCatArrays({ ...timeCatArrays },
            timeCatArrays.therapie.push(DateTime.fromISO(e.end).ts))
          return (e)
        } else if (e.category === 'Arzttermin') {
          setTimeCatArrays({ ...timeCatArrays },
            timeCatArrays.arzttermin.push(DateTime.fromISO(e.end).ts))
          return (e)
        }
        return null
      })
    }
  }, [])
  //.............................................

  const getEventsFromBackend = useCallback(async (id) => {

    clearTimeCatArrays();
    let requestOptions = {
      method: 'GET',
    };

    await fetch('/api/getEvents?id=' + id, requestOptions)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(response.events))
        searchTimeArrays(response.events)
        setEvents(response.events)
        setNextEvents(getNextEvents(response.events));
      })
      .catch(error => console.log("error: ", error))
  }, [])

  //............................................

  /**
   * Checks of events data are available in local storage. 
 * If no, it fetches the events from Backend.
   */

  useEffect(() => {
    if (userData) {
      let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
      if (!eventsArray || eventsArray.length === 0) {
        getEventsFromBackend(userData.id);
      } else {
        searchTimeArrays(eventsArray)
        setEvents(eventsArray)
        setNextEvents(getNextEvents(eventsArray));
      }
    }
  }, [userData, LOCAL_STORAGE_EVENTS, getEventsFromBackend, searchTimeArrays])

  //......................................

  const getNextEvents = (allEvents) => {
    let array = [];

    if (allEvents) {
      const today = DateTime.local(fullDate());
      array = allEvents.filter(e => {
        if (DateTime.fromISO(e.start).ts > today.ts) {
          return e
        }
      })
    }
    for (let i = 0; i < array.length; i++) {
      array[i].time = DateTime.fromISO(array[i].start).ts
    }
    const sortedArray = array.sort((a, b) => {
      return a.time - b.time;
    });
    if (sortedArray.length > 0) {
      console.log("sortierte Events: ", sortedArray)
    }
    return sortedArray;
  }

  // ...................................................

  const saveEventInBackend = async (event) => {

    const raw = JSON.stringify({
      id: userData.id,
      event: event
    })

    let requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: 'follow'
    };

    await fetch('/api/saveEvent', requestOptions)
      .then(response => response.json()
        .then(response => console.log(response)))

      .catch(error => console.log("error:", error))
  }

  //---------------------------------------

  const deleteEvent = (userId, eventId) => {
    const eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS));
    localStorage.removeItem(LOCAL_STORAGE_EVENTS);
    const newArray = eventsArray.filter(e => (e.id !== eventId));
    localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(newArray));

    deleteEventInBackend(userId, eventId);
    return (true)
  }

  //........................................
  const deleteEventInBackend = async (userId, eventId) => {

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
      .then(response => response.json())
      .then(response => console.log(response))

      .catch(error => console.log("error:", error))
  }



  //-------------------

  const clearTimeCatArrays = () => {
    setTimeCatArrays({ ...timeCatArrays }, timeCatArrays.arzttermin = [], timeCatArrays.therapie = [], timeCatArrays.untersuchung = [], timeCatArrays.sonstiges = [])
  }


  //-------------------
  return {
    events,
    nextEvents,
    timeCatArrays,
    searchTimeArrays,
    saveEventInBackend,
    deleteEvent
  }
}


export default useEvents;