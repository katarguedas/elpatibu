
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
  border: 2.0px solid ${(props) => props.theme.colors.col2};
  &:hover{
    background-color: ${(props) => props.theme.colors.col3};
    color: white;
    border: 2.5px solid ${(props) => props.theme.colors.white};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col2};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
`

//................................
const SendButton = styled(Button)`
  margin-top: 1.5rem;
  border: 2.0px solid ${(props) => props.theme.colors.white}; 
  background-color:  ${(props) => props.theme.colors.col5};
  border-radius: 0.15rem;
  padding: 0.5rem 0 1.5rem 0;
  text-justify : center;
  font-size: 1.05rem;
  color: white;
  &:hover{
    background-color: ${(props) => props.theme.colors.col3};
    color: white;
    border: 2.0px solid ${(props) => props.theme.colors.white};
  };
  &:active{
    background-color: ${(props) => props.theme.colors.col2};
    transform: translateY(1.5px);
  }
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
  margin-bottom: 1.0rem;
`
//................................
const NavButton = styled.button`
  width: 7.5rem;
  height: 7.5rem;
  margin: 1.0rem;
  margin-left: 2.5rem;
  border: 2.5px solid ${(props) => props.theme.colors.white};
  border-radius: 0.25rem;
  background-color: #fff;
  &:hover{
    background-color: ${(props) => props.theme.colors.col1};
    border: 2.5px solid ${(props) => props.theme.colors.white};
  }
  :active{
    background-color: ${(props) => props.theme.colors.col20};
    border-color: ${(props) => props.theme.colors.col34};
    transform: translateY(1.5px);
  }
  font-size: 1.0rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;


  @media (max-width: 1200px) {
    width: 6.0rem;
    height: 6.0rem;
  }
  @media (max-width: 800px) {
    width: 5.0rem;
    height: 5.0rem;
    font-size: 0.725rem;
    font-weight: 500;
  }
`
//................................
const DiaryButton = styled.button`
  width: 10.0rem;
  height: 7.0rem;
  margin: 1.0rem 1.0rem 1.0rem 2.0rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.col3};
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
  border: 2.5px solid ${(props) => props.theme.colors.col2};
  background-color: ${(props) => props.theme.colors.col4};
  &:hover{
    background-color: ${(props) => props.theme.colors.col1};
    border-color: ${(props) => props.theme.colors.white};
    /* color: ${(props) => props.theme.colors.col12};; */
  }
  :active{
    background-color: ${(props) => props.theme.colors.col1};
    color: black;
    transform: translateY(2.0px);
  }
`
//.................................................................

const WeatherButton = styled.button`
  display: flex;
  justify-content: center;
  width: 15.0rem;
  height: 3.0rem;
  font-size: 1.15rem;
  border: 2px solid ${(props) => props.theme.colors.col1};
  background-color: ${(props) => props.theme.colors.col1};
  box-shadow: rgba(0, 0, 0, 0.25) 3.4px 3.4px 4.2px;
  /* color: #fff; */
  border-radius: 0.5rem;
  /* margin-left: auto;
  margin-left: auto; */
  &:hover{
    background-color: ${(props) => props.theme.colors.col5};
    border: 2px solid ${(props) => props.theme.colors.col5};
    color: #000;
  }
  :active{
    transform: translateY(1.5px);
  }
  padding: 0.75rem;
  margin: 2.0rem;
`



export {Button, AuthButton, SendButton, NavButton, DiaryButton, WeatherButton} ;