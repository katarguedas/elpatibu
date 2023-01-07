import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { Testdat } from "../components/Testdat"

import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle, TitleH2 } from "../styled/globalStyles"
import { fullDate } from "../components/Date"
import { useUserContext } from "../providers/userContext"
import TimeChart from "../components/charts/TimeChart"
import { useDataContext } from "../providers/dataContext"


//---------------------------------------------------------

const Dashboard = () => {

    const [flag, setFlag] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const { user, userData, anyChange, setAnyChange, checkToken } = useUserContext();
    const { tempData, setTempData, saveTemp, getTemp, tempResults } = useDataContext();

    let location = useLocation();
    const navigate = useNavigate();

    const res = Testdat()
    console.log("TestData", res)
    // console.log("\n", res[0], "\n", res[1])
    // console.log(res[0].label)
    // console.log(tempData.label)
    // console.log(tempData)
    const xValues = res.date;
    const yValues = res.values;

    if (!user)
      navigate('/login')

    useEffect(() => {
        setTempData({
            ...tempData, values: res[0], date: res[1]
        })
        setFlag(true)
        setAnyChange(!anyChange)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        checkToken();
    }, [location, anyChange])

    const handleChange = () => {

        if (flag) {
            console.log("Temp speichern aufrufen")
            saveTemp(tempData);
        }
    }

    const handleGetData = () => {
        console.log("hole Temperaturdaten")
        getTemp('300e46f7-8b37-40cc-bd17-48cd75b74981')
        // console.log("test",tempResults)
        setX(tempResults.date);
        setY(tempResults.values)
    }

    
    // console.log(tempData)
    console.log("tempResults",tempResults)

        return (
            <ContentGroup>
                <Header />
                <MainGroup>
                    <NavBar />
                    <DashboardGroup>
                        <StFullDay>
                            Heute ist {fullDate()}.
                        </StFullDay>
                        <PageTitle>Hallo {userData},</PageTitle>

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
                    </DashboardGroup>
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
