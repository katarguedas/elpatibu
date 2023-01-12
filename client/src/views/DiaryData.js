import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
// import TimeChartT from '../components/charts/TimeChartT'
// import TimeChartP2 from '../components/charts/TimeChartP2'
import { createPData } from '../utils/testdata'
import PlotVital from "../components/PlotVital"
import { StBiDownArrow, StBiRightArrow } from '../components/Icons'
import { useState } from "react"

import { useLocation, useNavigate } from "react-router-dom";

import { ContentGroup, MainGroup, MainContent, Accordion } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext"
import { useEffect } from "react"

import styled from "styled-components"
import { useDataContext } from "../providers/dataContext"

//---------------------------------------------------------

const DiaryData = () => {

    const { user, checkToken } = useUserContext();
    const { diary } = useDataContext();

    const [edit, setEdit] = useState(false);
    // const [open, setOpen] = useState(false);


    //------------------



    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <MainContent>
                    {
                        diary &&
                        diary.groups.map((e, i) => (

                            <Items key={e.id} >

                                { <Accordion visible={edit} onClick={handleClick}>

                                    {edit ?
                                        <StBiDownArrow></StBiDownArrow>
                                        :
                                        <StBiRightArrow></StBiRightArrow>
                                    }
                                    {e.label}

                                </Accordion> }
                                {
                                    e.name === 'vital' &&
                                    <PlotVital itemVital={e} />
                                }
                            </Items>
                        ))
                    }

                </MainContent>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default DiaryData;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------



const StDiv = styled.div` 
  flex-direction: column;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 1.25rem;
  font-size: 1.15rem;
`

const Items = styled.div`
  margin-bottom: 0;
`

