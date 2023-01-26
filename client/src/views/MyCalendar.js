import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import CalendarInputCard from "../components/forms/CalendarInputCard";
import { ContentGroup, MainGroup, MainContent, PageTitle } from "../styled/globalStyles";
import { theme } from '../themes/theme';
import React, { useState, useCallback, useMemo, useEffect, useInsertionEffect } from "react";
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar';
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import styled from "styled-components";
import { useUserContext } from "../providers/userContext";

//---------------------------------------------------------

const MyCalendar = () => {

    const { events, setEvents, saveEventInBackend, getEventsFromBackend, userData } = useUserContext();

    const [value, setValue] = useState();
    const [open, setOpen] = useState();
    const [allday, setAllday] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [cat, setCat] = useState();

    const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })

    //.................................

    useEffect(() => {
        if (open) {
            // console.log(myEvents)
        }
    }, [open])


    useEffect(() => {

        if (!events)
            getEventsFromBackend(userData.id);
    }, [])

    useEffect(() => {
        if (events)
            console.log(events)
    }, [])


    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            // setStartDate(start)
            setOpen(true)
        },
        [setEvents]
    )


    // const handleSelectEvent = useCallback(
    //     (event) => window.alert(event.title),
    //     []
    // )

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2023, 1, 12),
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    )

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event);
        var backgroundColor = '#' + event.hexColor;
        var backgroundColor = theme.colors.col1;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }


    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleCheckbox = e => {
        setAllday(!allday)
    }


    const dateAllday = (e, flag) => {
        const str = e;
        const yyyy = str.slice(0, 4);
        const mm = str.slice(5, 7) - 1;
        const dd = str.slice(8, 10);
        if (flag == 1)
            return (new Date(yyyy, mm, dd, 0, 0, 0))
        else if (flag == 2)
            return (new Date(yyyy, mm, dd, 24, 0, 0))
    }

    const dateNoAllday = e => {
        const str = e;
        const yyyy = str.slice(0, 4);
        const mm = str.slice(5, 7) - 1;
        const dd = str.slice(8, 10);
        const hh = str.slice(11, 13);
        const min = str.slice(14, 17);
        console.log(yyyy, mm, dd, hh, min, 0)
        return (new Date(yyyy, mm, dd, hh, min, 0))
    }


    const handleStartDate = e => {
        console.log("Startdatum", e.target.value)

        if (allday === true)
            setStartDate(dateAllday(e.target.value, 1))
        else
            setStartDate(dateNoAllday(e.target.value))
    }


    const handleEndDate = e => {
        console.log("Enddatum", e.target.value)

        if (allday === true)
            setEndDate(dateAllday(e.target.value, 2))
        else {
            setEndDate(dateNoAllday(e.target.value))
        }
    }

    const handleSelection = e => {
        console.log("selection:", e.target.value)
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

        setEvents([...events, newEvent])
        saveEventInBackend(newEvent);
        console.log(events)
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

                        <Calendar
                            // defaultDate={defaultDate}
                            defaultDate={defaultDate}
                            eventPropGetter={eventStyleGetter}
                            events={events}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            // onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            scrollToTime={scrollToTime}
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
                                    value={value} />
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
