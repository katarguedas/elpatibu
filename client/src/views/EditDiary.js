import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
// import { SendButton } from "../components/Buttons";

import GetData from '../components/GetData'

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../providers/userContext";

import { BiRightArrow, BiDownArrow } from "react-icons/bi";

import styled from "styled-components";
import { ContentGroup, MainGroup, Accordion, PageTitle } from "../styled/globalStyles"
import { useDataContext } from "../providers/dataContext";

//---------------------------------------------------------

const EditDiary = () => {

  const { user, checkToken } = useUserContext();
  const { diary } = useDataContext();

  const [edit, setEdit] = useState(false);

  let location = useLocation();
  const navigate = useNavigate();

  // console.log("selected? ", diary.groups[0].items[0].selected)

  useEffect(() => {
    if (!user)
      navigate('/login');
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!user)
      navigate('/login');
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])


  const handleClick = () => {
    setEdit(!edit);
    // editItem()
  }


  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <Group>

          <PageTitle>Hier kannst Du neue Daten eingeben</PageTitle>

          {
            diary &&
            diary.groups.map((e, i) => (
              e.items.filter(e => e.selected === true).length > 0 &&
              <Items key={e.id} >

                <StAccordion onClick={handleClick}>

                  {edit ?
                    <StBiDownArrow></StBiDownArrow>
                    :
                    <StBiRightArrow></StBiRightArrow>
                  }
                  {e.label}

                </StAccordion>
                {edit ?
                  <div>

                    <StDiv>
                      <GetData id={e.id} index={i} ></GetData>
                    </StDiv>
                  </div>

                  : null}

              </Items>

            ))
          }
        </Group>
      </MainGroup>
      <Footer />
    </ContentGroup>
  )
}

export default EditDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const Group = styled.div`
  display: flex;
  flex-direction: column;
`

const StAccordion = styled(Accordion)`
  border-radius: 1.5rem;
  border-color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.col30};
  &:hover {
    background-color: ${(props) => props.theme.colors.col32};
    color: black;
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
  box-shadow: none;  
`

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
/* display: ${props => props.visible ? 'flex' : 'none'}; */
  flex-direction: column;
  /* text-align: center; */
  /* position: relative; */
  /* top: -2.75rem; */
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 1.25rem;
  font-size: 1.15rem;
`