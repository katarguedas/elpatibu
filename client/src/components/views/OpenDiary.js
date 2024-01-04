import Header from '../Header'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { DiaryButton } from '../../styled/Buttons';
import { StGiChart, StBiListPlus, StGiFountainPen } from '../../styled/Icons'
import { useDataContext } from '../../providers/dataContext';

import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

import styled from 'styled-components'
import { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle } from '../../styled/globalStyles'
import { useSelector } from 'react-redux';
import { checkToken } from '../../store/authActions';
import { useDispatch } from 'react-redux';

//---------------------------------------------------------

const OpenDiary = () => {

	const dispatch = useDispatch();
	const userData = useSelector(state => state.auth.userData);
	const loginStatus = useSelector(state => state.auth.loginStatus);

	const { diary, getDiaryFromBackend } = useDataContext();

	const navigate = useNavigate();

	//----------------------------
  useEffect(() => {
      dispatch(checkToken());
  }, [dispatch])


  useEffect(() => {
    if (!loginStatus) {
      navigate('/login');
    }
  }, [loginStatus, dispatch, navigate])


	useEffect(() => {
		if (userData !== '') {
			if (!diary) {
				if (userData.diaryId) {
					console.log('noch kein Diary da, schau nach, ob was im Backend ist')
					getDiaryFromBackend(userData.diaryId)
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}
	}, [])

	//------------------------------------------------------

	const handleEdit = () => {
		navigate('/EditDiary')
	}

	const handleShowResults = () => {
		navigate('/DiaryData')
	}

	const handleAddValues = () => {
		// ...
	}

	//-----------------------------

	return (
		<StyledContentGroup>
			<Header />
			<StyledMainGroup>
				<NavBar />
				<StyledMainContent>
					<PageTitle>Dein persönliches Patienten-Tagebuch</PageTitle>
					<ButtonField>
						<DiaryButton onClick={handleEdit}>
							<StGiFountainPen />Daten eintragen</DiaryButton>
						<DiaryButton onClick={handleShowResults}>
							<StGiChart />Ergebnisse sehen</DiaryButton>
						<DiaryButton
							onClick={handleAddValues}
							style={{ backgroundColor: '#e9e3e3', color: '#686767' }}
						>
							<StBiListPlus />Werte hinzufügen</DiaryButton>
					</ButtonField>
				</StyledMainContent>
			</StyledMainGroup>
			<Footer />
		</StyledContentGroup >
	)
}

export default OpenDiary;



/**********************************************
 * Styled-Components
 */



const ButtonField = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
`

