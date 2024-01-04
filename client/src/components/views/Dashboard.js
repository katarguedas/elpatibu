
import Header from '../Header';
import Footer from '../Footer';
import NavBar from '../NavBar';
import { SendButton } from '../../styled/Buttons';
import { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle, TitleH2 } from '../../styled/globalStyles';
import { theme } from '../../themes/theme';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import styled from 'styled-components';

import { checkToken } from '../../store/authActions';
import { fetchEvents } from '../../store/eventsActions';
import { eventsActions } from '../../store/eventsSlice';
import { getNextEvents } from '../../store/eventsActions';

import { fullDate, todayDateTs } from '../../utils/Date';
import { checkAllValuesToday } from '../../utils/helperfunctions';

import { useDataContext } from '../../providers/dataContext';


/*********************************************************************
 * Dashboard-Component
 * 
 * Shows next events from calendar and 
 * informs whether values have already been saved today.
 *********************************************************/

const Dashboard = () => {

	const dispatch = useDispatch();
	const loginStatus = useSelector(state => state.auth.loginStatus);
	const userData = useSelector(state => state.auth.userData);
	const events = useSelector(state => state.events.events)
	const nextEvents = useSelector(state => state.events.nextEvents)
	const { getDiaryFromBackend, diary, editedGroups } = useDataContext();

	const navigate = useNavigate();

	//........................

  useEffect(() => {
      dispatch(checkToken());
  }, [dispatch])


	useEffect(() => {
		if (!loginStatus) {
      navigate('/login');
    }
  }, [loginStatus, dispatch, navigate])


	
	useEffect(() => {
		if ((!events || events?.length === 0) && userData.id !== '') {
			dispatch(fetchEvents(userData.id));
		}
		dispatch(eventsActions.saveNextEvents(
			{ events: getNextEvents(events) }));
	}, [])


	/*******************************************************
	 * Check if userData.id is available. 
	 * If yes, fetche the diary from Backend.
	 */

	if (userData.id !=='') {
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
						<EventItemColLeft>
							{e.title}
						</EventItemColLeft>
						<EventItemColRight >
							{DateTime.fromISO(e.start).toLocaleString(DateTime.DATE_HUGE)}
						</EventItemColRight>
					</EventItem>
				))}
			</>
	}


	//***************************************************************

	if (userData.id !== '')
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
							userData.id !== '' &&
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
										<div>{eventList}</div>
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
	width: 30rem;
	margin-left: 3.0rem; 
	font-weight: 400; 
	font-size: 1.25rem;
`

const EventItemColLeft = styled.span`
  width: 12.0rem;
  justify-content: flex-start;
`
const EventItemColRight = styled.span`
  justify-content: flex-end;
`