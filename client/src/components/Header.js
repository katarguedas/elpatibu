import { LoginButton, LogoutButton, RegisterButton } from "./Buttons";
import Logo from '../components/Logo'

import { useUserContext } from "../providers/userContext";

import React from "react"
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

//---------------------------------------------------------

const Header = () => {

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();
    console.log(user)

    const hanadleLogout = () => {
        // Logout();
        setUser(!user)
        navigate('/welcome')
    }

    return (
        <HeaderGroup>
            {
                user ?
                    <StyledHeader>
                        <Logo />
                        <LogoutButton onClick={hanadleLogout} >Abmelden</LogoutButton>
                    </StyledHeader>
                    :
                    <StyledHeader>
                        <Logo />
                        <ButtonGroup>
                            <LoginButton>Anmelden</LoginButton>
                            <RegisterButton>Registrieren</RegisterButton>
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

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.25rem;
`

const HeaderGroup = styled.div`
  border-bottom: 3px solid #BC1B1A;
  background-color: #fff;
  padding: 0.5rem;
`