import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GoogleButton} from "react-google-button";

import { UserAuth } from '../../context/authContext';
import "./LoginPage.css";

function Login() {
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const isAuthorized = userState?.isAuthorized; // добавила проверку на undefined, так как была ошибка в консоли
    const {googleSignIn} = UserAuth();

    useEffect(() => {
      if (isAuthorized === true) {
        navigate('/main');
      }
    }, [isAuthorized]);
    
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
