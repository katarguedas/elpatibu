import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"
import { useState } from "react"

import { v4 as uuidv4 } from 'uuid';

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle, TitleH2, StP } from "../styled/globalStyles"

//---------------------------------------------------------

const CreateDiary = () => {

    const [open, setOpen] = useState({
        vital: false,
        symptoms: false,
        meteorosensitivity: false,
        sleep: false,
        weight: false,
        wellBeeing: false,
        mood: false
    })

    // const [open, setOpen] = useState([
    //     {
    //         id: uuidv4(),
    //         group: 'vital',
    //         name: 'Vitalwerte',
    //         toggle: false
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'symptoms',
    //         name: 'Symptome',
    //         toggle: false
    //     }
    // ])

    const handleToggle = (e) => {
        console.log(e, open, typeof e)

        setOpen({
            ...open,
            [e]: !open[e],
        })
    }

    console.log("vital", open.vital)
    console.log("symptoms", open.symptoms)


    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <DashboardGroup>
                    <PageTitle>Neues Tagebuch</PageTitle>
                    <TitleH2>Erstelle Dein individuelles Patienten-Tagebuch
                    </TitleH2>
                    <StP>Wähle aus den nachfolgenden Optionen die Werte aus, die Du dokumentieren möchtest. </StP>

                    
 
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('vital')} >Vitalwerte</Accordion>
                        {
                            open.vital &&
                            <Panel>test  {open.vital}</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('symptoms')} >Symptome</Accordion>
                        {
                            open.symptoms &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('meteorosensitivity')} >Wetterfühligkeit</Accordion>
                        {
                            open.meteorosensitivity &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('sleep')} >Schlaf</Accordion>
                        {
                            open.sleep &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('weight')} >Körpergewicht</Accordion>
                        {
                            open.weight &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('wellBeeing')} >Allgemeines Wohlbefinden</Accordion>
                        {
                            open.wellBeeing &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup>
                    <ValueGroup>
                        <Accordion onClick={() => handleToggle('mood')} >Stimmung</Accordion>
                        {
                            open.mood &&
                            <Panel>test</Panel>
                        }
                    </ValueGroup> 
                </DashboardGroup>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}


export default CreateDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const DashboardGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0.75rem;
`

const ValueGroup = styled.div`

`

const Accordion = styled.div`
  border: 1px solid orange;
  border-top-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  /* border-radius: 1.5rem; */
  background-color: #bbe268;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  margin: 0.5rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  /* transition: 0.4s; */
`

const Panel = styled.div`
  background-color: #f1f1f1;
  text-align: left;
  position: relative;
  top: -2.75rem;
  z-index: -1;
  padding: 2.0rem 0.5rem 0.0rem 1.5rem;
  margin: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  /* border-bottom-right-radius: 1.25rem; */

`