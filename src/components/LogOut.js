import axios from 'axios';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

export class LogOut extends Component {
  logout = async () => {
    // await axios.get('http://localhost:5000/logout');
    this.props.logOut();
    console.log('buy');
    // <Redirect to="/" />;
  };

  render() {
    return (
      <a href="http://localhost:3000/">
        <button className="button" onClick={this.logout}>
          Log Out
        </button>
      </a>
    );
  }
}

export default LogOut;
