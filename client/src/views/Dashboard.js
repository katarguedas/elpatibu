import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { SendButton } from "../components/Buttons";
import { fullDate } from "../components/Date"
import { useUserContext } from "../providers/userContext"
import { useDataContext } from "../providers/dataContext"
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2 } from "../styled/globalStyles"

import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";
import { DateTime } from "luxon";

//---------------------------------------------------------

const Dashboard = () => {

    const { user, userData, checkToken, getEventsFromBackend, events } = useUserContext();
    const { getDiaryFromBackend, diary, getWeatherData } = useDataContext();

    const [rating, setRating] = useState();

    let location = useLocation();
    const navigate = useNavigate();

    // console.log("USER?", user)
    // console.log("USERDATA?", userData)
    // console.log("DIARY?", diary)

    //........................

    useEffect(() => {
        checkToken();
    }, [location])

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
                // console.log("Diary:", diary)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {

        if (!events)
            getEventsFromBackend(userData.id);

    }, [])

    useEffect(() => {

        if (events) {
            const today = DateTime.local(fullDate());
            console.log(today.ts)
            const next = events.map(e => {
                if (DateTime.fromISO(e.start).ts > today.ts) {
                    console.log("datum",e.start)
                    return (e.start)
                }
            })
            console.log(next)
        }
    }, [events])
    //........................

    const handleStart = () => {
        navigate('/CreateDiary')
    }

    const handleWeather = () => {
        const city = diary.city;
        const startDate = '2022-12-01';
        const endDate = '2022-12-31';

        getWeatherData(city, startDate, endDate);
    }

    useEffect(() => {
        // const tsToday = 
    }, [])


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


const StFullDay = styled.div`
  justify-content: flex-end;
  text-align: right;
  font-size: 1.25rem;
  margin-top: 1.0rem;
`

const Item = styled.div`
  font-size: 1.5rem;
`
