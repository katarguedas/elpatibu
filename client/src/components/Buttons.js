
import styled from 'styled-components';
//---------------------------------------------------------



//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const Button = styled.button`
  background-color: #fff;
  font-size: 1.0rem;
  font-weight: 600;
  border-radius: 0.25rem;
  border: none;
  width: 9.0rem;
  height: 2.0rem;
  margin: 0.25rem;
  align-content: center;
  /* color: ${(props) => props.theme.colors.col11}; */
`
//................................
const AuthButton = styled(Button)`
  border: 2.0px solid ${(props) => props.theme.colors.col10};
  &:hover{
    background-color: ${(props) => props.theme.colors.col20};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col21};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`

//................................
const SendButton = styled(Button)`
  margin-top: 1.5rem;
  border: 2.0px solid ${(props) => props.theme.colors.col10}; 
  border-radius: 0.25rem;
  &:hover{
    background-color: ${(props) => props.theme.colors.col20};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.col21};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col11};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`
//................................
const NavButton = styled.button`
  width: 7.0rem;
  height: 7.0rem;
  margin: 1.0rem;
  margin-left: 2.5rem;
  border: 2.5px solid ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
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
//................................
const DiaryButton = styled.button`
  width: 10.0rem;
  height: 7.0rem;
  margin: 1.0rem 1.0rem 1.0rem 3.0rem;
  border: 2.5px solid ${(props) => props.theme.colors.col23};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.col11};
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
  border: 2.5px solid ${(props) => props.theme.colors.col13};
  background-color: ${(props) => props.theme.colors.col33};
  &:hover{
    background-color: ${(props) => props.theme.colors.col23};
    border-color: ${(props) => props.theme.colors.col21};
    /* color: ${(props) => props.theme.colors.col12};; */
  }
  :active{
    background-color: ${(props) => props.theme.colors.col14};
    color: black;
    transform: translateY(2.0px);
  }
`

export {Button, AuthButton, SendButton, NavButton, DiaryButton} ;