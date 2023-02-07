import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import CalendarInputCard from '../components/forms/CalendarInputCard';
import EventCard from '../components/EventCard';
import { NewEventButton } from '../styled/Buttons';
import { ContentGroup, MainGroup, MainContent, PageTitle } from '../styled/globalStyles';
import { theme } from '../themes/theme';
import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { useUserContext } from '../providers/userContext';

require('globalize/lib/cultures/globalize.culture.de');


//---------------------------------------------------------

const MyCalendar = () => {

  const { saveEventInBackend, getEventsFromBackend, userData, LOCAL_STORAGE_EVENTS } = useUserContext();

  const [events, setEvents] = useState();
  const [value, setValue] = useState();
  const [open, setOpen] = useState();
  const [view, setView] = useState();
  const [allday, setAllday] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cat, setCat] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [loaded, setLoaded] = useState();

  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })

  //.................................


  useEffect(() => {
    let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    console.log(eventsArray)
    if (!eventsArray) {
      getEventsFromBackend(userData.id);
      eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    }
    setEvents(eventsArray);
    setLoaded(true);
  }, [])

  useEffect(() => {
    console.log('loaded:', loaded)
    console.log('events:', events)
  }, [loaded])


  const dateAllday = (str, flag) => {
    if (flag === 1) //startDatum
      // return (new Date(yyyy, mm, dd, 1, 0, 0)):
      return (
        new Date(
          str.slice(0, 4),
          str.slice(5, 7) - 1,
          str.slice(8, 10),
          1, 0, 0))
    else if (flag === 2)   //EndDatum
      // return (new Date(yyyy, mm, dd, 23, 59, 0)):
      return (
        new Date(
          str.slice(0, 4),
          str.slice(5, 7) - 1,
          str.slice(8, 10),
          23, 59, 0))
  }


  const dateNoAllday = str => {
    // return (new Date(yyyy, mm, dd, hh, min, 0)):
    return (
      new Date(
        str.slice(0, 4),
        str.slice(5, 7) - 1,
        str.slice(8, 10),
        str.slice(11, 13),
        str.slice(14, 17), 0
      ))
  }

  const dateNoAllday2 = str => {
    // console.log(yyyy, mm, dd, hh, min, 0):
    return (
      new Date(
        str.slice(0, 4),
        str.slice(5, 7) - 1,
        str.slice(8, 10),
        str.slice(11, 13),
        str.slice(14, 16), 0
      ))
  }


  useEffect(() => {
    if ((loaded) && (events)) {
      setEvents([...events], events.map((e, i) => {
        if (typeof (e.start) === 'string') {
          e.start = dateNoAllday2(e.start)
          e.end = dateNoAllday2(e.end)
          console.log(e.start)
          return e;
        }
      }))
    }
  }, [loaded])


  const handleSelectSlot = () => {
    setView(false)
    setOpen(false)
  }


  const handleNewEvent = useCallback(
    ({ start, end }) => {
      setStartDate(start)
      setStartDate(end)
      setView(false)
      setOpen(true)
    },
    // [setEvents]
  )


  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = theme.colors.col1;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '3px',
      opacity: 0.8,
      color: 'black',
      border: '1px',
      display: 'block',
    };
    return {
      style: style
    };
  }


  const openAnotherEvent = (event) => {
    setCurrentEvent(event)
    setView(true)
  }


  const handleSelectEvent = useCallback(
    //  (event) => window.alert(event.title),
    (event) => {
      if (!view) {
        setView(true)
        setCurrentEvent(event)
      }
      if (view) {
        setView(false)
        openAnotherEvent(event)
      }
    },
    []
  )


  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleCheckbox = e => {
    setAllday(!allday)
  }


  const handleStartDate = e => {
    console.log('Startdatum', e.target.value)

    if (allday === true)
      setStartDate(dateAllday(e.target.value, 1))
    else
      setStartDate(dateNoAllday(e.target.value))
  }


  const handleEndDate = e => {
    console.log('Enddatum', e.target.value)

    if (allday === true)
      setEndDate(dateAllday(e.target.value, 2))
    else {
      setEndDate(dateNoAllday(e.target.value))
    }
  }

  const handleSelection = e => {
    console.log('selection:', e.target.value)
    console.log(e.target.name)
    setCat(e.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    setOpen(false)
    e.preventDefault();
    const newEvent = {
      id: uuidv4(),
      title: value,
      start: startDate,
      end: endDate,
      allDay: allday,
      resourceId: 1,
      category: cat
    }

    setEvents([...events, newEvent]);
    saveEventInBackend(newEvent);
    setLoaded(false);
    localStorage.removeItem(LOCAL_STORAGE_EVENTS);
    getEventsFromBackend(userData.id);
    if (events)
      setLoaded(true);
  }


  //.................................

  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <MainContent>
          <PageTitle>Kalender</PageTitle>

          <Calendargroup>
            <NewEventButton onClick={handleNewEvent} >
              neuen Termin hinzufügen
            </NewEventButton>
            <Calendar
              eventPropGetter={eventStyleGetter}
              events={events}
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              // onClick={handleCloseEvent}
              onSelectSlot={handleSelectSlot}
              selectable
            />
            <div>
              {open &&
                <CalendarInputCard
                  handleChange={handleChange}
                  handleCheckbox={handleCheckbox}
                  handleStartDate={handleStartDate}
                  startDate={startDate}
                  handleEndDate={handleEndDate}
                  handleSubmit={handleSubmit}
                  handleSelection={handleSelection}
                  handleClose={handleClose}
                  allday={allday}
                  setAllday={setAllday}
                  value={value}
                />
              }
              {view &&
                <EventCard
                  view={view}
                  setView={setView}
                  event={currentEvent}
                  setOpen={setOpen}>
                </EventCard>
              }
            </div>
          </Calendargroup>
        </MainContent>
      </MainGroup>
      <Footer />
    </ContentGroup>
  )
}

export default MyCalendar;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const Calendargroup = styled.div`
  margin: 2.0rem;
  height: 600px;
`
