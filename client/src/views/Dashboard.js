import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import React from "react"

import styled from "styled-components"
import { ContentGroup, MainGroup, PageTitle, TitleH2 } from "../styled/globalStyles"
import { fullDate } from "../components/Date"
import { useUserContext } from "../providers/userContext"

//---------------------------------------------------------

const Dashboard = () => {

    const { userData } = useUserContext();

    console.log("userData", userData)
    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <DashboardGroup>
                    <PageTitle>Hallo {userData},</PageTitle>
                    <StFullDay>
                        Heute ist {fullDate()}.
                    </StFullDay>
                    <TitleH2>
                        Deine kommenden Termine
                    </TitleH2>
                    <Item/>
                    <TitleH2>
                        und Erinnerungen:
                    </TitleH2>
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
`
const StFullDay = styled.div`
  font-size: 1.5rem;
  justify-content: flex-end;
  position: relative;
  left: 45%;
  /* top: 40%; */
`

const Item = styled.div`
  font-size: 1.5rem;
`
