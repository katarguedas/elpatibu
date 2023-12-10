import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import { SendButton } from '../../styled/Buttons';
import { fullDate, todayDateTs } from '../../utils/Date';
import { checkAllValuesToday } from '../../utils/helperfunctions';
import { useUserContext } from '../../providers/userContext';
import { useDataContext } from '../../providers/dataContext';
import useEvents from '../../hooks/useEvents';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle, TitleH2 } from '../../styled/globalStyles';

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { DateTime } from 'luxon';
import { theme } from '../../themes/theme';


/*********************************************************************
 * Dashboard-Component
 * 
 * Shows next events from calendar and 
 * informs whether values have already been saved today.
 *********************************************************/

const Dashboard = () => {

	const { nextEvents } = useEvents();
	const { user, userData, checkToken } = useUserContext();
	const { getDiaryFromBackend, diary, editedGroups } = useDataContext();


	let location = useLocation();
	const navigate = useNavigate();


	//........................

	useEffect(() => {
		checkToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location])


	/*******************************************************
	 * Check if userData is available. 
	 * If yes, fetche the diary from Backend.
	 */

	if (userData) {
		if (!diary) {
			if (userData.diaryId)
				getDiaryFromBackend(userData.diaryId)
		}
	}

	if ((diary) && (diary.date.length > 0)) {
		if (typeof (diary.date[0]) === 'string') {
			diary.date.forEach((e, i) => {
				let tmp = DateTime.fromISO(e);
				diary.date[i] = tmp.toMillis();
			})
		}
	}


	const handleStart = () => {
		navigate('/CreateDiary')
	}



	let eventList = (<></>);
	if (nextEvents && nextEvents.length > 0) {
		eventList =
			<>
				{nextEvents.map(e => (
					<EventItem key={e.id} >
						<span>
							{e.title}
						</span>
						<span>
							{DateTime.fromISO(e.start).toLocaleString(DateTime.DATE_HUGE)}
						</span>
					</EventItem>
				))}
			</>
	}


	//***************************************************************

	if (user)
		return (
			<StyledContentGroup>
				<Header />
				<StyledMainGroup>
					<NavBar />
					<StyledMainContent>
						<StFullDay>
							Heute ist {fullDate()}.
						</StFullDay>
						{
							userData &&
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
										diary?.timestamp &&
											diary?.timestamp[diary.timestamp.length - 1] === todayDateTs() ?
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
										// done &&
										// nextEvents?.map(e => (
										// searchedEvents && searchedEvents.length > 0 &&
										<div>{eventList}</div>

										// searchedEvents?.map(e => (
										// 	<EventItem key={e.id} >
										// 		<span>
										// 			{e.title}:{space}
										// 		</span>
										// 		<span>
										// 			{DateTime.fromISO(e.start).toLocaleString(DateTime.DATE_HUGE)}
										// 		</span>
										// 	</EventItem>
										// ))
									}
								</TitleH2>
								<Item />

							</div>
						}
					</StyledMainContent>
				</StyledMainGroup>
				<Footer />
			</StyledContentGroup>
		)
}

export default Dashboard;


/****************************************************************
 *  Styled-components
 ****************************************************************/


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
