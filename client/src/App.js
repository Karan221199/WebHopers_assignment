import React from 'react';
import {Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
