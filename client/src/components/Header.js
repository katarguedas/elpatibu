import { LoginButton, LogoutButton, RegisterButton } from "./Buttons";
import Logo from '../components/Logo'

import { useUserContext } from "../providers/userContext";

import React from "react"
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

//---------------------------------------------------------

const Header = () => {

    const { user, setUser, logout } = useUserContext();

    const navigate = useNavigate();
    console.log(user)

    const hanadleLogout = () => {
        console.log("logout")
        logout();
        setUser(!user)
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
                user ?
                    <StyledHeader>
                        <Logo />
                        <ButtonGroup>
                            <LogoutButton onClick={hanadleLogout} >Abmelden</LogoutButton>
                        </ButtonGroup>
                    </StyledHeader>
                    :
                    <StyledHeader>
                        <Logo />
                        <ButtonGroup>
                            <LoginButton onClick={handleLogin} >Anmelden</LoginButton>
                            <RegisterButton onClick={handleRegister} >Registrieren</RegisterButton>
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
  border-bottom: 3px solid #BC1B1A;
  background-color: #fff;
  padding: 0.5rem;
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

