import Header from "../components/Header";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { SendButton } from "../styled/Buttons";
import { fullDate, todayDate } from "../utils/Date"
import { sortminmax } from "../utils/helperfunctions";
import { useUserContext } from "../providers/userContext"
import { useDataContext } from "../providers/dataContext"
import { ContentGroup, MainGroup, MainContent, PageTitle, TitleH2 } from "../styled/globalStyles"

import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";
import { DateTime } from "luxon";
import { theme } from "../themes/theme";

//---------------------------------------------------------

const Dashboard = () => {

	const { user, userData, checkToken, getEventsFromBackend, events } = useUserContext();
	const { getDiaryFromBackend, diary } = useDataContext();

	const [nextEvents, setNextEvents] = useState([]);

	let location = useLocation();
	const navigate = useNavigate();

	// console.log("USER?", user)
	// console.log("USERDATA?", userData)
	// console.log("DIARY?", diary)

	//........................

	useEffect(() => {
		checkToken();
	}, [location])

	//........................

	useEffect(() => {

		if (userData) {
			if (!diary) {
				if (userData.diaryId) {
					console.log("noch kein Diary da, schau nach, ob was im Backend ist")
					getDiaryFromBackend(userData.diaryId)
				}
				else
					console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
			}
			else {
				// console.log("Diary:", diary)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps

		// if (!events)
		getEventsFromBackend(userData.id);

	}, [])

	//............

	useEffect(() => {

		if (events) {
			const today = DateTime.local(fullDate());

			setNextEvents(sortminmax(events.filter(e => {
				if (DateTime.fromISO(e.start).ts > today.ts) {
					return e
				}
			})))
		}

	}, [events])


	//........................

	const handleStart = () => {
		navigate('/CreateDiary')
	}

	//........................

	const space = '	';

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
							<div>Du hast noch kein Tagebuch angelegt. <br></br>Hier kannst du eins anlegen<br></br>
								<SendButton onClick={handleStart} >Start</SendButton>
							</div>

							: <div>
								<TitleH2 style={{ color: theme.colors.col3 }} >
									Deine nächsten Termine
									{
										nextEvents.map(e => (
											<EventItem key={e.id} >
												<span>{e.title}:{space}</span>
												<span>{DateTime.fromISO(e.start).toLocaleString(DateTime.DATE_HUGE)}</span>
											</EventItem>
										))}
								</TitleH2>
								<Item />
								<TitleH2
									style={{ color: theme.colors.col3, marginTop: '1.5rem' }}  >
									und Erinnerungen
								</TitleH2>
								<TitleH2 style={{ marginTop: '4.5rem', color: theme.colors.col3 }} >

									{
										diary?.date &&
											diary?.date[diary.date.length - 1] === todayDate() ?
											<p style={{ color: theme.colors.col2 }} >
												Du hast heute bereits Daten eingetragen.
											</p>
											:
											<p style={{ color: theme.colors.col5 }} >
												Du hast heute noch keine Daten eingetragen.
											</p>
									}

								</TitleH2>
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