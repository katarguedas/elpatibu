import Header from "../components/Header"
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import LineChart from "../components/charts/LineChart"

import { ContentGroup, MainGroup } from "../styled/globalStyles"

//---------------------------------------------------------

const Test = () => {

    return (
        <ContentGroup>
            <Header />
            <MainGroup>
                <NavBar />
                <div>

<LineChart />
                </div>
            </MainGroup>
            <Footer />
        </ContentGroup>
    )
}

export default Test;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

