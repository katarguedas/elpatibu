import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import MyCalendar from './views/MyCalendar';
import CreateDiary from './views/CreateDiary';
import EditDiary from './views/EditDiary';
import DiaryData from './views/DiaryData';
import OpenDiary from './views/OpenDiary';
import Login from './views/Login';
import Register from './views/Register';
import { useUserContext } from './providers/userContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


//---------------------------------------------------------

function App() {

  const { user } = useUserContext()

  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Login />} />
              <Route path='/welcome' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Login/> } />
              <Route path='/createDiary' element={user ? <CreateDiary /> : <Login/> } />
              <Route path='/editDiary' element={user ? <EditDiary /> : <Login/> } />
              <Route path='/openDiary' element={ user ? <OpenDiary /> : <Login/> } />
              <Route path='/diaryData' element={ user ? <DiaryData /> : <Login/> } />
              <Route path='/mycalendar' element={user ? <MyCalendar /> : <Login/> } />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;

//---------------------------------------------------------