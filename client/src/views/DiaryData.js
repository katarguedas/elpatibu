import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import PlotVital from '../components/PlotVital';
import PlotMeteo from '../components/PlotMeteo';
import PlotWeight from '../components/PlotWeight';
import PlotSleep from '../components/PlotSleep';
import PlotNMD from '../components/PlotNMD';
import { StBiDownArrow, StBiRightArrow } from '../styled/Icons';
import { ContentGroup, MainGroup, MainContent, Accordion, PageTitle, StP } from '../styled/globalStyles';
import { useUserContext } from '../providers/userContext';
import { useDataContext } from '../providers/dataContext';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';


/*******************************************************************************
 * Shows data in charts calling 'Plot' Components.
 * @returns 
 *************************************************/

const DiaryData = () => {

  const { userData, user, checkToken, getEventsFromBackend, LOCAL_STORAGE_EVENTS } = useUserContext();
  const { diary, setDiary, getDiaryFromBackend } = useDataContext();

  const [gast, setGast] = useState(false);

  const location = useLocation();

  /*******************************************************************
   * useEffects
   *****************/

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  //............................

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

  //............................


  useEffect(() => {
    if (diary) {
      setDiary({ ...diary }, diary.groups.map(e => {
        e.visible = false;
        // console.log(e.visible)
        return e;
      }))
    }
  }, [])

  //............................

  useEffect(() => {
    if (user === 'gast@gast.de')
      setGast(true)
  })
  //............................

  useEffect(() => {
    let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    if (!eventsArray) {
      getEventsFromBackend(userData.id);
      eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    }
    // setEvents(eventsArray)
  }, [])


  /************************************************************************************
   * Changes between visible and invisible to show or hidden the results of the current group
   * @param {} id id of the current group
   ***************************************/

  const handleClick = (id) => {
    setDiary({ ...diary }, diary.groups.map(e => {
      if (e.id === id)
        e.visible = !e.visible;
      return e;
    }))
  }



  //*************************************************************************** */

  return (
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <MainContent>

          <PageTitle> Ergebnisse Deiner bisher eingetragenen Daten</PageTitle>
          {
            diary?.timestamp?.length < 2 && !gast ?
              <StP>
                Um Ergebnisse sehen zu können, werden Daten für mindestens 2 Tage benötigt.<br />
                Gebe heute und morgen Daten ein, dann wirst Du morgen Deine ersten Ergebnisse sehen.
              </StP>
              : <p></p>
          }
          {
            diary && 
            (diary.timestamp?.length > 1) &&
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
                    <PlotWeight itemWeight={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'wellBeing' &&
                    <PlotNMD itemsGroup={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'mood' &&
                    <PlotNMD itemsGroup={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'sleep' &&
                    <PlotSleep itemSleep={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'meteorosensitivity' &&
                    <PlotMeteo itemMeteo={e} />
                  }
                  {
                    e.visible &&
                    e.name === 'symptoms' &&
                    <PlotNMD itemsGroup={e} />
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

/****************************************************************
 *  Styled-components
 ****************************************************************/


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