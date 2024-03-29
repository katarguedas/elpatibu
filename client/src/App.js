import Dashboard from './components/views/Dashboard';
import LandingPage from './components/views/LandingPage';
import MyCalendar from './components/views/MyCalendar';
import CreateDiary from './components/views/CreateDiary';
import EditDiary from './components/views/EditDiary';
import DiaryData from './components/views/DiaryData';
import OpenDiary from './components/views/OpenDiary';
import Login from './components/views/Login';
import Register from './components/views/Register';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';


//---------------------------------------------------------

function App() {

  const loginStatus = useSelector(state => state.auth.loginStatus);

  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={loginStatus ? <Dashboard /> : <Login />} />
              <Route path='/welcome' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={loginStatus ? <Dashboard /> : <Login/> } />
              <Route path='/createDiary' element={loginStatus ? <CreateDiary /> : <Login/> } />
              <Route path='/editDiary' element={loginStatus ? <EditDiary /> : <Login/> } />
              <Route path='/openDiary' element={loginStatus ? <OpenDiary /> : <Login/> } />
              <Route path='/diaryData' element={loginStatus ? <DiaryData /> : <Login/> } />
              <Route path='/mycalendar' element={loginStatus ? <MyCalendar /> : <Login/> } />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;

//---------------------------------------------------------