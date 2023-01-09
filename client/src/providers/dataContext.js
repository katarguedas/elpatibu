import useData from "../hooks/useData";

import { createContext, useContext } from "react";

//---------------------------------------------------------
const DataContext = createContext();

const useDataContext = () => useContext(DataContext);  // Das ist der CustomHook

const DataContextProvider =({children}) => {

const [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults] = useData();

    return(
        <DataContext.Provider value={{diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults }} >
            {children}
        </DataContext.Provider>
    )
}


export {DataContextProvider, useDataContext};