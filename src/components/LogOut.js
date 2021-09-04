import axios from 'axios';
import React, { useContext } from 'react';
import { DataContext } from '../context/data';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './header.css';
require('dotenv').config();

function LogOut() {
  const context = useContext(DataContext);

  async function logout() {
    // await axios.get('http://localhost:5000/logout');
    context.methods.logOut();
    console.log('bye!');
    // <Redirect to="/" />;
  }

  return (
    <a href={`${process.env.REACT_APP_FRONT_END}/`}>
      <button className="logout" onClick={logout}>
        Log Out
      </button>
    </a>
  );
}

export default LogOut;
