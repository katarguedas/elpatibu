import { fullDate } from '../utils/Date';
import { setTimeArrays } from './../utils/helperfunctions'
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

//---------------------------------------------------------


const useAuth = () => {


	const [token, setToken] = useState();
	const [user, setUser] = useState('');
	const [userData, setUserData] = useState()
	const [loginData, setLoginData] = useState(
		{
			email: "",
			pwd: ""
		})
	const [registerData, setRegisterData] = useState(
		{
			id: "",
			name: "",
			email: "",
			pwd: ""
		})
	const [regMessage, setRegMessage] = useState('')
	const [flag, setFlag] = useState(999)
	const [diaryIdSaved, setDiaryIdSaved] = useState(false);
	const [events, setEvents] = useState('');
	const [nextEvents, setNextEvents] = useState([]);
	const [timeCatArrays, setTimeCatArrays] = useState({
		arzttermin: [],
		therapie: [],
		untersuchung: [],
		sonstiges: []
	});

	const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;
	const LOCAL_STORAGE_WEATHER = process.env.REACT_APP_LOCAL_STORAGE_WEATHER;
	const LOCAL_STORAGE_EVENTS = process.env.REACT_APP_LOCAL_STORAGE_EVENTS;


	//---------------------------------------------------------


	useEffect(() => {
		if (!user) {
			const ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

			if (ls !== null) {
				const decodedJwt = jwt_decode(ls.access)
				setUser(decodedJwt.email);
				setUserData({ name: decodedJwt.name, id: decodedJwt.id, diaryId: decodedJwt.diaries })
				setToken(ls.access)
			}
		}
	}, [])


	useEffect(() => {
		if ((user) && (!userData))
			checkToken();
	}, [])


	useEffect(() => {
		if (userData)
			getEventsFromBackend(userData.id);
	}, [])

	//---------------------------------------------------------

	const verifyUser = async () => {

		const credentials = JSON.stringify({
			"email": loginData.email,
			"pwd": loginData.pwd
		});

		var requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: credentials,
			redirect: 'follow'
		};

		await fetch("/api/login", requestOptions)
			.then(response => response.json())
			.then(response => {
				// console.log(response)

				if ((response.status === 'error') && (response.message === 'Invalid password'))
					alert("Falsches Passwort")
				else if ((response.status === 'error') && (response.message === 'Invalid user'))
					alert("User mit diesem Namen exisitert nicht")


				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response))

				setToken(response.access)

				const jwtDecoded = jwt_decode(response.access);
				// console.log("\n", jwtDecoded, "\n", jwtDecoded.name, "\n", jwtDecoded.diaries)

				setUser(jwtDecoded.email)
				setUserData({
					name: jwtDecoded.name,
					id: jwtDecoded.id,
					diaryId: jwtDecoded.diaries
				})

				// console.log("UserData:", jwtDecoded)
				console.log("user hat sich eingeloggt")
			})
			.catch(error => {
				console.log('error', error)
			}
			);
		return (user);
	}

	//---------------------------------------------------------

	const refreshToken = async (user) => {
		// console.log("refreshToken wird aufgerufen mit user ")

		if (user) {
			var requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"email": user,
				}),
				redirect: 'follow'
			};

			await fetch('/api/refreshToken', requestOptions)
				.then(response => response.json())
				.then(response => {
					// console.log("response", response)
					localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response))

					setToken(response.access)
					const jwtDecoded = jwt_decode(response.access);
					setUser(jwtDecoded.email)
					setUserData({
						name: jwtDecoded.name,
						id: jwtDecoded.id,
						diaryId: jwtDecoded.diaries
					})
				})
				.catch(error => {
					console.log("error", error)
					logout()
				})
		}
	}

	//---------------------------------------------------------

	const checkToken = () => {

		const lsToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

		if (lsToken !== null) {
			const decodedJwt = jwt_decode(lsToken.access)
			setUser(decodedJwt.email)
			setUserData({ name: decodedJwt.name, diaryId: decodedJwt.diaries })


			console.log("user:", user)
			if (decodedJwt.exp * 1000 > Date.now()) {
				// console.log(decodedJwt.email)
				// console.log("Zeit noch nicht abgelaufen. Refreshe den Zugangstoken.")
				refreshToken(decodedJwt.email);
			} else {
				console.log("Token abgelaufen")
				logout()
			}
		}
		else {
			console.log("Logout");
			logout();
		}
	}

	//---------------------------------------------------------

	const removeCookie = async () => {

		var requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'aplication/json',
			},
			redirect: 'follow'
		};
		await fetch('/clear-cookie', requestOptions)
		//  .then(response => response.json())
	};


	//---------------------------------------------------------

	const logout = () => {
		localStorage.removeItem(LOCAL_STORAGE_KEY)
		localStorage.removeItem(LOCAL_STORAGE_WEATHER)
		localStorage.removeItem(LOCAL_STORAGE_EVENTS)
		removeCookie()
		setUser('')
	}

	//---------------------------------------------------------

	const addUser = async () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		// console.log("id", registerData.id)
		const credentials = JSON.stringify({
			"id": uuidv4(),
			"email": registerData.email,
			"name": registerData.name,
			"pwd": registerData.pwd,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: credentials,
			redirect: 'follow'
		};

		await fetch("/api/register", requestOptions)
			.then((response) => response.json())
			.then(response => {
				console.log("response", response)

				if (response.status === "ok") {
					setRegMessage("Sie haben sich erfolgreich registriert und können sich jetzt anmelden.")
					setFlag(0)
				}
				else if (response.status === "1") {
					setRegMessage('Ein Konto mit dieser E-Mail existiert bereits.\nPasswort vergessen?');
					setFlag(1);
				}
				else if (response.status === "error") {
					setRegMessage("Unbekannter Fehler")
					setFlag(2)
				}
			})
			.catch(error => {
				console.log('error', error)
			});

	}

	//----------------------------------------------------------

	const saveDiaryIdInBackend = async (id) => {
		console.log(id)
		let raw = JSON.stringify({
			email: user,
			diaryId: id
		})
		// console.log("raw", raw)

		let requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};
		await fetch('api/saveDiaryId', requestOptions)
			.then(response => response.json())
			.then(response => {
				console.log(response)
				console.log("id gespeichert")
				setDiaryIdSaved(true)   // Funktioniert nicht. WARUM????

			})
			.catch(error => console.log("error: ", error))
	}

	//----------------------------------------------------

	const setTimeArrays = (events) => {
		console.log("Hole Events nach Kategorien für die DIagramme", events)
		if (events) {
			events.map((e, i) => {
				if (e.category === 'Therapie') {
					setTimeCatArrays({ ...timeCatArrays }, timeCatArrays.therapie.push(DateTime.fromISO(e.end).ts))
					// console.log("-------", e.category, DateTime.fromISO(e.end).ts)
					return (e)
				} else if (e.category === 'Arzttermin') {
					setTimeCatArrays({ ...timeCatArrays }, timeCatArrays.arzttermin.push(DateTime.fromISO(e.end).ts))
					// console.log("-------", e.category, DateTime.fromISO(e.end).ts)
					return (e)
				}
			})
		}
	}

	//-------------------

	const clearTimeCatArrays = () => {
		setTimeCatArrays({ ...timeCatArrays }, timeCatArrays.arzttermin = [], timeCatArrays.therapie = [], timeCatArrays.untersuchung = [], timeCatArrays.sonstiges = [])
	}

	//-------------------

	const getNextEvents = (events) => {
		let array = [];
		if (events) {
			const today = DateTime.local(fullDate());


			array = events.filter(e => {
				if (DateTime.fromISO(e.start).ts > today.ts) {
					return e
				}
			})

			// setNextEvents(events.filter(e => {
			// 	if (DateTime.fromISO(e.start).ts > today.ts) {
			// 		return e
			// 	}
			// }))

		}

		// const array = [...nextEvents];

		for (let i = 0; i < array.length; i++)
			array[i].time = DateTime.fromISO(array[i].start).ts

		const sortedArray = array.sort((a, b) => {
			// console.log(a.time)
			return a.time - b.time;
		});

		// console.log(sortedArray)
		if (sortedArray.length > 0)
			setNextEvents(sortedArray)
	}


	//-----------------------
	// useEffect(() => {
	// }, [timeCatArrays])

	//-----------------------

	const getEventsFromBackend = async (id) => {

		clearTimeCatArrays();
		// console.log(".        .", timeCatArrays)
		console.log("hole Events aus dem Backend")
		let requestOptions = {
			method: 'GET',
		};

		await fetch('/api/getEvents?id=' + id, requestOptions)
			.then(response => response.json())
			.then(response => {
				console.log("events aus dem Backend geholt", response.events)
				localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(response.events))
				// setEvents(response.events)
				setTimeArrays(response.events)
				getNextEvents(response.events)
			})
			.catch(error => console.log("error: ", error))
	}

	//----------------------------------------------------

	const saveEventInBackend = async (event) => {

		console.log(event)
		console.log(userData.id)

		const raw = JSON.stringify({
			id: userData.id,
			event: event
		})

		let requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};

		await fetch('/api/saveEvent', requestOptions)
			.then(response => response.json()
			.then(response => console.log(response)))

			.catch(error => console.log("error:", error))
	}

	//........................................
	const deleteEventInBackend = async (userId, eventId) => {

		let raw = JSON.stringify(
			{
				userId: userId,
				eventId: eventId
			}
		)
		console.log("raw", raw)

		let requestOptions = {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};

		await fetch('/api/deleteEvent', requestOptions)
			.then(response => response.json())
			.then(response => console.log(response))

			.catch(error => console.log("error:", error))
	}


	//-----------------------------------------------------------------

	return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser, logout, checkToken, saveDiaryIdInBackend, diaryIdSaved, getEventsFromBackend, saveEventInBackend, timeCatArrays, setTimeArrays, nextEvents, setNextEvents, LOCAL_STORAGE_EVENTS, deleteEventInBackend];

}


export default useAuth;
//---------------------------------------------------------