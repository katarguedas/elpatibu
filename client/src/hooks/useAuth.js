import { useState, useEffect, useCallback } from "react";
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

				console.log("user hat sich eingeloggt. IserId: ", jwtDecoded.id)
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

	const checkToken = useCallback(() => {

		const lsToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		console.log("useAuth checkToken erneut ausgeführt")
		if (lsToken !== null) {
			const decodedJwt = jwt_decode(lsToken.access)
			setUser(decodedJwt.email)
			setUserData({ name: decodedJwt.name, diaryId: decodedJwt.diaries })

			console.log("decodedJwt.exp: ", decodedJwt.exp, new Date(decodedJwt.exp * 1000))
			if (decodedJwt.exp * 1000 > Date.now()) {
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
	}, []);

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
					setRegMessage("Du hast Dich erfolgreich registriert und kannst Dich jetzt anmelden.")
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
		let raw = JSON.stringify({
			email: user,
			diaryId: id
		})

		let requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: raw,
			redirect: 'follow'
		};
		await fetch('api/saveDiaryId', requestOptions)
			.then(response => response.json())
			.then(response => {
				setDiaryIdSaved(true)   // Funktioniert nicht. WARUM????

			})
			.catch(error => console.log("error: ", error))
	}

	//-----------------------------------------------------------------

	return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser, logout, checkToken, saveDiaryIdInBackend, diaryIdSaved,
		LOCAL_STORAGE_EVENTS,];

}


export default useAuth;
//---------------------------------------------------------