import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import Calendar from './views/Calendar';
import CreateDiary from './views/CreateDiary';
import NewDiary from './views/NewDiary';
import DiaryData from './views/DiaryData';
import OpenDiary from './views/OpenDiary';
import Login from './views/Login';
import Register from './views/Register';
import { useUserContext } from './providers/userContext';
import { DataContextProvider } from './providers/dataContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled/theme'

//---------------------------------------------------------


function App() {

  const { user } = useUserContext()

  return (
    <div className="App">
      <ThemeProvider theme={theme} >
        <DataContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Login />} />
              <Route path='/welcome' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/createDiary' element={<CreateDiary />} />
              <Route path='/newDiary' element={<NewDiary />} />
              <Route path='/openDiary' element={<OpenDiary />} />
              <Route path='/diaryData' element={<DiaryData />} />
              <Route path='/calendar' element={<Calendar />} />
            </Routes>
          </BrowserRouter>
        </DataContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

//---------------------------------------------------------