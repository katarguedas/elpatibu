import Header from "../Header"
import Footer from '../Footer'
import Intro from '../Intro'

import React from "react"

// import styled from "styled-component"
import { StyledContentGroup } from '../../styled/globalStyles'

//---------------------------------------------------------

const LandingPage = () => {

	return (
		<StyledContentGroup>
			<Header />
			<Intro />
			<Footer />
		</StyledContentGroup>
	)
}

export default LandingPage


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


