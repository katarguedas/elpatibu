import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { SendButton } from "../components/Buttons";

import GetData from '../components/GetData'

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../providers/userContext";

import { BiRightArrow, BiDownArrow } from "react-icons/bi";

import styled from "styled-components";
import { ContentGroup, MainGroup, Accordion, PageTitle, TitleH2 } from "../styled/globalStyles"
import { useDataContext } from "../providers/dataContext";

//---------------------------------------------------------

const EditDiary = () => {

  const { user, anyChange, checkToken } = useUserContext();
  const { items, setItems } = useDataContext();

  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState(false);

  let location = useLocation();
  const navigate = useNavigate();

  if (!user)
    navigate('/login')

  useEffect(() => {
    checkToken();
  }, [location, anyChange])

  const handleClick = () => {
    console.log("test1")
    setEdit(!edit);
    // editItem()
  }

  const checkData = (el) => {

    const hilfsArr = [];
    el.itemList.map(e => {
      if (e.selected) {
        console.log("e: ..............", e, "\n", e.selected)
        // setCheck(true);
        hilfsArr.push(e)
        //.filter
        // return ([]);
      }
      // setCheck(false)
      return (false);
    })
  }



  let test;
  // console.log("edit: ", edit)

  // console.log(items)
  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <Group>

          <PageTitle>Hier kannst Du neue Daten eingeben</PageTitle>

          {
            items.map((e, i) => (
              
                e.itemList.filter(e => e.selected == true).length > 0 &&
                  <Items key={e.id} >

                    <StAccordion visible={checkData(e)} onClick={handleClick}>
                      {e.name}

                    </StAccordion>
                    {edit ?
                      <div>
                        {/* <StDiv visible={checkData(e)}> */}
                        <StDiv>
                          <GetData id={e.id} ></GetData>
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
  /* display: ${props => (props.visible ? 'flex' : 'none')}; */
  border-radius: 1.5rem;
  border-color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.col30};
  &:hover {
    background-color: ${(props) => props.theme.colors.col30};
    color: black;
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
  box-shadow: none;
  background-color:  ${props => (props.visible ? '#a2a2fa' : '#dd1d1d')};
  
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

const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`


const Item = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1.15rem;
  /* &:hover {
    color: ${(props) => props.theme.colors.col21};
    font-weight: 700;
    cursor: pointer;
  } */
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