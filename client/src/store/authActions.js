import { authActions } from './authSlice';

import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

import { LOCAL_STORAGE_KEY } from './authSlice';
import { LOCAL_STORAGE_EVENTS, eventsActions } from './eventsSlice';

/**
 * sends request to backend to create and save a new registered user
 * 
 * @param {*} registerData 
 * @returns 
 */
export const createUser = registerData => {

  return async (dispatch) => {
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
        // console.log("response", response)

        if (response.status === "ok") {
          dispatch(authActions.defineRegistrationMessage({ index: 0 }))
        }
        else if (response.status === "1") {
          dispatch(authActions.defineRegistrationMessage({ index: 1 }))
        }
        else if (response.status === "error") {
          dispatch(authActions.defineRegistrationMessage({ index: 2 }))

        }
      })
      .catch(error => {
        console.log('error', error)
      });
  }
}


/**
 * verify the user using the loginData
 * @param {*} loginData 
 * @returns 
 */

export const verifyUser = loginData => {

  return async (dispatch) => {

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

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response));
        dispatch(authActions.saveToken({ token: response.access }));
        const jwtDecoded = jwt_decode(response.access);
        dispatch(authActions.changeLoginStatus({ loginStatus: true }));
        dispatch(authActions.saveUserData({
          name: jwtDecoded.name,
          id: jwtDecoded.email === 'gast@gast.de' ? jwtDecoded.email : jwtDecoded.id,
          diaryId: jwtDecoded.diaries
        }));

        console.log("user hat sich eingeloggt. UserId: ", jwtDecoded.id)
      })
      .catch(error => {
        console.log('error', error)
      }
      );
  };
};


export const logout = async (dispatch) => {

  dispatch(authActions.saveUserData({
    name: '',
    id: '',
    diaryId: ''
  }));
  dispatch(eventsActions.removeAllEvents());

  localStorage.removeItem(LOCAL_STORAGE_EVENTS);
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  const removeCookie = async () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
      },
      redirect: 'follow'
    };
    await fetch('/clear-cookie', requestOptions)
  };
  removeCookie();
}




export const checkToken = () => {

  return (dispatch) => {

    const lsToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (lsToken !== null && lsToken.status === 'ok') {
      const jwtDecoded = jwt_decode(lsToken.access)
      dispatch(authActions.saveUserData({
        name: jwtDecoded.name,
        id: jwtDecoded.id,
        diaryId: jwtDecoded.diaries
      }));

      // console.log("exp.time: ", jwtDecoded.exp * 1000);
      // console.log("Date.now(): ", Date.now());

      if (jwtDecoded.exp * 1000 > Date.now()) {
        // console.log("Zeit noch nicht abgelaufen. Refreshe den Zugangstoken.")
        refreshToken(jwtDecoded.email, dispatch);
        dispatch(authActions.changeLoginStatus({ loginStatus: true }));
      } else {
        // console.log("Token abgelaufen");
        dispatch(authActions.changeLoginStatus({ loginStatus: false }));
        logout(dispatch);
      }
    }
    else {
      // console.log("Logout");
      dispatch(authActions.changeLoginStatus({ loginStatus: false }));
      logout(dispatch);
    }
  }
};




const refreshToken = async (user, dispatch) => {

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

        dispatch(authActions.saveToken({ token: response.access }));
        const jwtDecoded = jwt_decode(response.access);
        dispatch(authActions.changeLoginStatus({ loginStatus: true }));
        dispatch(authActions.saveUserData({
          name: jwtDecoded.name,
          id: jwtDecoded.id,
          diaryId: jwtDecoded.diaries
        }));
      })
      .catch(error => {
        console.log("error refreshing token", error)
        logout();
      })
  }
}




/**
 * saves the id of the diary in user data (backend)
 * @param {*} id 
 * @returns 
 */

export const saveDiaryIdInBackend = id => {

  return async (dispatch) => {

    const lsToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (lsToken !== null) {
      const jwtDecoded = jwt_decode(lsToken.access);
      let raw = JSON.stringify({
        email: jwtDecoded.email,
        diaryId: id
      });

      let requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: 'follow'
      };
      await fetch('api/saveDiaryId', requestOptions)
        .then(response => response.json())
        .then(response => {
          dispatch(authActions.diaryIdSaved({ saved: true }))
        })
        .catch(error => console.log("error saving the diaryId: ", error))
    } else {
      console.log("User nicht bekannt")
    }


  }
};
