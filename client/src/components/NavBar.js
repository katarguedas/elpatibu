import { NavButton } from './Buttons';
import Date from './Date';

import { useNavigate } from 'react-router-dom';
import { RxHome } from "react-icons/rx";

import styled from 'styled-components';
import { StGiBook, StGiWhiteBook, StGiCalendar } from './Icons';

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
        navigate('/calendar')
    }

    return (
        <NavGroup>
            <HomeIcon onClick={handleClickDashboard} />
            <NavButton onClick={handleClickOpenDiary} >zum Tagebuch<StGiBook/></NavButton>
            <NavButton onClick={handleClickCreateDiary} >neues Tagebuch<StGiWhiteBook/></NavButton>
            <NavButton onClick={handleClickCalendar} >zum Kalender<StGiCalendar/></NavButton>
            <DateBox>
                <Date />
            </DateBox>
        </NavGroup>
    )
}


export default NavBar


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-right: 2.5px solid ${(props) => props.theme.colors.col10};
  width: 20%;
  background-image: linear-gradient(to right, #fff, ${(props) => props.theme.colors.col10});
`

const HomeIcon = styled(RxHome)`
  padding: 0.5rem;
  margin: 1.5rem;
  margin-left: 3.0rem;
  border: 2.0px solid ${(props) => props.theme.colors.white};
  border-radius: 0.5rem;
  font-size: 2.5rem;
  color: #000;
  background-color: #fff;
  &:hover{
    background-color: ${(props) => props.theme.colors.col23};
    border: 2.5px solid ${(props) => props.theme.colors.col21};
  }
  
  :active{
    background-color: ${(props) => props.theme.colors.col20};
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