import { useState} from "react";

//---------------------------------------------------------

const useAuth = () => {

    const [token, setToken] = useState();
    const [user, setUser] = useState(true);
    const [userData, setUserData] = useState();


    const LOCAL_STORAGE_KEY ='access token';



    return [LOCAL_STORAGE_KEY, user, setUser, userData, setUserData, token, setToken];
    
}


export default useAuth;
//---------------------------------------------------------