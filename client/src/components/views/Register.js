import Header from '../Header';
import Footer from '../Footer';
import RegisterForm from '../forms/RegisterForm';
import { StyledContentGroup, PageTitle } from '../../styled/globalStyles';

import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/authActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';
import { authActions } from '../../store/authSlice';

//---------------------------------------------------------

const Register = () => {

	const dispatch = useDispatch();
	const registrationFlag = useSelector(state => state.auth.registrationMessage.flag);
	const regMessage = useSelector(state => state.auth.registrationMessage.message);

	const [type, setType] = useState('password');
	const [registerData, setRegisterData] = useState(
		{
			id: "",
			name: "",
			email: "",
			pwd: ""
		})

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
		dispatch(createUser(registerData));
		// addUser(registerData);

		clearState()
	}

	const handleMouseEnter = (e) => {
		e.preventDefault();
		setType('text');
	}

	const handleMouseLeave = (e) => {
		e.preventDefault();
		setType('password');
	}

	useEffect(() => {
		if (registrationFlag === 0) {
			const timer = setTimeout(() => { navigate('/login') }, 2500);
			return () => {
				clearTimeout(timer)
				dispatch(authActions.defineRegistrationMessage({index: 999}))
			};
		}
	}, [registrationFlag, dispatch, navigate])

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
					registerData={registerData}
					type={type}
				>
				</RegisterForm>

				{(registrationFlag === 0 || registrationFlag === 1) &&
					<Message>{regMessage}</Message>
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