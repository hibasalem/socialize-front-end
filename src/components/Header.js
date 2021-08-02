import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav>
          <Link to="/feedPage">Home</Link>
          <Link to={this.props.path}>Profile</Link>
          <Link to="/addFriends">Add Friends</Link>
          <Link to="/groups">Groups</Link>

          <LogOut logOut={this.props.logOut} />
        </nav>
      </div>
    );
  }
}

export default Header;
