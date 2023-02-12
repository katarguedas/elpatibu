import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { SendButton } from '../styled/Buttons';
import { fullDate, todayDate } from '../utils/Date';
import { checkAllValuesToday } from '../utils/helperfunctions';
import { useUserContext } from '../providers/userContext';
import { useDataContext } from '../providers/dataContext';
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2 } from '../styled/globalStyles';

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { DateTime } from 'luxon';
import { theme } from '../themes/theme';


/*******************************************************
 * Dashboard-Component
 * 
 * Shows next events from calendar and 
 * informs whether values have already been saved today.
 */

const Dashboard = () => {

	const { user, userData, checkToken, getEventsFromBackend, nextEvents, LOCAL_STORAGE_EVENTS, getNextEvents } = useUserContext();
	const { getDiaryFromBackend, diary, editedGroups } = useDataContext();

	const [events, setEvents] = useState();
	const [done, setDone] = useState();

	let location = useLocation();
	const navigate = useNavigate();

	//........................

	useEffect(() => {
		checkToken();
	}, [location])

	/*******************************************************
	 * Checks if userData is available. 
	 * If yes, it fetches the diary from Backend.
	 */
	useEffect(() => {

		if (userData) {
			if (!diary) {
				if (userData.diaryId)
					getDiaryFromBackend(userData.diaryId)
			}
		}
	}, [])

	/*******************************************************
 * Checks of events data are available in local storage. 
 * If no, it fetches the events from Backend.
 */
	useEffect(() => {
		let eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
		if (!eventsArray) {
			getEventsFromBackend(userData.id);
			eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
		}
		setEvents(eventsArray)
		console.log("nextEvents:", nextEvents)
	}, [])


/***********************************
 * If events have changed, reprocess the nextEvents for Dashboard.
 */
	useEffect(() => {
		getNextEvents(events)
	}, [events])

/***********************************
 * If nextEvents exists,set done to true, 
 * this shows the nextEvents in Dashboard
 */
	useEffect(() => {
		if (nextEvents) {
			setDone(true);
		}
	}, [])

	//........................

	const handleStart = () => {
		navigate('/CreateDiary')
	}

	let str = ['37,1', '37.1', '37,8', '4', '4.2', '4,2' ];

	for(let i = 0; i<6; i++)
	{
		console.log(i)
		console.log("i = ", parseFloat(str[i].replace(',','.')));
	}

// console.log("Zahlen: ...........", parseFloat(37,1), parseFloat(37.1), parseFloat(5))
// parseFloat(str.replace(' ', '').replace('.', '').replace(',', '.'));

	// checkAllValuesToday(diary)

	const space = '	';
//------------------------------------------

	if (user)
		return (
			<ContentGroup>
				<Header />
				<MainGroup>
					<NavBar />
					<MainContent>
						<StFullDay>
							Heute ist {fullDate()}.
						</StFullDay>
						{userData &&
							<PageTitle style={{ color: theme.colors.col3 }} >
								Hallo {userData.name},
							</PageTitle>
						}
						{!userData?.diaryId ?
							<div>
								Du hast noch kein Tagebuch angelegt.
								<br></br>
								Hier kannst du eins anlegen
								<br></br>
								<SendButton onClick={handleStart} >Start</SendButton>
							</div>
							: <div>
								<TitleH2 style={{ marginTop: '2.5rem', color: theme.colors.col3 }} >
									{
										diary?.date &&
											diary?.date[diary.date.length - 1] === todayDate() ?
											// <p style={{ color: theme.colors.col2 }} >
											// 	Du hast heute bereits Daten eingetragen,
											// </p>
											
												!checkAllValuesToday(editedGroups(), diary) ?
												<p style={{ color: theme.colors.col2 }} >
												Du hast heute bereits Daten eingetragen, allerdings nicht alle.</p>
												: 
												<p>Du hast heute bereits alle Daten eingetragen.</p>
											:
											<p style={{ color: theme.colors.col5 }} >
												Du hast heute noch keine Daten eingetragen.
											</p>
									}
								</TitleH2>
								<TitleH2 style={{ color: theme.colors.col3, marginTop: '3.0rem' }} >
									Deine nächsten Termine
									{
										done &&
										nextEvents?.map(e => (
											<EventItem key={e.id} >
												<span>{e.title}:{space}</span>
												<span>{DateTime.fromISO(e.start).toLocaleString(DateTime.DATE_HUGE)}</span>
											</EventItem>
										))}
								</TitleH2>
								<Item />
								
							</div>
						}
					</MainContent>
				</MainGroup>
				<Footer />
			</ContentGroup>
		)
}

export default Dashboard;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const StFullDay = styled.div`
  justify-content: flex-end;
  text-align: right;
  font-size: 1.25rem;
  margin-top: 1.0rem;
`

const Item = styled.div`
  font-size: 1.5rem;
`

const EventItem = styled.div`
  display: flex;
	flex-direction: row;
	justify-content: space-between; 
	width: 27rem;
	margin-left: 3.0rem; 
	font-weight: 400; 
	font-size: 1.25rem;
`