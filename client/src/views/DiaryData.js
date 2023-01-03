import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { useLocation, useNavigate } from "react-router-dom";

import { ContentGroup, MainGroup } from "../styled/globalStyles"
import { useUserContext } from "../providers/userContext"
import { useEffect } from "react"

//---------------------------------------------------------

const DiaryData = () => {

    const {user, anyChange, setAnyChange, checkToken} = useUserContext()

    let location = useLocation();
    const navigate = useNavigate();

    if (!user)
    navigate('/login')

    useEffect(() => {
        setAnyChange(!anyChange)
    }, [])
    
    
    useEffect(() => {
        checkToken();
    }, [location, anyChange])

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default DiaryData;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

