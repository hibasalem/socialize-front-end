import axios from 'axios';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './header.css';

export class LogOut extends Component {
  logout = async () => {
    // await axios.get('http://localhost:5000/logout');
    this.props.logOut();
    console.log('buy');
    // <Redirect to="/" />;
  };

  render() {
    return (
      <a href="https://socialize401.netlify.app/">
        <button className="logout" onClick={this.logout}>
          Log Out
        </button>
      </a>
    );
  }
}

export default LogOut;
