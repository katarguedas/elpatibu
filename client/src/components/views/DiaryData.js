import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import PlotVital from '../plots/PlotVital';
import PlotMeteo from '../plots/PlotMeteo';
import PlotWeight from '../plots/PlotWeight';
import PlotSleep from '../plots/PlotSleep';
import PlotNMD from '../plots/PlotNMD';
import { StBiDownArrow, StBiRightArrow } from '../../styled/Icons';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, Accordion, PageTitle, StP } from '../../styled/globalStyles';
import { useDataContext } from '../../providers/dataContext';

import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../../store/authActions';



/*******************************************************************************
 * Shows data in charts calling 'Plot' Components.
 * @returns 
 *************************************************/
 
const DiaryData = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const { diary, setDiary, getDiaryFromBackend } = useDataContext();

  const [gast, setGast] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
      dispatch(checkToken());
  }, [dispatch])


  useEffect(() => {
    if (!loginStatus) {
      navigate('/login');
    }
  }, [loginStatus, dispatch, navigate])
  //............................

  useEffect(() => {

    if (userData.id !=='') {
      if (!diary || diary.id !== userData.diaryId) {
        if (userData.diaryId) {
          getDiaryFromBackend(userData.diaryId);
        }
      }
      if (diary) {
        setDiary({ ...diary }, diary.groups.map(e => {
          e.visible = false;
          return e;
        }))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //............................

  useEffect(() => {
    if (userData.id === 'gast@gast.de')
      setGast(true)
  }, [userData.id])


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
    <StyledContentGroup>
      <Header />
      <StyledMainGroup>
        <NavBar />
        <StyledMainContent>

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
              <div key={e.id} style={{marginLeft: '0', paddingLeft: '0'}}>

                <StyledDAccordion
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
                </StyledDAccordion>
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
              </div>
            ))
          }

        </StyledMainContent>
      </StyledMainGroup>
      <Footer />
    </StyledContentGroup>
  )
}

export default DiaryData;

/****************************************************************
 *  Styled-components
 ****************************************************************/


const StyledDAccordion = styled(Accordion)`
  background: linear-gradient(to left, #fff, #578F8C);
  color: white;
  &:hover {
  color: white;
  background: linear-gradient(to left  , #fff, ${(props) => props.theme.colors.col3});
}
`

const ResultGroup = styled.div`
  /* display: ${props => props.visible === true ? 'flex' : 'none'}; */
`