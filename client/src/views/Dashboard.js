import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, Main, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const Dashboard = () => {

    return (
        <ContentGroup>
            <Header />
            <Main>
                <NavBar />
                <PageTitle>Dashboard</PageTitle>
            </Main>
            <Footer />
        </ContentGroup>
    )
}

export default Dashboard;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

