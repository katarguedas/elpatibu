import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { Testdat } from "../components/Testdat"

import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components"
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2 } from "../styled/globalStyles"
import { fullDate } from "../components/Date"
import { useUserContext } from "../providers/userContext"
import TimeChart from "../components/charts/TimeChart"
import { useDataContext } from "../providers/dataContext"
import { SendButton } from "../components/Buttons"

//---------------------------------------------------------

const Dashboard = () => {

    const [flag, setFlag] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const { user, userData, checkToken } = useUserContext();
    const { getDiaryFromBackend, diary, tempData, setTempData, saveTemp, getTemp, tempResults, diaryTemplate } = useDataContext();

    let location = useLocation();
    const navigate = useNavigate();

    // console.log("USER?", user)
    // console.log("USERDATA?", userData)
    // console.log("DIARY?", diary)

    //........................


    console.log("userdata", userData)

    //........................

    useEffect(() => {

        if(userData)
        if (!diary) {
            if (userData.diaryId) {
                console.log("noch kein Diary da, schau nach, ob was im Backend ist")
                getDiaryFromBackend(userData.diaryId)
            }
            else
                console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
        }
        else {
            console.log("Diary:", diary)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //........................

    const res = Testdat()

    const xValues = res.date;
    const yValues = res.values;

    //........................

    useEffect(() => {
        setTempData({
            ...tempData, values: res[0], date: res[1]
        })
        setFlag(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //--------------------------
    const handleStart = () => {
        navigate('/CreateDiary')
    }

    const handleChange = () => {

        if (flag) {
            console.log("Temp speichern aufrufen")
            saveTemp(tempData);
        }
    }

    //........................

    const handleGetData = () => {
        console.log("hole Temperaturdaten")
        getTemp('300e46f7-8b37-40cc-bd17-48cd75b74981')
        // console.log("test",tempResults)
        setX(tempResults.date);
        setY(tempResults.values)
    }



    if(user)
    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <MainContent>
                    <StFullDay>
                        Heute ist {fullDate()}.
                    </StFullDay>
                    {userData &&
                        <PageTitle>Hallo {userData.name},</PageTitle>
                    }
                    {!userData?.diaryId ?
                        <div>Du hast noch kein Tagebuch angelegt. <br></br>Hier kannst du eins anlegen<br></br>
                            <SendButton onClick={handleStart} >Start</SendButton>
                        </div>

                        : <div>
                            <TitleH2>
                                Deine kommenden Termine
                            </TitleH2>
                            <Item />
                            <TitleH2>
                                und Erinnerungen:
                            </TitleH2>
                            <div onClick={handleChange} style={{ margin: '1.0rem', fontWeight: '600', padding: '3px', width: '90px', color: 'blue', border: '1px solid blue' }} >Speichere Daten</div>
                            <div onClick={handleGetData} style={{ margin: '1.0rem', fontWeight: '600', padding: '3px', width: '90px', color: 'blue', border: '1px solid blue' }} >hole Daten</div>
                            {x && <TimeChart xValues={x} yValues={y} />}
                        </div>
                    }
                </MainContent>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default Dashboard;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const DashboardGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0.75rem;
  width: 80%;
`
const StFullDay = styled.div`
  font-size: 1.25rem;
  justify-content: flex-end;
  text-align: right;
  margin-top: 1.0rem;
`

const Item = styled.div`
  font-size: 1.5rem;
`
