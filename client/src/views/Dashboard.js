import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

// import getWeatherData from '../hooks/useWeatherAPI'

import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components"
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2 } from "../styled/globalStyles"
import { fullDate } from "../components/Date"
import { useUserContext } from "../providers/userContext"
import { useDataContext } from "../providers/dataContext"
import { SendButton } from "../components/Buttons"

//---------------------------------------------------------

const Dashboard = () => {

    const [flag, setFlag] = useState(false);
    const { user, userData } = useUserContext();
    const { getDiaryFromBackend, diary, getWeatherData, weatherData } = useDataContext();

    let location = useLocation();
    const navigate = useNavigate();

    // console.log("USER?", user)
    // console.log("USERDATA?", userData)
    // console.log("DIARY?", diary)

    //........................

    console.log("userdata", userData)


    //........................

    useEffect(() => {

        if (userData) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //........................


    const handleStart = () => {
        navigate('/CreateDiary')
    }

  
    const handleWeather = () => {
        const city = 'Oberhausen';
        const startDate = '2022-12-05';
        const endDate = '2022-12-10';

        getWeatherData(city, startDate, endDate); 
    }

    useEffect(() => {
        console.log(weatherData)
    }, [weatherData])


    //........................



    if (user)
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
                                <div onClick={handleWeather}> Wetterdaten abrufen
                                </div>
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
