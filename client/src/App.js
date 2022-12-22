import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import Calendar from './views/Calendar';
import CreateDiary from './views/CreateDiary';
import CreateDiary2 from './views/CreateDiary2';
import NewDiary from './views/NewDiary';
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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createDiary' element={<CreateDiary2 />} />
          <Route path='/newDiary' element={<NewDiary />} />
          <Route path='/openDiary' element={<OpenDiary />} />
          <Route path='/diaryData' element={<DiaryData />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//---------------------------------------------------------