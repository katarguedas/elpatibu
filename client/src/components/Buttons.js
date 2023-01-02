
import styled from 'styled-components';
//---------------------------------------------------------



//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const Button = styled.button`
  background-color: #fff;
  font-size: 1.0rem;
  font-weight: 600;
  border-radius: 1.0rem;
  border: none;
  width: 9.0rem;
  height: 2.0rem;
  margin: 0.25rem;
  align-content: center;
`
const LoginButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.second};
  &:hover{
    background-color: ${(props) => props.theme.colors.fourth};
    border: 2.5px solid ${(props) => props.theme.colors.third};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.third};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const LogoutButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.second};
  &:hover{
    background-color: ${(props) => props.theme.colors.fourth};
    border: 2.5px solid ${(props) => props.theme.colors.third};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.third};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const RegisterButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.second};
  &:hover{
    background-color: ${(props) => props.theme.colors.fourth};
    border: 2.5px solid ${(props) => props.theme.colors.third};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.third};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const SendButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.second};
  margin-top: 1.5rem;
  &:hover{
    background-color: ${(props) => props.theme.colors.fourth};
    border: 2.5px solid ${(props) => props.theme.colors.third};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.third};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`

const NavButton = styled.button`
  width: 7.0rem;
  height: 7.0rem;
  margin: 1.0rem;
  border: 2.5px solid ${(props) => props.theme.colors.second};
  border-radius: 1.0rem;
  background-color: #fff;
  &:hover{
    background-color: ${(props) => props.theme.colors.fourth};
    border: 2.5px solid ${(props) => props.theme.colors.third};
  }
  :active{
    background-color: ${(props) => props.theme.colors.third};
    border-color: ${(props) => props.theme.colors.third};
    transform: translateY(1.5px);
  }
  font-size: 1.0rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


export {Button, LoginButton, LogoutButton, RegisterButton, SendButton, NavButton} ;