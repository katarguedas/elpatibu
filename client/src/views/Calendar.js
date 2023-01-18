import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { ContentGroup, MainGroup, MainContent, PageTitle } from "../styled/globalStyles"

import React  from "react"
import { useEffect } from "react"
import { useUserContext } from "../providers/userContext"

import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components"

//---------------------------------------------------------

const Calendar = () => {
    
    const {user, checkToken} = useUserContext()

    const location = useLocation();
    const navigate = useNavigate();


    //..........

    useEffect(() => {
        checkToken();
    }, [location])



    let date = new Date();
    console.log(date)


    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <MainContent>
                    <PageTitle>Kalender</PageTitle>
                 <div>   </div>
                </MainContent>
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
