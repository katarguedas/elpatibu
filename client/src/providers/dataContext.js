import useData from "../hooks/useData";

import { createContext, useContext } from "react";
import useWeatherData from "../hooks/useWeatherAPI";

//---------------------------------------------------------
const DataContext = createContext();

const useDataContext = () => useContext(DataContext);  // Das ist der CustomHook

const DataContextProvider =({children}) => {

const [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults, diarySaved] = useData();

const [ getWeatherDataFromBackend, weatherData, getWeatherData ] = useWeatherData()
;
    return(
        <DataContext.Provider value={{diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, saveTemp, tempData, setTempData, getTemp, tempResults, diarySaved, getWeatherDataFromBackend, weatherData, getWeatherData }} >
            {children}
        </DataContext.Provider>
    )
}


export {DataContextProvider, useDataContext};