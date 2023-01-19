import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { ContentGroup, MainGroup, MainContent, PageTitle } from "../styled/globalStyles"

import React, { useState, useCallback, useMemo } from "react"
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar'
import { DateTime } from "luxon";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import styled from "styled-components"

//---------------------------------------------------------

const MyCalendar = () => {

    const events = [
        {
            id: 0,
            title: 'Testing',
            start: new Date(2023, 0, 20, 1, 0, 0),
            end: new Date(2023, 0, 20, 13, 0, 0),
            resourceId: 1,
        },
        {
            id: 1,
            title: 'Abschluss',
            allDay: true,
            start: new Date(2023, 0, 28, 14, 0, 0),
            end: new Date(2023, 0, 28, 16, 30, 0),
            resourceId: 2,
        }
    ]

    const [myEvents, setEvents] = useState(events)

    const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })

    //.................................

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event name')
            if (title) {
                setEvents((prev) => [...prev, { start, end, title }])
            }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    )

    const { defaultDate, scrollToTime } = useMemo(
        () => ({
          defaultDate: new Date(2015, 3, 12),
          scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
      )


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
                            events={myEvents}
                            localizer={localizer}
                            resourceIdAccessor="resourceId"
                            resourceTitleAccessor="resourceTitle"
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            scrollToTime={scrollToTime}
                            selectable
                        // step={60}
                        // views={views}
                        />

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
