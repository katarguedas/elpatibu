import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import CalendarInputCard from '../forms/CalendarInputCard';
import EventCard from '../EventCard';
import { NewEventButton } from '../../styled/Buttons';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';
import { useNavigate } from 'react-router';
import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';


import { eventsActions } from '../../store/eventsSlice';
import { deleteEventInBackend, fetchEvents, saveEventInBackend } from '../../store/eventsActions';
import { checkToken } from '../../store/authActions';

require('globalize/lib/cultures/globalize.culture.de');

/***********************************************************************
 * Calendar Component which allows to save events.
 * Future vents saved here will be shown in Dashboard.
 * @returns 
 *****************************/
const MyCalendar = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const events = useSelector(state => state.events.events);
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const navigate = useNavigate();

  const [calendarEvents, setCalendarEvents] = useState();
  const [value, setValue] = useState();
  const [open, setOpen] = useState();
  const [view, setView] = useState();
  const [allday, setAllday] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cat, setCat] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [loaded, setLoaded] = useState();
  const [deleted, setDeleted] = useState();

  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })

  //.................................

  useEffect(() => {
      dispatch(checkToken());
  }, [dispatch])


	useEffect(() => {
		if (!loginStatus) {
      navigate('/login');
    }
  }, [loginStatus, dispatch, navigate])


  useEffect(() => {
    if ((!events || events?.length === 0) && userData.id !== '') {
      dispatch(fetchEvents(userData.id));
    }
    if (events && !calendarEvents) {
      setCalendarEvents(events);
      setLoaded(true);
    }
  }, [])


  const dateAllday = (str, flag) => {
    console.log("str: ", str)
    if (flag === 1) //startDatum
      // return (new Date(yyyy, mm, dd, 1, 0, 0).toString):
      return (
        (new Date(
          str.slice(0, 4),
          str.slice(5, 7) - 1,
          str.slice(8, 10),
          1, 0, 0)).toISOString())
    else if (flag === 2)   //EndDatum
      // return (new Date(yyyy, mm, dd, 23, 59, 0).toString):
      return (
        (new Date(
          str.slice(0, 4),
          str.slice(5, 7) - 1,
          str.slice(8, 10),
          23, 59, 0)).toISOString())
  }


  const dateNoAllday = str => {
    // return (new Date(yyyy, mm, dd, hh, min, 0).toString):
    return (
      (new Date(
        str.slice(0, 4),
        str.slice(5, 7) - 1,
        str.slice(8, 10),
        str.slice(11, 13),
        str.slice(14, 17), 0
      )).toISOString())
  }

  const dateNoAllday2 = str => {
    // console.log(yyyy, mm, dd, hh, min, 0):
    return (
      (new Date(
        str.slice(0, 4),
        str.slice(5, 7) - 1,
        str.slice(8, 10),
        str.slice(11, 13),
        str.slice(14, 16), 0
      )))
  }

  const updateCalendarEvents = () => {
    var eventsCopy = JSON.parse(JSON.stringify(events));
    // console.log("update calendarevents. events: ", eventsCopy)
    setCalendarEvents([...eventsCopy], eventsCopy.map((e) => {
      if (typeof (e.start) === 'string') {
        e.start = dateNoAllday2(e.start)
        e.end = dateNoAllday2(e.end)
        return e;
      }
    }));
  }

  useEffect(() => {
    updateCalendarEvents();
  },[events])

  useEffect(() => {
    if ((loaded) && (calendarEvents)) {
      updateCalendarEvents();
      setView(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])


  useEffect(() => {
    if (deleted) {
      const res = dispatch(deleteEventInBackend(userData.id, currentEvent.id));
      if (res) {
        dispatch(eventsActions.removeEvent({ id: currentEvent.id }));
       setLoaded(true);
      }
    }
  }, [deleted, dispatch])


  const handleSelectSlot = () => {
    setView(false)
    setOpen(false)
  }

  const handleNewEvent = ({ start, end }) => {
    setStartDate(start)
    setStartDate(end)
    setView(false)
    setOpen(true)
  }


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
    }, [view])


  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleCheckbox = e => {
    setAllday(!allday)
  }


  const handleStartDate = e => {
    console.log("allday?", allday)
    if (allday === true) {
      const dateValue = dateAllday(e.target.value, 1);
      console.log("Noch ein VERSUCH: ", dateValue)
      setStartDate(prevDate => {
        return dateValue
      });
    }
    else {
      const dateValue = dateNoAllday(e.target.value);

      setStartDate(prevDate => {
        return dateValue
      });
    }
  }


  const handleEndDate = e => {
    if (allday === true)
      setEndDate(dateAllday(e.target.value, 2))
    else {
      setEndDate(dateNoAllday(e.target.value))
    }
  }

  const handleSelection = e => {
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

    const res = dispatch(saveEventInBackend(newEvent, userData.id));
    if (res) {
      dispatch(eventsActions.saveEvent({ event: newEvent }));
    }
  }


  //**************************************************** */

  return (
    <StyledContentGroup>
      <Header />
      <StyledMainGroup>
        <NavBar />
        <StyledMainContent>
          <PageTitle>Kalender</PageTitle>

          <Calendargroup>
            <NewEventButton onClick={handleNewEvent} >
              neuen Termin hinzufügen
            </NewEventButton>
            <Calendar
              eventPropGetter={eventStyleGetter}
              events={calendarEvents}
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              style={{ height: 500 }}
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
                  setView={setView}
                  event={currentEvent}
                  setDeleted={setDeleted}
                >
                </EventCard>
              }
            </div>
          </Calendargroup>
        </StyledMainContent>
      </StyledMainGroup>
      <Footer />
    </StyledContentGroup>
  )
}

export default MyCalendar;


/****************************************************************
 *  Styled-components
 ****************************************************************/


const Calendargroup = styled.div`
  margin: 2.0rem;
  /* height: 500px; */
`
