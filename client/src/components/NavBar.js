import { NavButton } from '../styled/Buttons';
import Date from '../utils/Date';

import { useNavigate } from 'react-router-dom';
import { RxHome } from "react-icons/rx";

import styled from 'styled-components';
import { StGiBook, StGiWhiteBook, StGiCalendar } from '../styled/Icons';

//---------------------------------------------------------

const NavBar = () => {

  const navigate = useNavigate();

  const handleClickDashboard = () => {
    navigate('/dashboard')
  }

  const handleClickOpenDiary = () => {
    navigate('/openDiary')
  }

  const handleClickCreateDiary = () => {
    navigate('/createDiary')
  }

  const handleClickCalendar = () => {
    navigate('/mycalendar')
  }

  return (
    <NavGroup>
      <ButtonGroup>
        <HomeIcon onClick={handleClickDashboard} />
        <NavButton onClick={handleClickOpenDiary} >zum Tagebuch<StGiBook /></NavButton>
        <NavButton onClick={handleClickCreateDiary} >neues Tagebuch<StGiWhiteBook /></NavButton>
        <NavButton onClick={handleClickCalendar} >zum Kalender<StGiCalendar /></NavButton>
        <DateBox>
          <Date />
        </DateBox>
      </ButtonGroup>
    </NavGroup>
  )
}


export default NavBar


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const NavGroup = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  background-color: #fff;
  border-right: 2.5px solid ${(props) => props.theme.colors.col3};
  width: 20%;
  background-image: linear-gradient(to right, #fff, ${(props) => props.theme.colors.col2});
`

const ButtonGroup = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
position: sticky;
top: 4.5rem;
`

const HomeIcon = styled(RxHome)`
  padding: 0.5rem;
  margin: 1.5rem;
  margin-left: 3.5rem;
  border: 2.0px solid ${(props) => props.theme.colors.white};
  border-radius: 0.2rem;
  font-size: 3.0rem;
  color: #000;
  background-color: #fff;
  &:hover{
    background-color: ${(props) => props.theme.colors.col1};
    border: 2.5px solid ${(props) => props.theme.colors.white};
  }
  
  :active{
    background-color: ${(props) => props.theme.colors.col1};
    transform: translateY(1.5px);
    border-color: #FFF4DE;
  }
  box-shadow: rgba(0, 0, 0, 0.25) 2.4px 2.4px 3.2px;
`

const DateBox = styled.div`
  padding: 0.25rem;
  margin: 1.0rem;
  font-weight: 600;
  font-size: 1.1rem;
`