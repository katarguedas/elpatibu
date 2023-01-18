import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SwitchToggle from "../components/SwitchToggle"
import { FormField } from "../styled/globalStyles"
import Panel from "../components/Panel"
import { SendButton } from "../components/Buttons"
import { StBiDownArrow, StBiRightArrow } from '../components/Icons'
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2, StP, Accordion } from "../styled/globalStyles"

import { useDataContext } from "../providers/dataContext"
import { useUserContext } from "../providers/userContext"

import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";


import styled from "styled-components"


//---------------------------------------------------------

const CreateDiary = () => {

    const { diaryTemplate, setDiaryTemplate, setDiary, createNewDiary, diarySaved, DiaryInit } = useDataContext();
    const { user, userData, checkToken, diaryIdSaved } = useUserContext();

    const [on, setOn] = useState();
    const [created, setCreated] = useState(false);
    const [done, setDone] = useState(false);

    let location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if ((user) && (!userData))
            checkToken();
        if (!user)
            navigate('/login');
        setDiaryTemplate(DiaryInit)
    }, [])


    useEffect(() => {
        if (!user)
            navigate('/login');
        checkToken();
    }, [location])


    const handleClick = (id) => {
        console.log("handleClick, id:", id)
        setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map(e => {
            if (e.id === id)
                e.visible = !e.visible;
            return e;
        }))
    }

    const handleSelect = (groupId, itemId) => {
        const indexG = diaryTemplate.groups.findIndex((e) => e.id === groupId);
        const indexI = diaryTemplate.groups[indexG].items.findIndex((e) =>
            e.id ===
            itemId);
        console.log(itemId)
        console.log("indizes:", indexG, indexI)

        setDiaryTemplate(
            { ...diaryTemplate }, diaryTemplate.groups[indexG].items[indexI].selected = !diaryTemplate.groups[indexG].items[indexI].selected
        )
    }

    //......................................

    useEffect(() => {
        if ((diaryIdSaved) && (diarySaved)) {
            const tempDiary = diaryTemplate; 
            console.log("\n \n", tempDiary, "\n")
            setDiary(tempDiary); 
            setDiaryTemplate('');
            console.log("alle checks ok")
            setCreated(true);
            setDone(true);
            timing();
        }
    }, [diaryIdSaved, diarySaved])

    //...........................................


    const handleSendAndCreate = () => {
        createNewDiary(diaryTemplate.id);
    }

    const timing = () => {
        setTimeout(() => {
            setCreated(false)
        }, 2000)
    }


    const navToDiary = () => {
        navigate('/EditDiary')
    }

    useEffect(() => {
        if (on === true) {
            setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map((e) => {
                e.visible = true;
                return e;
            }))
        } else if (on === false) {
            setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map((e) => {
                e.visible = false;
                return e;
            }))
        }
    }, [on])

    const handleSubmit = e => {
        e.preventDefault();
    }

    console.log("diaryTemplate", diaryTemplate)

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <MainContent>
                    <PageTitle>Neues Tagebuch</PageTitle>
                    <TitleH2>
                        Erstelle Dein individuelles Patienten-Tagebuch
                    </TitleH2>
                    {
                        diaryTemplate &&
                        <StP>Wähle nun aus den nachfolgenden Optionen die Werte aus, die Du dokumentieren möchtest. </StP>
                    }
                    {
                        diaryTemplate &&
                        <SwitchGroup>
                            <SwitchToggle isOn={on} handleToggle={() => setOn(!on)} />
                            <SwitchText>alle aufklappen</SwitchText>
                        </SwitchGroup>
                    }
                    {
                        diaryTemplate &&
                        diaryTemplate.groups.map(e => (
                            <ItemGroup key={e.id}>
                                <Accordion visible={e.visible} onClick={() =>
                                    handleClick(e.id)}
                                >
                                    {!e.visible && <StBiRightArrow></StBiRightArrow>}
                                    {e.visible && <StBiDownArrow></StBiDownArrow>}

                                    {e.label}
                                </Accordion>

                                <Panel itemGroup={e} handleSelect={handleSelect} ></Panel>
                            </ItemGroup>
                        ))
                    }

                    {
                        (done === false) &&
                        <div>
                            <StP> Gebe Deinem Tagebuch bitte einen Namen: </StP>
                            <FormField onSubmit={handleSubmit}>
                                <input
                                    style={{ marginLeft: '1.5rem', width: '200px', height: '1.75rem' }}
                                    // value = 'mein erstes Tagebuch'
                                    onChange={(e) => setDiaryTemplate({ ...diaryTemplate, diaryName: e.target.value })}       
                                />
                            </FormField>
                        </div>
                    }

                    {
                        (created === false) &&
                        (done === false) &&
                        <SendButton onClick={handleSendAndCreate} >erstellen</SendButton>
                    }
                    {created &&
                        <p style={{ fontWeight: '500' }} >Tagebuch erfolgreich erstellt!</p>
                    }
                    {(created === false) &&
                        done &&
                        <SendButton onClick={navToDiary} >zum Tagebuch</SendButton>
                    }

                </MainContent>
            </MainGroup>
            <Footer />
        </ContentGroup >
    )
}


export default CreateDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const CreateDiaryGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0.75rem;
  margin-bottom: 3.0rem;
`

const SwitchText = styled.span`
padding: 0.5rem; 
margin-bottom: -0.45rem; 
font-weight: 500;
`
const SwitchGroup = styled.div`
  display: inline-flex; 
  align-items: center;
`

const ItemGroup = styled.div`

`

