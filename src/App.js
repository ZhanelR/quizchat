import React from 'react';
import MainLayout from "./layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components&pages/LoginPage"
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