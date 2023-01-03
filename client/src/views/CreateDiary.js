import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SwitchToggle from "../components/SwitchToggle"
// import Input from "../components/forms/Input"
import Panel from "../components/Panel"
import { SendButton } from "../components/Buttons"

import { useDataContext } from "../providers/dataContext"

import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import { BiRightArrow, BiDownArrow } from "react-icons/bi";

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle, TitleH2, StP } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext"

//---------------------------------------------------------

const CreateDiary = () => {

    const { items, setItems, createNewDiary } = useDataContext();
    const { user, anyChange, checkToken } = useUserContext();

    const [on, setOn] = useState(false)
    const [diaryName, setDiaryName] = useState()



    // const [items, setItems] = useState([
    //     {
    //         id: uuidv4(),
    //         group: 'vital',
    //         name: 'Vitalwerte',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'temperature',
    //                 label: 'Temperatur',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'pressureHigh',
    //                 label: 'Systolischer Blutdruck',
    //                 selected: true,
    //             },
    //             {
    //                 item: 'pressureLow',
    //                 label: 'Diastolischer Blutdruck',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'pulse',
    //                 label: 'Puls',
    //                 selected: true,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'weight',
    //         name: 'Körpergewicht',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'weight',
    //                 label: 'Körpergewicht',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'wellBeing',
    //         name: 'Allgemeines Wohlbefinden',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'wellBeing',
    //                 label: 'Wohlbefinden',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'mood',
    //         name: 'Stimmung',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'mood',
    //                 label: 'Stimmung',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'moodSwings',
    //                 label: 'Stimmungsschwankungen',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'sleep',
    //         name: 'Schlaf',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'hours',
    //                 label: 'Anzahl der Schlafstunden',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'interruption',
    //                 label: 'Schlafunterbrechungen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'restful',
    //                 label: 'Erholung durch Schlaf',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'medication',
    //                 label: 'Medikamenteneinnahme',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'meteorosensitivity',
    //         name: 'Wetterfühligkeit',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'headache',
    //                 label: 'Kopfschmerzen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'fatigue',
    //                 label: 'Müdigkeit / Erschöpfung',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'circulationProblems',
    //                 label: 'Kreislaufprobleme',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'insomnia',
    //                 label: 'Schlafstörungen',
    //                 selected: false,
    //             }
    //         ]
    //     },
    //     {
    //         id: uuidv4(),
    //         group: 'symptoms',
    //         name: 'Symptome',
    //         visible: false,
    //         itemList: [
    //             {
    //                 item: 'pain',
    //                 label: 'Schmerzen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'nausea',
    //                 label: 'Übelkeit',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'vomiting',
    //                 label: 'Erbrechen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'diarrhea',
    //                 label: 'Durchfall',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'pyrosis',
    //                 label: 'Sodbrennen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'fatigue',
    //                 label: 'Erschöpfung / Müdigkeit',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'insomnia',
    //                 label: 'Schlaflosigkeit',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'vertigo',
    //                 label: 'Schwindelgefühl',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'appetiteLoss',
    //                 label: 'Appetitlosigkeit',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'fingerTingling',
    //                 label: 'Kribbeln in den Fingern / fingerspitzen',
    //                 selected: false,
    //             },
    //             {
    //                 item: 'memoryDisorder',
    //                 label: 'Gedächtnisstörungen',
    //                 selected: false,
    //             }
    //         ]
    //     }
    // ])

    let location = useLocation();
    const navigate = useNavigate();

    if (!user)
        navigate('/login')


    const handleClick = (id) => {
        setItems(items.map((e) => {
            if (e.id === id)
                e.visible = !e.visible;
            return e;
        }));
    }

    const handleSelect = (id, el) => {
        const indexG = items.findIndex((e) => e.id === id);
        const indexI = items[indexG].itemList.findIndex((e) => e.item === el);
        setItems(
            [...items], items[indexG].itemList[indexI].selected = !items[indexG].itemList[indexI].selected
        )
    }

    const sendAndCreate = () => {
        console.log("Erstelle Diary")
        createNewDiary()
    }

    useEffect(() => {
        checkToken();
    }, [location, anyChange])

    useEffect(() => {
        if (on === true) {
            setItems(items.map((e) => {
                e.visible = true;
                return e;
            }))
        } else {
            setItems(items.map((e) => {
                e.visible = false;
                return e;
            }))
        }
    }, [on])


    console.log(items)


    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <DashboardGroup>
                    <PageTitle>Neues Tagebuch</PageTitle>
                    <TitleH2>Erstelle Dein individuelles Patienten-Tagebuch
                    </TitleH2>
                    {/* <StP>Möchtest Du Deinem Tagebuch einen Namen geben?</StP>
                    <FormField onSubmit={handleSubmit}>
                        <Input onChange={(e) => setDiaryName(e.target.value)} />
                    </FormField> */}
                    <StP>Wähle nun aus den nachfolgenden Optionen die Werte aus, die Du dokumentieren möchtest. </StP>

                    <SwithcGroup>
                        <SwitchToggle isOn={on} handleToggle={() => setOn(!on)} />
                        <SwitchText>alle aufklappen</SwitchText>
                    </SwithcGroup>
                    {
                        items &&
                        items.map(e => (
                            <ItemGroup key={e.id}>
                                <Accordion onClick={() =>
                                    handleClick(e.id)}
                                    shadow={e.visible}>
                                    {!e.visible && <StBiRightArrow></StBiRightArrow>}
                                    {e.visible && <StBiDownArrow></StBiDownArrow>}
                                    {e.name}
                                </Accordion>

                                <Panel itemGroup={e} handleSelect={handleSelect} ></Panel>
                            </ItemGroup>
                        ))
                    }
                    <SendButton onClick={sendAndCreate} >erstellen</SendButton>
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
  margin-bottom: 3.0rem;
`

const SwitchText = styled.span`
padding: 0.5rem; 
margin-bottom: -0.45rem; 
font-weight: 500;
`
const SwithcGroup = styled.div`
  display: inline-flex; 
  align-items: center;
`

const ItemGroup = styled.div`

`

const Accordion = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.col21};
  border-top-right-radius: 1.5rem;
  border-top-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.col20};
  &:hover{
    background-color: ${(props) => props.theme.colors.col22};
    border-color: ${(props) => props.theme.colors.col24};
    color: white;
  }
  :active{
    background-color: #fff;
    color: black;
  }
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  margin: 0.5rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
  /* transition: 0.4s; */
`

const StBiRightArrow = styled(BiRightArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

const StBiDownArrow = styled(BiDownArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

// const StBiSquare = styled(BiSquare)`
//   font-size: 1.1rem;
//   margin-right: 0.75rem;
//   margin-bottom: -0.2rem;
// `
// const StBiCheckSquare = styled(BiCheckSquare)`
//   font-size: 1.1rem;
//   margin-right: 0.75rem;
//   margin-bottom: -0.2rem;
// `

// const Item = styled.div`
//   margin: 0.25rem;
// `