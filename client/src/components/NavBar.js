import { NavButton } from './Buttons';
import Date from './Date';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { RxHome } from "react-icons/rx";

import styled from 'styled-components';

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
            <NavButton onClick={handleClickOpenDiary} >zum Tagebuch</NavButton>
            <NavButton onClick={handleClickCreateDiary} >neues Tagebuch</NavButton>
            <NavButton onClick={handleClickCalendar} >zum Kalender</NavButton>
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
  border-right: 2.5px solid #A8D93C;
  width: 20%;
`

const HomeIcon = styled(RxHome)`
  padding: 0.5rem;
  margin: 1.5rem;
  border-radius: 0.5rem;
  font-size: 2.0rem;
  color: #745805;
  background-color: #A8D93C;
  &:hover{
    border: 2px solid #BC1B1A;
  }
`

const DateBox = styled.div`
  padding: 0.25rem;
  margin: 1.0rem;
  font-weight: 600;

`