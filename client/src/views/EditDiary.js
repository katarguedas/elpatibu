import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import GetData from '../components/GetData'
import { useDataContext } from "../providers/dataContext";
import { ContentGroup, MainGroup, MainContent, Accordion, PageTitle } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext";

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BiRightArrow, BiDownArrow } from "react-icons/bi";

import styled from "styled-components";

//---------------------------------------------------------

const EditDiary = () => {

  const { user, userData, checkToken } = useUserContext();
  const { getDiaryFromBackend } = useDataContext();
  const { diary } = useDataContext();

  const [edit, setEdit] = useState(false);

  let location = useLocation();
  const navigate = useNavigate();

  //........................

  useEffect(() => {
    checkToken();
  }, [location])


  useEffect(() => {
    if (userData)
      if (!diary) {
        if (userData.diaryId) {
          console.log("noch kein Diary da, schau nach, ob was im Backend ist")
          getDiaryFromBackend(userData.diaryId);
        }
        else
          console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
      }
      else {
        // console.log("Diary:", diary)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleClick = () => {
    setEdit(!edit);
  }

  //..........................

  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <MainContent>

          <PageTitle>Hier kannst Du neue Daten eingeben</PageTitle>

          {
            diary &&
            diary.groups.map((e, i) => (
              e.items.filter(e => e.selected === true).length > 0 &&
              <Items key={e.id} >

                <Accordion visible={edit} onClick={handleClick}>

                  {edit ?
                    <StBiDownArrow></StBiDownArrow>
                    :
                    <StBiRightArrow></StBiRightArrow>
                  }
                  {e.label}

                </Accordion>
                {edit &&
                  <StDiv>
                    <GetData id={e.id} index={i} ></GetData>
                  </StDiv>
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

export default EditDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const EditDiaryGroup = styled.div`
  display: flex;
  flex-direction: column;
`


// const StAccordion = styled(Accordion)`
//   border-radius: 1.5rem;
//   border: 1.5px solid ${(props) => props.theme.colors.col21};
//   background-color: ${(props) => props.theme.colors.col20};
//   &:hover{
//   background-color: ${(props) => props.theme.colors.col22};
//   border-color: ${(props) => props.theme.colors.col24};
//   color: white;
// }
// :active{
//   background-color: #fff;
//   color: black;
// }
// `

const StBiRightArrow = styled(BiRightArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

const StBiDownArrow = styled(BiDownArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

const Items = styled.div`
  margin-bottom: 0;
`

const StDiv = styled.div` 
  flex-direction: column;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 1.25rem;
  font-size: 1.15rem;
`