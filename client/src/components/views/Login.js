import Header from "../Header"
import Footer from '../Footer';
import { SendButton } from "../../styled/Buttons";

import Input from '../forms/Input';

import { RxEyeOpen } from "react-icons/rx";
import { StyledLabelText, StyledFormField } from "../../styled/globalStyles";


import { useEffect, useState } from "react"

import styled from "styled-components"
import { StyledContentGroup, PageTitle } from "../../styled/globalStyles"
import { useNavigate } from "react-router"
import { AuthButton } from "../../styled/Buttons";

import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../store/authActions';
import { fetchEvents } from '../../store/eventsActions';

/******************************************************
 * LOGIN Component
 * @returns 
 ******************/

const Login = () => {

	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);
	const loginStatus = useSelector(state => state.auth.loginStatus);
	const [type, setType] = useState("password");
	const [loginData, setLoginData] = useState(
		{
			email: "",
			pwd: ""
		}
	)

	const navigate = useNavigate();

	//............................................

  useEffect(() => {
    if (loginStatus) {
      navigate('/dashboard');
    }
  }, [loginStatus, navigate])


	const clearState = () => setLoginData("");

	const handleChange = e => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(verifyUser(loginData));
		clearState();
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
		if (userData.id !=='') {
			dispatch(fetchEvents(userData.id))
			navigate('/dashboard')
		}
	}, [navigate, dispatch, userData.id])


	//............................................

	return (
		<StyledContentGroup>
			<Header />
			<PageTitle>Anmelden</PageTitle>
			<LoginGroup >
				<StyledFormField onSubmit={handleSubmit}>
					<InputLabel >
						<StyledLabelText>E-Mail:</StyledLabelText>
						<Input
							type="text"
							name={'email'}
							required
							value={loginData.email || ''}
							onChange={handleChange}
						/>
					</InputLabel>
					<InputLabel  >
						<StyledLabelText>Passwort:</StyledLabelText>
						<Input
							type={type}
							name={'pwd'}
							required
							value={loginData.pwd || ''}
							onChange={handleChange}
						/>
						<EyeGroup
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<RxEyeOpen style={{ fontSize: '20px' }} />
						</EyeGroup>
					</InputLabel>
					<SendButton type="submit">senden</SendButton>
				</StyledFormField>

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
		</StyledContentGroup>
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

const InputLabel = styled.label`
  display: inline-flex;
  margin: 0.75rem 0.25rem;
`

const EyeGroup = styled.div`
  margin-left: -20px;
  margin-top: 3px;
`