import Header from "../Header"
import Footer from '../Footer'
import Intro from '../Intro'

import React from "react"

// import styled from "styled-component"
import {ContentGroup} from '../../styled/globalStyles'

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


