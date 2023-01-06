import useData from "../hooks/useData";

import { createContext, useContext } from "react";

//---------------------------------------------------------
const DataContext = createContext();

const useDataContext = () => useContext(DataContext);  // Das ist der CustomHook

const DataContextProvider =({children}) => {

const [items, setItems, createNewDiary, saveTemp, tempData, setTempData,  getTemp, tempResults, diary, setDiary] = useData();

    return(
        <DataContext.Provider value={{ items, setItems, createNewDiary, saveTemp, tempData, setTempData, getTemp, tempResults, diary, setDiary }} >
            {children}
        </DataContext.Provider>
    )
}


export {DataContextProvider, useDataContext};