import React from "react";
import "./Header.css"
import { UserAuth } from "../context/authContext";
import { logOut } from "../context/authContext";

const Header = () => {
    /* const {user, logOut} = userAuth();
    const handleSignOut = async () => {
        try {
            await LogOut
        } catch (error) {
            console.log(error)
        }
    } */

  return (
    <div className="header">
      <p className="logo">Q</p>
    </div>
  )
}

export default Header