import Header from '../Header'
import Footer from '../Footer'
import RegisterForm from '../forms/RegisterForm'
import { StyledContentGroup, PageTitle } from '../../styled/globalStyles'
import { useUserContext } from '../../providers/userContext'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';

//---------------------------------------------------------

const Register = () => {

	const { registerData, setRegisterData, addUser, regMessage, flag, setFlag } = useUserContext();

	const [type, setType] = useState('password');

	const navigate = useNavigate();

	const clearState = () => setRegisterData('')

	const handleChange = e => {
		setRegisterData({
			...registerData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault();
		addUser();

		clearState()
	}

	const handleMouseEnter = (e) => {
		e.preventDefault()
		setType('text')
	}

	const handleMouseLeave = (e) => {
		e.preventDefault()
		setType('password')
	}

	useEffect(() => {
		if (flag === 0) {
			const timer = setTimeout(() => { navigate('/login') }, 3000);
			return () => {
				clearTimeout(timer)
				setFlag(999)
			};
		}
	}, [flag])

	//-----------------------------------------------------

	return (
		<StyledContentGroup>
			<Header />
			<PageTitle>Registrieren</PageTitle>
			<RegisterGroup>
				<RegisterForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleMouseEnter={handleMouseEnter}
					handleMouseLeave={handleMouseLeave}
					type={type}
				>
				</RegisterForm>

				{
					((flag === 0) || (flag === 1)) ?
						<Message>{regMessage}</Message>
						: null
				}
			</RegisterGroup>

			<Footer />
		</StyledContentGroup>
	)
}


export default Register;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const RegisterGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px; 
  margin-left: auto; 
  margin-right: auto;
  margin-top: 5.0rem;
`
const Message = styled.div`
  margin-bottom: 3.0rem;
  font-size: 1.15rem;
`