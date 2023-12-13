import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import GetData from '../GetData';
import { todayDateTs } from '../../utils/Date';
import { useDataContext } from '../../providers/dataContext';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, Accordion, PageTitle } from '../../styled/globalStyles'
import { useUserContext } from '../../providers/userContext';

import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BiRightArrow, BiDownArrow } from 'react-icons/bi';
import { theme } from '../../themes/theme'
import styled from 'styled-components';

//---------------------------------------------------------

const EditDiary = () => {

  const { userData, checkToken } = useUserContext();
  const { getDiaryFromBackend } = useDataContext();
  const { diary } = useDataContext();

  const [editIndex, setEditIndex] = useState(null);

  let location = useLocation();


  //........................

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])


  useEffect(() => {
    if (userData) {
      if (!diary) {
        if (userData.diaryId) {
          console.log('noch kein Diary da, schau nach, ob was im Backend ist')
          getDiaryFromBackend(userData.diaryId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (index) => {
    setEditIndex(prev => {
      if (prev === index) {
        return null
      } else {
        return index
      }
    });
  }

  //!checkAllValuesToday(editedGroups(), diary)
  const today = todayDateTs();
  let diaryTsToday = 0;
  if (diary) {
    diaryTsToday = diary.timestamp[diary.timestamp.length - 1];
  }


  //..........................

  return (
    <StyledContentGroup>
      <Header />
      <StyledMainGroup>
        <NavBar />
        <StyledMainContent>
          <PageTitle>Hier kannst Du neue Daten eingeben</PageTitle>
          {
            diary &&
            diary.groups.map((e, i) => (
              e.items.filter(e => e.selected === true).length > 0 &&
              <div key={e.id} >

                <StyledEAccordion
                  visible={editIndex}
                  valuesExist={e.items.findIndex(item =>
                    (!(diaryTsToday === today)) ||
                      ((item.values.length === diary.timestamp.length) &&
                      (item.values[item.values.length - 1] === null)) ||
                    (item.values.length < diary.timestamp.length))}
                  onClick={() => handleClick(i)}
                >
                  {
                    editIndex !== null ? <StBiDownArrow /> : <StBiRightArrow />
                  }
                  {e.label}
                </StyledEAccordion>
                {editIndex !== null && i === editIndex &&
                  <StDiv>
                    <GetData
                      id={e.id}
                      index={i}
                    >
                    </GetData>
                  </StDiv>
                }
              </div>
            ))
          }
        </StyledMainContent>
      </StyledMainGroup>
      <Footer />
    </StyledContentGroup>
  )
}

export default EditDiary;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const StyledEAccordion = styled(Accordion)`
${(props) => {
    if (props.valuesExist === -1) {
      return `
      background: linear-gradient(to left, #fff, ${theme.colors.col1});
      color: ${theme.colors.col3};
      &:hover {
        color: white;
        background: linear-gradient(to left  , #fff, ${theme.colors.col3});
      }
      `
    } else {
      return `
      background: linear-gradient(to left, #fff, ${theme.colors.col5});
      color: white;
      &:hover {
        color: white;
        background: linear-gradient(to left  , #fff, ${theme.colors.col3});
        }
      `
    }
  }}
  `;

const StBiRightArrow = styled(BiRightArrow)`
font-size: 1.0rem;
margin-right: 0.5rem;
`;

const StBiDownArrow = styled(BiDownArrow)`
font-size: 1.0rem;
margin-right: 0.5rem;
`

const StDiv = styled.div`
flex-direction: column;
padding: 0.25rem 0.5rem 0.25rem 0.5rem;
margin: 1.25rem;
font-size: 1.15rem;
`