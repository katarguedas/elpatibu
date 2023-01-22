import { AuthButton } from "./Buttons";
import Logo from '../components/Logo'

import { useUserContext } from "../providers/userContext";

import React from "react"
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

//---------------------------------------------------------

const Header = () => {

    const { user, setUser, logout } = useUserContext();

    const navigate = useNavigate();

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
                        <Logo  />
                        <ButtonGroup>
                            <AuthButton onClick={hanadleLogout} >Abmelden</AuthButton>
                        </ButtonGroup>
                    </StyledHeader>
                    :
                    <StyledHeader>
                        <Logo  />
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

