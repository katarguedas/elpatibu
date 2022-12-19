import { useState } from "react";

import jwt_decode from "jwt-decode";

import { v4 as uuidv4 } from 'uuid';
//---------------------------------------------------------

const useAuth = () => {

    const [token, setToken] = useState();
    const [user, setUser] = useState(true);
    const [userData, setUserData] = useState();
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

    const LOCAL_STORAGE_KEY = 'access token';


    //---------------------------------------------------------


    const verifyUser = async() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": loginData.email,
            "pwd": loginData.pwd
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("/api/login", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response))

                setToken(response.access)

                const jwtDecoded = jwt_decode(response.access);
                console.log(jwtDecoded) 

                setUser(jwtDecoded.email)
                setUserData(jwtDecoded.name)

                return(user)
            })
            .catch(error => console.log('error', error));

    }


    //---------------------------------------------------------



    const addUser = async () => {

        console.log("registerdta", registerData)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log("id", registerData.id)
        var raw = JSON.stringify({
            "id": uuidv4(),
            "email": registerData.email,
            "name": registerData.name,
            "pwd": registerData.pwd
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("/api/register", requestOptions)
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




    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser];

}


export default useAuth;
//---------------------------------------------------------