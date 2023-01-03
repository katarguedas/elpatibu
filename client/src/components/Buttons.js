
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
  color: ${(props) => props.theme.colors.col11};
`
const LoginButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.col10};
  &:hover{
    background-color: ${(props) => props.theme.colors.col13};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col14};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const LogoutButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.col10};
  &:hover{
    background-color: ${(props) => props.theme.colors.col13};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col14};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const RegisterButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.col10};
  &:hover{
    background-color: ${(props) => props.theme.colors.col13};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col14};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


const SendButton = styled(Button)`
  border: 2.5px solid ${(props) => props.theme.colors.col10};
  margin-top: 1.5rem;
  &:hover{
    background-color: ${(props) => props.theme.colors.col13};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col14};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`

const NavButton = styled.button`
  width: 7.0rem;
  height: 7.0rem;
  margin: 1.0rem;
  margin-left: 2.5rem;
  border: 2.5px solid ${(props) => props.theme.colors.white};
  border-radius: 1.0rem;
  background-color: #fff;
  &:hover{
    background-color: ${(props) => props.theme.colors.col23};
    border: 2.5px solid ${(props) => props.theme.colors.col21};
  }
  :active{
    background-color: ${(props) => props.theme.colors.col20};
    border-color: ${(props) => props.theme.colors.col34};
    transform: translateY(1.5px);
  }
  font-size: 1.0rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`


export {Button, LoginButton, LogoutButton, RegisterButton, SendButton, NavButton} ;