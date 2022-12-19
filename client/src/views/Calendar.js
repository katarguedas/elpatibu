import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const Calendar = () => {

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <PageTitle>Kalender</PageTitle>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default Calendar;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


