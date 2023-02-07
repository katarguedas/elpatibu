import useData from "../hooks/useData";
import useWeatherAPI from "../hooks/useWeatherAPI";
import useTemplates from '../hooks/useTemplates';

import { createContext, useContext } from "react";

//---------------------------------------------------------
const DataContext = createContext();

const useDataContext = () => useContext(DataContext);  // Das ist der CustomHook

const DataContextProvider = ({ children }) => {

	const [diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved] = useData();

	const [LOCAL_STORAGE_WEATHER, getWeatherDataFromBackend, weatherData, getWeatherData] = useWeatherAPI();

	const [diaryInit, editedGroups, ratingText] = useTemplates();


	return (
		<DataContext.Provider value={{ diary, setDiary, diaryTemplate, setDiaryTemplate, createNewDiary, getDiaryFromBackend, saveDataToBackend, tempData, setTempData, diarySaved, LOCAL_STORAGE_WEATHER, getWeatherDataFromBackend, weatherData, getWeatherData, diaryInit, editedGroups, ratingText }} >
			{children}
		</DataContext.Provider>
	)
}


export { DataContextProvider, useDataContext };