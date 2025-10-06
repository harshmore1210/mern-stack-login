import Register from './page/Register'
import Login from './page/Login'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import './App.css';

function App() {
   const [isRegister, setIsRegister] = useState(true);

  const switchForm = () => {
    setIsRegister(!isRegister);
  };
  return (
<>
     <>
      {isRegister ? <Register switchForm={switchForm} /> : <Login switchForm={switchForm} />}
    </>
{/* 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />

      </Routes>
    </BrowserRouter> */}
    </>
  );
}

export default App;
