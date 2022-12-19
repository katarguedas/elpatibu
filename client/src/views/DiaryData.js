import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { ContentGroup, MainGroup } from "../styled/globalStyles"

//---------------------------------------------------------

const DiaryData = () => {

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

