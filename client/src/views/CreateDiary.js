import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SwitchToggle from '../components/SwitchToggle';
import Panel from '../components/Panel';
import { FormField } from '../styled/globalStyles';
import { SendButton } from '../styled/Buttons';
import { StBiDownArrow, StBiRightArrow } from '../styled/Icons';
import { BiSquare, BiCheckSquare } from 'react-icons/bi';
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2, StP, Accordion } from '../styled/globalStyles';

import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { theme } from '../themes/theme';

/********************************************************************************
 * Component for creating the individual diary
 * 
 * Uses diaryTemplate from the hook 'useTemplates'
 *****************************************************/

const CreateDiary = () => {

  const { diaryTemplate, setDiaryTemplate, setDiary, createNewDiary, diarySaved, diaryInit, demo } = useDataContext();
  const { user, userData, checkToken, diaryIdSaved } = useUserContext();

  const [on, setOn] = useState();
  const [created, setCreated] = useState(false);
  const [done, setDone] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [missingCity, setMissingCity] = useState(false);
  const [demoText, setDemoText] = useState();

  let location = useLocation();
  const navigate = useNavigate();

  /********************************************************************************
   * UseEffects
   *****************/

  useEffect(() => {
    if ((user) && (!userData))
      checkToken();
    if (!user)
      navigate('/login');
    setDiaryTemplate(diaryInit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //.....................

  useEffect(() => {
    if (!user)
      navigate('/login');
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  //.....................

  useEffect(() => {
    if ((diaryIdSaved) && (diarySaved)) {
      const tempDiary = diaryTemplate;
      setDiary(tempDiary);
      setDiaryTemplate('');
      setCreated(true);
      setDone(true);
      timing();
    }
  }, [diaryIdSaved, diarySaved, setDiaryTemplate, setDiary])

  //.....................
  //........................

  const timing = () => {
    setTimeout(() => { setCreated(false) }, 2000)
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
    // console.log("check,", check)
    // console.log("Length of city:", diaryTemplate.city.length)

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
        createNewDiary(diaryTemplate.id);
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
    <ContentGroup>
      <Header />
      <MainGroup>
        <NavBar />
        <MainContent>
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
              <FormField onSubmit={handleSubmit} >
                <input
                  style={{
                    marginLeft: '1.5rem',
                    width: '200px',
                    height: '1.75rem'
                  }}
                  onChange={(e) =>
                    setDiaryTemplate({ ...diaryTemplate, diaryName: e.target.value })}
                />
              </FormField>
            </div>
          }
          {
            (missingCity === true) &&
            <p style={{ fontWeight: '500' }} >Du hast Werte für Wetterfühligkeit ausgewählt.
              Dafür benötige ich Deinen Wohnort. </p>
          }
          {
            (created === false) &&
            (done === false) &&
            <SendButton onClick={handleSendAndCreate} >erstellen</SendButton>
          }
          {
            demo &&
            <p style={{ fontWeight: '500', fontSize: '1.1rem' }} >{demoText}</p>
          }
          {created &&
            <p style={{ fontWeight: '500' }} >Tagebuch erfolgreich erstellt!</p>
          }
          {(created === false) &&
            done &&
            <SendButton onClick={navToDiary} >zum Tagebuch</SendButton>
          }

        </MainContent>
      </MainGroup>
      <Footer />
    </ContentGroup >
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