import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import PlotVital from '../components/PlotVital';
import PlotMeteo from '../components/PlotMeteo';
import PlotWeight from '../components/PlotWeight';
import PlotSymptoms from '../components/PlotSymptoms';
import { setDateRange } from '../utils/testdata';
import { StBiDownArrow, StBiRightArrow } from '../styled/Icons';
import { ContentGroup, MainGroup, MainContent, Accordion, PageTitle } from '../styled/globalStyles';
import { useUserContext } from '../providers/userContext';
import { useDataContext } from '../providers/dataContext';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';


//---------------------------------------------------------

const DiaryData = () => {

  // Es sind noch nicht alle Gruppen hinterlegt, hier in 'DiaryData' werden noch weitere Plotaufrufe eingefügt

  const { userData, checkToken, getEventsFromBackend, LOCAL_STORAGE_EVENTS } = useUserContext();
  const { diary, setDiary, getDiaryFromBackend } = useDataContext();

  const [events, setEvents] = useState();
  const [edit, setEdit] = useState(false);

  const location = useLocation();


  //------------------

  useEffect(() => {
    checkToken();
  }, [location])


  useEffect(() => {
    if (diary) {
      setDiary({ ...diary }, diary.groups.map(e => {
        e.visible = false;
        console.log(e.visible)
        return e;
      }))
    }
  }, [])


  useEffect(() => {
    if (userData) {
      if (!diary) {
        if (userData.diaryId) {
          getDiaryFromBackend(userData.diaryId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    if (!eventsArray) {
      getEventsFromBackend(userData.id);
      eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    }
    setEvents(eventsArray)
  }, [])


/**
 * Changes between visible and invisible to show or hidden the results or the current group
 * @param {} id id of the current group
 */
  const handleClick = (id) => {
    setEdit(!edit);
    console.log('ID', id)
    setDiary({ ...diary }, diary.groups.map(e => {
      console.log(e.visible)
      if (e.id === id)
        e.visible = !e.visible;
      return e;
    }))
  }

  //----------------------------------------------


  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <MainContent>

          <PageTitle> Ergebnisse Deiner bisher eingetragenen Daten</PageTitle>
          {
            diary &&
            diary.groups.map((e, i) => (
              e.items.filter(e => e.selected === true).length > 0 &&
              <Items key={e.id} >

                {<DAccordion
                  visible={e.visible}
                  onClick={() => handleClick(diary.groups[i].id)}
                >
                  {
                    !e.visible && <StBiRightArrow />
                  }
                  {
                    e.visible && <StBiDownArrow />
                  }
                  {e.label}
                </DAccordion>}
                <ResultGroup >
                  {
                    e.visible === true &&
                    e.name === 'vital' &&
                    <PlotVital itemVital={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'weight' &&
                    <PlotWeight itemWeight={e} date={setDateRange()} />
                  }
                  {
                    e.visible &&
                    e.name === 'meteorosensitivity' &&
                    <PlotMeteo itemMeteo={e} date={setDateRange()} />
                  }
                  {
                    e.visible &&
                    e.name === 'symptoms' &&
                    <PlotSymptoms itemSymptoms={e} date={setDateRange()} />
                  }
                </ResultGroup>
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

const DAccordion = styled(Accordion)`
  background: linear-gradient(to left, #fff, #578F8C);
  color: white;
  &:hover {
  color: white;
  background: linear-gradient(to left  , #fff, ${(props) => props.theme.colors.col3});
}
`

const Items = styled.div`
  margin-bottom: 0;
`

const ResultGroup = styled.div`
  /* display: ${props => props.visible === true ? 'flex' : 'none'}; */
`