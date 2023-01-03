import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React  from "react"
import { useEffect } from "react"
import { useUserContext } from "../providers/userContext"

import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle } from "../styled/globalStyles"

//---------------------------------------------------------

const Calendar = () => {
    
    const {user, anyChange, setAnyChange, checkToken} = useUserContext()

    const location = useLocation();
    const navigate = useNavigate();

    if (!user)
    navigate('/login')

    useEffect(() => {
        setAnyChange(!anyChange)
    }, [])

    useEffect(() => {
        checkToken();
    }, [location, anyChange])

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
