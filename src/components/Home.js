// import axios from 'axios';
import React from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import './home.css';

export default function Home(props){
    return (
      <>
        <h1 className="mainTitle">SOCIALIZE</h1>
        <div className="cover"></div>

        <div className="homeH">
          {props.loggedIn && <LogOut logOut={props.logOut} />}

          {!props.loggedIn && (
            <>
              <Login
                loggedIn={props.loggedIn}
                loggedInFunction={props.loggedInFunction}
              />
              <Signup />
            </>
          )}
        </div>
      </>
    );

}

