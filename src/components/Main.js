import React, { Component } from 'react';
import LogOut from './LogOut';

export class Main extends Component {
  render() {
    return (
      <div>
        <LogOut logOut={this.props.logOut} />
      </div>
    );
  }
}

export default Main;
