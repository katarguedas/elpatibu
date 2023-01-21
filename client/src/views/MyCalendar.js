import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import CalendarInputCard from "../components/forms/CalendarInputCard";
import { ContentGroup, MainGroup, MainContent, PageTitle } from "../styled/globalStyles";

import React, { useState, useCallback, useMemo, useEffect, useInsertionEffect } from "react";
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar';
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import styled from "styled-components";

//---------------------------------------------------------

const MyCalendar = () => {

    const events = [
        {
            id: uuidv4(),
            title: 'Testing',
            start: new Date(2023, 0, 20, 1, 0, 0),
            end: new Date(2023, 0, 20, 13, 0, 0),
            resourceId: 1,
            category: '1'
        },
        {
            id: uuidv4(),
            title: 'Abschluss',
            allDay: true,
            start: new Date(2023, 0, 28, 14, 0, 0),
            end: new Date(2023, 0, 28, 16, 30, 0),
            resourceId: 2,
            category: '2'
        }
    ]

    const [myEvents, setEvents] = useState(events)
    const [value, setValue] = useState();
    const [open, setOpen] = useState();
    const [allday, setAllday] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [cat, setCat] = useState();

    const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })

    //.................................

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            setStartDate(start)
            setOpen(true)

        },
        [setEvents]
    )

    useEffect(() => {
        if (open) {
            console.log(myEvents)
            console.log(myEvents[myEvents.length - 1].start)
        }
    }, [open])


    useEffect(() => {
        console.log(myEvents)
    }, [myEvents])

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    )

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2023, 1, 12),
            scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
    )

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event);
        var backgroundColor = '#' + event.hexColor;
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

    const handleStartDate = e => {
        console.log(e.target.value)
        setStartDate(e.target.value)
    }
    
    const handleEndDate = e => {
        console.log(e.target.value)
        setEndDate(e.target.value)
    }

    const handleSelection = e => {
        console.log(e.target.value)
        setCat(e.target.value)
    }

    const handleSubmit = (e) => {
        setOpen(false)
        e.preventDefault();
        setEvents([...events, {
            id: uuidv4(),
            title: value,
            start: startDate,
            end: endDate,
            allDay: allday,
            resourceId: 1,
            category: cat
        }])
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
                            events={myEvents}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            onSelectEvent={handleSelectEvent}
                            // onSelect
                            onSelectSlot={handleSelectSlot}
                            scrollToTime={scrollToTime}
                            selectable
                        // step={60}
                        // views={views}
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
