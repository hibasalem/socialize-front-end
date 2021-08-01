import axios from 'axios';
import React, { Component } from 'react';

export class LogOut extends Component {
  logout = async () => {
    
    await axios.get('http://localhost:5000/logout');
    this.props.logOut();
  };

  render() {
    return (
      <button className="button" onClick={this.logout}>
        Log Out
      </button>
    );
  }
}

export default LogOut;
