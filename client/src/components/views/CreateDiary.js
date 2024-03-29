import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import SwitchToggle from '../SwitchToggle';
import Panel from '../Panel';
import { StyledFormField } from '../../styled/globalStyles';
import { SendButton } from '../../styled/Buttons';
import { StBiDownArrow, StBiRightArrow } from '../../styled/Icons';
import { BiSquare, BiCheckSquare } from 'react-icons/bi';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle, TitleH2, StP, Accordion } from '../../styled/globalStyles';

import { useDataContext } from '../../providers/dataContext';

import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../../store/authActions';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

/********************************************************************************
 * Component for creating the individual diary
 * 
 * Uses diaryTemplate from the hook 'useTemplates'
 *****************************************************/

const CreateDiary = () => {

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const loginStatus = useSelector(state => state.auth.loginStatus);


  const { diaryTemplate, setDiaryTemplate, setDiary, createNewDiary, diarySaved, diaryInit, demo } = useDataContext();
  const [on, setOn] = useState();
  const [created, setCreated] = useState(false);
  const [done, setDone] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [missingCity, setMissingCity] = useState(false);
  const [demoText, setDemoText] = useState();

  const navigate = useNavigate();

  /********************************************************************************
   * UseEffects
   *****************/

  useEffect(() => {
    dispatch(checkToken());
    setDiaryTemplate(diaryInit)
}, [dispatch])


useEffect(() => {
  if (!loginStatus) {
    navigate('/login');
  }
}, [loginStatus, dispatch, navigate])

  //.....................


  useEffect(() => {
    if ((userData.diaryId) && (created)) {
      const tempDiary = diaryTemplate;
      setDiary(tempDiary);
      setDiaryTemplate('');
      setDone(true);
      timing();
    }
  }, [created, setDiaryTemplate, setDiary])

  //.....................
  //........................

  const timing = () => {
    setTimeout(() => {
      setCreated(false);
      // setDone(false);
    }, 2500)
  }

  //.....................

  const navToDiary = () => { navigate('/EditDiary') }

  /************************************************************************************
   * if toggle is on, all groups will be open and all selectable values are visible and selectable.
   *************/

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

  /*********************************************************************
   * if the state 'selectAll' ist true, all values will be selected.
   * Otherwise all values will be deselected.
   *********************************************/

  useEffect(() => {
    if (diaryTemplate) {
      if (selectAll === false) {
        setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map(e => {
          e.items.map(el => {
            el.selected = true;
            return el;
          })
          return e;
        }))
      } else if (selectAll === true) {
        setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map(e => {
          e.items.map(el => {
            el.selected = false;
            return el;
          })
          return e;
        }))
      }
    }
  }, [selectAll, setDiaryTemplate])

  //............................................

  const handleClick = (id) => {
    // einzelne Gruppen einblenden/ausblenden
    setDiaryTemplate({ ...diaryTemplate }, diaryTemplate.groups.map(e => {
      if (e.id === id)
        e.visible = !e.visible;
      return e;
    }))
  }

  /*******************************************
   * Selection of individual values
   */

  const handleSelect = (groupId, itemId) => {
    const indexG = diaryTemplate.groups.findIndex((e) => e.id === groupId);
    const indexI = diaryTemplate.groups[indexG].items.findIndex((e) =>
      e.id === itemId);

    setDiaryTemplate(
      { ...diaryTemplate }, diaryTemplate.groups[indexG].items[indexI].selected = !diaryTemplate.groups[indexG].items[indexI].selected
    )
  }

  /*******************************************************************************
   * if the current group is 'meteorosensitivity',  set 'check = true' to be able to check if user has put a city name.
   * 
   * @returns true or false, depending on the selection value of the diaryGroup
   */

  const checkMeteo = () => {
    let check = false;
    const index = diaryTemplate.groups.findIndex(e => e.name === 'meteorosensitivity')
    if (index) {
      diaryTemplate.groups[index].items.map(e => {
        if (e.selected)
          check = true;
        return e;
      })
    }
  
    if ((check === true) && (diaryTemplate.city.length > 0))
      return true
    else if ((check === true) && (diaryTemplate.city.length === 0))
      return false
    else
      return true
  }

  /************************************************************************
   * 
   * Calls 'createNewDiary' from useData-Hook to save the diary in backend
   */

  const handleSendAndCreate = () => {
    if (!demo) {
      if (checkMeteo() === true) {
        setMissingCity(false)
        createNewDiary(diaryTemplate.id, setCreated);
      }
      else {
        setMissingCity(true)
      }
    } else {
      setDemoText('In der Demo-Version kannst Du kein Tagebuch anlegen.')
    }
  }

  //.............................

  const handleSubmit = e => {
    e.preventDefault();
  }

  //************************************************************************

  return (
    <StyledContentGroup>
      <Header />
      <StyledMainGroup>
        <NavBar />
        <StyledMainContent>
          <PageTitle>Neues Tagebuch</PageTitle>
          <TitleH2>
            Erstelle Dein individuelles Patienten-Tagebuch
          </TitleH2>
          {
            diaryTemplate &&
            <StP>Wähle nun aus den nachfolgenden Optionen die Werte aus, die Du dokumentieren möchtest. </StP>
          }
          {
            diaryTemplate &&
            <SwitchGroup>
              <SwitchToggle
                isOn={on}
                handleToggle={() => setOn(!on)}
              />
              <SwitchText>
                alle aufklappen
              </SwitchText>
            </SwitchGroup>
          }
          {
            (!done) &&
            (selectAll === false) &&
            <div style={{ display: 'inline-flex' }}  >
              <StBiCheckSquare onClick={() => setSelectAll(!selectAll)} />
              <p>alle auswählen</p>
            </div>
          }
          {
            (!done) &&
            (selectAll === true) &&
            <div style={{ display: 'inline-flex' }} >
              <StBiSquare onClick={() => setSelectAll(!selectAll)} />
              <p>alle auswählen</p>
            </div>
          }
          {
            diaryTemplate &&
            diaryTemplate.groups.map(e => (
              <ItemGroup key={e.id} >
                <Accordion
                  visible={e.visible}
                  onClick={() => handleClick(e.id)}
                >
                  {!e.visible && <StBiRightArrow></StBiRightArrow>}
                  {e.visible && <StBiDownArrow></StBiDownArrow>}

                  {e.label}
                </Accordion>

                <Panel itemGroup={e} handleSelect={handleSelect} />
              </ItemGroup >
            ))
          }
          {
            (done === false) &&
            <div>
              <StP> Gebe Deinem Tagebuch bitte einen Namen: </StP>
              <StyledFormField onSubmit={handleSubmit} >
                <StyledDiaryNameInput
                  onChange={(e) =>
                    setDiaryTemplate({ ...diaryTemplate, diaryName: e.target.value })}
                />
              </StyledFormField>
            </div>
          }
          {
            (missingCity === true) &&
            <p style={{ fontWeight: '500' }} >Du hast Werte für Wetterfühligkeit ausgewählt.
              Dafür benötige ich Deinen Wohnort. </p>
          }
          {
            !created &&
            !done &&
            <SendButton onClick={handleSendAndCreate} >erstellen</SendButton>
          }
          {
            demo &&
            <p style={{ fontWeight: '500', fontSize: '1.1rem' }} >{demoText}</p>
          }
          {created &&
            <p style={{ fontWeight: '500' }} >Tagebuch erfolgreich erstellt!</p>
          }
          {!created &&
            done &&
            <SendButton onClick={navToDiary} >zum Tagebuch</SendButton>
          }

        </StyledMainContent>
      </StyledMainGroup>
      <Footer />
    </StyledContentGroup >
  )
}


export default CreateDiary;


/****************************************************************
 *  Styled-components
 ****************************************************************/


const SwitchText = styled.span`
padding: 0.5rem; 
margin-bottom: -0.45rem; 
font-weight: 500;
`
const SwitchGroup = styled.div`
  display: inline-flex; 
  align-items: center;
`

const ItemGroup = styled.div`

`

const StBiSquare = styled(BiSquare)`
  font-size: 1.5rem;
  margin: 0.5rem 0.5rem 0.5rem 2.5rem;
`

const StBiCheckSquare = styled(BiCheckSquare)`
  font-size: 1.5rem;
  margin: 0.5rem 0.5rem 0.5rem 2.5rem;
`

const StyledDiaryNameInput = styled.input`
  margin-left: 1.5rem;
  width: 200px;
  height: 1.75rem;
`

