import Header from "../components/Header"
import Footer from '../components/Footer'
import LoginForm from "../components/forms/LoginForm"
import { useUserContext } from "../providers/userContext"

import { useEffect, useState } from "react"

import styled from "styled-components"
import { ContentGroup, PageTitle } from "../styled/globalStyles"
import { useNavigate } from "react-router"
import { AuthButton } from "../styled/Buttons"

/******************************************************
 * LOGIN Component
 * @returns 
 ******************/

const Login = () => {

	const { loginData, setLoginData, verifyUser, user } = useUserContext();
	const [type, setType] = useState("password");

	const navigate = useNavigate();

	//............................................

	const clearState = () => setLoginData("")

	//............................................

	const handleChange = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault();
		verifyUser()
		console.log("user?", user)
		clearState()
	}

	const handleMouseEnter = (e) => {
		e.preventDefault()
		setType("text")
	}

	const handleMouseLeave = (e) => {
		e.preventDefault()
		setType("password")
	}

	const handleClick = () => {
		navigate('/register')
	}
	//............................................
	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user, navigate])

	
	//............................................

	return (
		<ContentGroup>
			<Header />
			<PageTitle>Anmelden</PageTitle>
			<LoginGroup >
				<LoginForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleMouseEnter={handleMouseEnter}
					handleMouseLeave={handleMouseLeave}
					type={type}
				/>
				<div style={{ marginBottom: '3.0rem' }} >
					Du hast noch kein Konto?
					<br></br>
					Hier geht es zur Registrierung
					<br></br>
					<AuthButton onClick={handleClick} >
						Registrieren
					</AuthButton>
				</div>
			</LoginGroup>
			<Footer />
		</ContentGroup>
	)
}

export default Login;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const LoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px; 
  margin-left: auto; 
  margin-right: auto;
  margin-top: 6.0rem;
`