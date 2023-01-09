import { useState, useEffect } from "react";


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
    const [anyChange, setAnyChange] = useState(false)

    const [diaryIdSaved, setDiaryIdSaved] = useState(false);

    const LOCAL_STORAGE_KEY = 'access token';


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
                console.log(response)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response))

                setToken(response.access)

                const jwtDecoded = jwt_decode(response.access);
                console.log("\n",jwtDecoded, "\n", jwtDecoded.name, "\n", jwtDecoded.diaries)

                setUser(jwtDecoded.email)
                setUserData({name: jwtDecoded.name, diaryId: jwtDecoded.diaries})

                console.log("UserData:", jwtDecoded)
                console.log("user hat sich eingeloggt")
            })
            .catch(error => console.log('error', error));
        return (user);
    }

    //---------------------------------------------------------

    const refreshToken = async (user) => {
        // console.log("refreshToken wird aufgerufen mit user ")

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

                // setToken(response.access)
                // const jwtDecoded = jwt_decode(response.access);
                // setUser(jwtDecoded.email)
                // setUserData(jwtDecoded.name)
            })
            .catch(error => {
                console.log("error", error)
                logout()
            })
    }

    //---------------------------------------------------------

    const checkToken = () => {

        const lsToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        // console.log("access token vorhanden?: ", lsToken)

        if (lsToken !== null) {
            const decodedJwt = jwt_decode(lsToken.access)
            setUser(decodedJwt.email)

            if (decodedJwt.exp * 1000 > Date.now()) {
                // console.log(decodedJwt.email)
                console.log("Zeit noch nicht abgelaufen. Refreshe den Zugangstoken.")
                refreshToken(decodedJwt.email);
            } else {
                console.log("Token abgelaufen")
                logout()
            }
        }
        else {
            console.log("Logout")
            logout()
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
        removeCookie()
        setUser('')
    }

    //---------------------------------------------------------

    const addUser = async () => {

        console.log("registerdta", registerData)
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

    const saveDiaryId = async (id) => {
        console.log(id)
        let raw = JSON.stringify({
            email: user,
            diaryId: id
        })
        console.log("raw" , raw)

        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };
        fetch('api/saveDiaryId', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log("id gespeichert")
                setDiaryIdSaved(true)   // Funktioniert nicht. WARUM????

            })
            .catch(error => console.log("error: ", error))
    }



//-----------------------------------------------------------------

    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser, logout, anyChange, setAnyChange, checkToken, saveDiaryId, diaryIdSaved];

}


export default useAuth;
//---------------------------------------------------------