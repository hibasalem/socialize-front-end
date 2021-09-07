import React from 'react';
import './header.css';
require('dotenv').config();

export default function LogOut(props) {
  const logout = async () => {
    props.logOut();
  };

  return (
    <a href={`${process.env.REACT_APP_FRONT_END}/`}>
      <button className="logout" onClick={logout}>
        Log Out
      </button>
    </a>
  );
}
