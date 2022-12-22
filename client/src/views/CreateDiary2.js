import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SwitchToggle from "../components/SwitchToggle"

import React, { useEffect } from "react"
import { useState } from "react"

import { v4 as uuidv4 } from 'uuid';

import {BiRightArrow, BiDownArrow} from "react-icons/bi";

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle, TitleH2, StP } from "../styled/globalStyles"

//---------------------------------------------------------

const CreateDiary2 = () => {

    const [on, setOn] = useState(false)

    const [values, setValues] = useState([
        {
            id: uuidv4(),
            group: 'vital',
            name: 'Vitalwerte',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'symptoms',
            name: 'Symptome',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'meteorosensitivity',
            name: 'Wetterfühligkeit',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'sleep',
            name: 'Schlaf',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'weight',
            name: 'Körpergewicht',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'wellBeeing',
            name: 'Allgemeines Wohlbefinden',
            visible: false
        },
        {
            id: uuidv4(),
            group: 'mood',
            name: 'Stimmung',
            visible: false
        }
    ])



    const handleClick = (id) => {
        setValues(values.map((e) => {
            if (e.id === id) e.visible = !e.visible;
            return e;
        }));
    }

    useEffect(() => {
        if (on === true) {
            setValues(values.map((e) => {
                e.visible = true;
                return e;
            }))
        } else {
            setValues(values.map((e) => {
                e.visible = false;
                return e;
            }))
        }
    }, [on])

    console.log(on)
    console.log(values)

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

                    <div style={{display: 'inline-flex', alignItems: 'center'}}>
                        {/* <span style={{padding: '0.5rem'}} >ausblenden</span> */}
                        <SwitchToggle isOn={on} handleToggle={() => setOn(!on)} />
                        <span style={{padding: '0.5rem'}}  >alle aufklappen</span>
                    </div>
                    {
                        values.map(e => (
                            <ValueGroup key={e.id}>
                                <Accordion onClick={() => handleClick(e.id)} >
                                <StBiRightArrow visible={e.visible}></StBiRightArrow> 
                                <StBiDownArrow visible={e.visible}></StBiDownArrow>
                                {e.name} 
                                </Accordion>
                                <Panel visible={e.visible}>test</Panel>
                            </ValueGroup>
                        ))
                    }
                </DashboardGroup>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}


export default CreateDiary2;


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
  border: 1px solid #F1B505;
  border-top-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  background-color: #bbe268;
  &:hover{
    background-color: #F1B505;
  }
  :active{
    background-color: #F09F04;
  }
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  margin: 0.5rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  /* transition: 0.4s; */
`

const Panel = styled.div` 
  display: ${props => props.visible ? 'flex' : 'none'};
  transition: 3s;
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
const StBiRightArrow = styled(BiRightArrow)`
  display: ${props => props.visible ? 'none' : 'visible'};
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

const StBiDownArrow = styled(BiDownArrow)`
  display: ${props => props.visible ? 'visible' : 'none'};
  font-size: 1.0rem;
  margin-right: 0.5rem;
`