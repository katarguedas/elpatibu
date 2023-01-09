import useAuth from "../hooks/useAuth";

import { createContext, useContext } from "react";

//---------------------------------------------------------
const UserContext = createContext();

const useUserContext = () => useContext(UserContext);  // Das ist der CustomHook

const UserContextProvider =({children}) => {

const [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser, logout, anyChange, setAnyChange, checkToken, saveDiaryId, diaryIdSaved ] = useAuth();

    return(
        <UserContext.Provider value={{ LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken, loginData, setLoginData, registerData, setRegisterData, addUser, regMessage, flag, setFlag, verifyUser, logout, anyChange, setAnyChange, checkToken, saveDiaryId, diaryIdSaved }} >
            {children}
        </UserContext.Provider>
    )
}


export {UserContextProvider, useUserContext};