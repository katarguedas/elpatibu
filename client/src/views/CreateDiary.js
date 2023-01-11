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
import { ContentGroup, MainGroup, PageTitle, TitleH2, StP, Accordion } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext"

//---------------------------------------------------------

const CreateDiary = () => {

    const { diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary } = useDataContext();
    const { user, userData, anyChange, checkToken } = useUserContext();

    const [on, setOn] = useState();
    // const [diaryName, setDiaryName] = useState();
    const [created, setCreated] = useState(false);
    const [done, setDone] = useState(false);


    let location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if((user) && (!userData))
          checkToken();
        if (!user)
            navigate('/login');
        checkToken();
        let temp = diaryInit;

        setDiaryTemplate(temp);
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
        console.log("selected? ", diaryTemplate.groups[indexG].items[indexI].selected)
    }


    const sendAndCreate = () => {
        console.log("Erstelle diaryTemplate")
        const res = createNewDiary(diaryTemplate.id);
        if (res === true) {
            console.log("alle checks ok")
            setCreated(true);
            setDone(true);
            timing();
            // setDiaryTemplate();
        } else {
            console.log("irgendwelche states sind noch nicht auf true. warum?")
        }
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

    // console.log("ON: ", on)
    // console.log("DONE:", done)
    // console.log("created", created)

    console.log("diaryTemplate", diaryTemplate)

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
                        <Input onChange={(e) => setdiaryTemplateName(e.target.value)} />
                    </FormField> */}
                    {
                        diaryTemplate &&
                    <StP>Wähle nun aus den nachfolgenden Optionen die Werte aus, die Du dokumentieren möchtest. </StP>
                    }
                    {
                        diaryTemplate &&
                        <SwithcGroup>
                            <SwitchToggle isOn={on} handleToggle={() => setOn(!on)} />
                            <SwitchText>alle aufklappen</SwitchText>
                        </SwithcGroup>
                    }
                    {
                        diaryTemplate &&
                        diaryTemplate.groups.map(e => (
                            <ItemGroup key={e.id}>
                                <Accordion onClick={() =>
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
                        (created === false) &&
                        (done === false) &&
                        <SendButton onClick={sendAndCreate} >erstellen</SendButton>
                    }
                    {created &&
                        <p style={{ fontWeight: '500' }} >Tagebuch erfolgreich erstellt!</p>
                    }
                    {(created === false) &&
                        done &&
                        <SendButton onClick={navToDiary} >zum Tagebuch</SendButton>
                    }

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

// const Accordion = styled.div`
//   border: 1.5px solid ${(props) => props.theme.colors.col21};
//   border-top-right-radius: 1.5rem;
//   border-top-left-radius: 1.5rem;
//   border-bottom-right-radius: 1.5rem;
//   background-color: ${(props) => props.theme.colors.col20};
//   &:hover{
//     background-color: ${(props) => props.theme.colors.col22};
//     border-color: ${(props) => props.theme.colors.col24};
//     color: white;
//   }
//   :active{
//     background-color: #fff;
//     color: black;
//   }
//   padding: 0.5rem 0.5rem 0.5rem 1.5rem;
//   margin: 0.5rem 1.5rem;
//   font-size: 1.25rem;
//   font-weight: 500;
//   box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
// `

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