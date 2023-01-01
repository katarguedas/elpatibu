import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const Calendar = () => {


    let date = new Date();
    console.log(date)

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <Calendargroup>
                    <PageTitle>Kalender</PageTitle>
                 <div>   </div>
                </Calendargroup>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default Calendar;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const Calendargroup = styled.div`
  margin: 0;
`
