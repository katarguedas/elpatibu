import useData from "../hooks/useData";
import useWeatherAPI from "../hooks/useWeatherAPI";
import useTemplates from '../hooks/useTemplates';

import { createContext, useContext } from "react";

//---------------------------------------------------------
const DataContext = createContext();

const useDataContext = () => useContext(DataContext);  // Das ist der CustomHook

const DataContextProvider =({children}) => {

const [diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved] = useData();
// const [diary, setDiary, diaryInit, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved] = useData();

const  [LOCAL_STORAGE_WEATHER, getWeatherDataFromBackend, weatherData, getWeatherData]  = useWeatherAPI();

const [ DiaryInit, RatingText ] = useTemplates();


    return(
        // <DataContext.Provider value={{diary, setDiary, diaryInit, diaryTemplate, 
        <DataContext.Provider value={{diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved, LOCAL_STORAGE_WEATHER, getWeatherDataFromBackend, weatherData, getWeatherData, DiaryInit, RatingText }} >
            {children}
        </DataContext.Provider>
    )
}


export {DataContextProvider, useDataContext};