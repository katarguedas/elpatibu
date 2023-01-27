import Header from "../components/Header"
import Footer from '../components/Footer'
import Intro from '../components/Intro'

import React from "react"

// import styled from "styled-component"
import { ContentGroup } from "../styled/globalStyles"

//---------------------------------------------------------

const LandingPage = () => {

	return (
		<ContentGroup>
			<Header />
			<Intro />
			<Footer />
		</ContentGroup>
	)
}

export default LandingPage


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


