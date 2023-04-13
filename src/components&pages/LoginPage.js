import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../store&sagas/actionUser";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import { initialState } from "../Slices/usersSlice";
import { GoogleButton} from "react-google-button";
import "./LoginPage.css";
import { UserAuth } from '../context/authContext';



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const isAuthorized = userState?.isAuthorized; // добавила проверку на undefined, так как была ошибка в консоли
    const {googleSignIn, user } = UserAuth();

    useEffect(() => {
      if (isAuthorized === true) {
        navigate('/main');
      }
    }, [isAuthorized]);
    

    const handleSubmit = (values) => {
        /* dispatch(login({login: values.username, password: values.password}));
        
        if (values.remember) {
          const data = { login: values.username, password: values.password };
          localStorage.setItem('loginData', JSON.stringify(data));
        } else {
          localStorage.removeItem('loginData');
        } */
      };
    
      const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <div className='form-сontainer'>
          <div className='google-button'><GoogleButton onClick={handleGoogleSignIn}  /></div>
        </div>
      );
}
export default Login;


//via Context below  
/* import React, { useState, useEffect } from 'react';
import { GoogleButton} from "react-google-button";
import { UserAuth } from '../context/authContext';


const Login = () => {

    const {googleSignIn, user } = UserAuth();

    const handleGoogleSign = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    return (
      <div className='form-сontainer'>
        <div className='google-button'><GoogleButton onClick={handleGoogleSign} /></div>
      </div>
    );
  }
  
*/

  //export default Login