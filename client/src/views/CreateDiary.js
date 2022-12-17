import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, Main, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const CreateDiary = () => {

    return (
        <ContentGroup>
            <Header />
            <Main>
                <NavBar />
                <PageTitle>Neues Tagebuch erstellen</PageTitle>
            </Main>
            <Footer />
        </ContentGroup>
    )
}

export default CreateDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


