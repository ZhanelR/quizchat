import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./components&pages/LoginPage/LoginPage"
import MainPage from "./components&pages/MainPage"
import { AuthContextProvider } from './context/authContext';

function App() {
  return (
      <AuthContextProvider>
        <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<Login/>}/>
            <Route path="main" element={<MainPage/>}/>
          </Route>
        </Routes>
        </Router>
     </AuthContextProvider>  
  );
}

export default App;