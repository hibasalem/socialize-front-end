// import axios from 'axios';
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';

export class Home extends Component {
  render() {
    return (
      <div>
        {this.props.loggedIn && <LogOut logOut={this.props.logOut} />}

        {!this.props.loggedIn && (
          <>
            <Login
              loggedIn={this.props.loggedIn}
              loggedInFunction={this.props.loggedInFunction}
            />
            <Signup/>
          </>
        )}
      </div>
    );
  }
}

export default Home;
