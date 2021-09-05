import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Navbar, Nav } from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav>
          <Link className="name" to="/feedPage">
            Socialize
          </Link>
          <Link className="names" to="/feedPage">
            Feed
          </Link>
          <Link className="names" to={this.props.path}>
            Profile
          </Link>
          <Link className="names" to="/addFriends">
            People
          </Link>
          <Link className="names" to="/groups">
            Groups
          </Link>

          <LogOut logOut={this.props.logOut} />
        </nav>
      </div>
    );
  }
}

export default Header;
