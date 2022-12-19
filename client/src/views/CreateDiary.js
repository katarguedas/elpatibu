import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const CreateDiary = () => {

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <PageTitle>Neues Tagebuch erstellen</PageTitle>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default CreateDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


