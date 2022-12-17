import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import { ContentGroup, Main } from "../styled/globalStyles"

//---------------------------------------------------------

const DiaryData = () => {

    return (
        <ContentGroup>
            <Header />
            <Main>
                <NavBar />
            </Main>
            <Footer />
        </ContentGroup>
    )
}

export default DiaryData;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

