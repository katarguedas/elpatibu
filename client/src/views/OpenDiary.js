import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const OpenDiary = () => {

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <PageTitle>Dein persönliches Patienten-Tagebuch</PageTitle>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default OpenDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


