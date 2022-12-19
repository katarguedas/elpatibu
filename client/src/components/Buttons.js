
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
  border: 2.5px solid #A8D93C;
  &:hover{
    background-color: #F09F04;
  };
  &:active{
    background-color: #F1B505;
  }
`

const LogoutButton = styled(Button)`
  border: 2.5px solid #F1B505;
  &:hover{
    background-color: #F09F04;
  };
  &:active{
    background-color: #F1B505;
  }
  
`
const RegisterButton = styled(Button)`
  border: 2.5px solid #F09F04;
  &:hover{
    background-color: #F09F04;
  };
  &:active{
    background-color: #F1B505;
  }
`

const LoginSendButton = styled(Button)`
  border: 2.5px solid #A8D93C;
  margin-top: 1.5rem;
  &:hover{
    background-color: #F09F04;
  };
  &:active{
    background-color: #F1B505;
  }
`

const NavButton = styled.button`
  width: 7.0rem;
  height: 7.0rem;
  margin: 1.0rem;
  border: 2.5px solid #A8D93C;
  border-radius: 1.0rem;
  background-color: #fff;
  &:hover {
    background-color: #A8D93C;
    border-color: #BC1B1A;
  }
  font-size: 1.0rem;
  font-weight: 600;
`


export {Button, LoginButton, LogoutButton, RegisterButton, LoginSendButton, NavButton} ;