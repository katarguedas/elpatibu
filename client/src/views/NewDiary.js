import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { useLocation, useNavigate } from "react-router-dom";
import React, {useEffect} from "react"
import { useUserContext } from "../providers/userContext";

import styled from "styled-components"
import { ContentGroup, MainGroup } from "../styled/globalStyles"

//---------------------------------------------------------

const NewDiary = () => {

    const { user, anyChange, checkToken } = useUserContext();


    let location = useLocation();
    const navigate = useNavigate();

    if (!user)
    navigate('/login')

    useEffect(() => {
        checkToken();
    }, [location, anyChange])


    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default NewDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


