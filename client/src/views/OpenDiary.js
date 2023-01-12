import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { DiaryButton } from '../components/Buttons'
import { useUserContext } from "../providers/userContext";
import { StGiChart, StBiListPlus } from '../components/Icons'
import { StGiFountainPen } from '../components/Icons'

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, MainContent, PageTitle } from "../styled/globalStyles"
import { useDataContext } from "../providers/dataContext";

//---------------------------------------------------------

const OpenDiary = () => {

    const { user, userData, anyChange, checkToken } = useUserContext();
    const { diary, getDiaryFromBackend } = useDataContext();

    const location = useLocation();
    const navigate = useNavigate();

    // console.log("USER?", user)
    // console.log("USERDATA?", userData)
    // console.log("DIARY?", diary)

    //----------------------------

    useEffect(() => {
        if (!user)
            navigate('/login')
        checkToken();
    }, [location])



    useEffect(() => {
        if(userData)
        if (!diary) {
            if (userData.diaryId) {
                console.log("noch kein Diary da, schau nach, ob was im Backend ist")
                getDiaryFromBackend(userData.diaryId)
            }
            else
                console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
        }
        else {
            console.log("Diary:", diary)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

//------------------------------------------------------

    const handleEdit = () => {
        navigate('/EditDiary')
    }

    const handleShowResults = () => {
        navigate('/DiaryData')
    }

    const handleAddValues = () => {
        // ...
    }

    // console.log("DIARY: \n", diary)

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <MainContent>
                    <PageTitle>Dein persönliches Patienten-Tagebuch</PageTitle>

                    <ButtonField>
                        <DiaryButton onClick={handleEdit}>
                            <StGiFountainPen />Daten eintragen</DiaryButton>
                        <DiaryButton onClick={handleShowResults}>
                            <StGiChart />Ergebnisse sehen</DiaryButton>
                        <DiaryButton onClick={handleAddValues}>
                            <StBiListPlus />Werte hinzufügen</DiaryButton>
                    </ButtonField>
                </MainContent>
            </MainGroup>
            <Footer />
        </ContentGroup >
    )
}

export default OpenDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const OpenDiaryGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0.75rem;
  margin-bottom: 3.0rem;
`

const ButtonField = styled.div`
  /* margin-left: 3.5rem;
  margin-top: 5.0rem; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`

