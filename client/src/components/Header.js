import { AuthButton } from "../styled/Buttons";
import Logo from '../components/Logo'

import React from "react"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../store/authActions';
import { authActions } from '../store/authSlice';

//---------------------------------------------------------

const Header = () => {

	const dispatch = useDispatch();
	const loginStatus = useSelector(state => state.auth.loginStatus);

	const navigate = useNavigate();

	const hanadleLogout = () => {
		logout(dispatch);
		dispatch(authActions.changeLoginStatus({loginStatus:false}));
		navigate('/welcome');
	}

	const handleLogin = () => {
		navigate('/login');
	}

	const handleRegister = () => {
		navigate('/register')
	}


	return (
		<HeaderGroup>
			{
				loginStatus ?
					<StyledHeader>
						<Logo />
						<ButtonGroup>
							<AuthButton onClick={hanadleLogout} >Abmelden</AuthButton>
						</ButtonGroup>
					</StyledHeader>
					:
					<StyledHeader>
						<Logo />
						<ButtonGroup>
							<AuthButton onClick={handleLogin} >Anmelden</AuthButton>
							<AuthButton onClick={handleRegister} >Registrieren</AuthButton>
						</ButtonGroup>
					</StyledHeader>
			}
		</HeaderGroup >
	)
}


export default Header


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const HeaderGroup = styled.div`
  position: fixed;
  top: 0;
  width: 90%;
  border-bottom: 3px solid ${(props) => props.theme.colors.col3};
  background-color: #fff;
  padding: 0.5rem;
  z-index: 2;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.25rem;
  align-items: center;
`

