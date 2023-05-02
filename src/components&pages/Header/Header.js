import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import "./Header.css"
import { login, logout } from "../../redux/actions/user/userActions";
import { UserAuth } from "../../context/authContext";
import {setLogout} from "../../redux/slices/usersSlice"


const Header = () => {

    const dispatch = useDispatch()
    const isAuthorized = useSelector((state) => state.user.isAuthorized);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized === false) {
          let loginData = localStorage.getItem("loginData");
          if(loginData){
            loginData = JSON.parse(loginData);
            dispatch(login({ login: loginData.login, password: loginData.password }));
          }else{
          navigate('/');
        }
        }
      }, [isAuthorized]);

      const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
      dispatch(setLogout())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="header">
      <p className="logo">Q</p>
      <button className="header-button" onClick={handleSignOut}>Log out</button>
    </div>
  )
}

export default Header