import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
// import TimeChartT from '../components/charts/TimeChartT'
// import TimeChartP2 from '../components/charts/TimeChartP2'
import { createPData } from '../utils/testdata'
import PlotVital from "../components/PlotVital"
import PlotMeteo from "../components/PlotMeteo"
import { StBiDownArrow, StBiRightArrow } from '../components/Icons'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { ContentGroup, MainGroup, MainContent, Accordion } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext"


import styled from "styled-components"
import { useDataContext } from "../providers/dataContext"

//---------------------------------------------------------

const DiaryData = () => {

  const { user, userData, checkToken } = useUserContext();
  const { diary, setDiary, getDiaryFromBackend } = useDataContext();

  const [edit, setEdit] = useState(false);
  // const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  //------------------

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
        console.log("Diary:", diary)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!user)
      navigate('/login')
  }, [location])


  const handleClick = (id) => {
    setEdit(!edit);
    console.log("ID", id)
    setDiary({ ...diary }, diary.groups.map(e => {
      console.log(e.visible)
      if (e.id === id)
        e.visible = false;
      return e;
    }))
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
              e.items.filter(e => e.selected === true).length > 0 &&
              <Items key={e.id} >

                {<Accordion visible={edit} onClick={() => handleClick(i)}>

                  {edit ?
                    <StBiDownArrow></StBiDownArrow>
                    :
                    <StBiRightArrow></StBiRightArrow>
                  }
                  {e.label}

                </Accordion>}

                < ResultGroup  >
                  {e.visible === true &&
                    e.name === 'vital' &&
                    <PlotVital itemVital={e} />
                  }
                  {e.visible &&
                    e.name === 'meteorosensitivity' &&
                    <PlotMeteo itemMeteo={e} />
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



const StDiv = styled.div` 
  flex-direction: column;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 1.25rem;
  font-size: 1.15rem;
`

const Items = styled.div`
  margin-bottom: 0;
`

const ResultGroup = styled.div`
  /* display: ${props => props.visible === true ? 'flex' : 'none'}; */
`