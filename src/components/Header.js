import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';


export default function Header(props){

    return (
      <div className="Header">
        <nav>
          <Link className="name" to="/">
            Socialize
          </Link>
          <Link className="names" to="/feedPage">
            Feed
          </Link>
          <Link className="names" to={props.path}>
            Profile
          </Link>
          <Link className="names" to="/addFriends">
            People
          </Link>
          <Link className="names" to="/videocall">
            messanger
          </Link>
          <Link className="names" to="/groups">
            Groups
          </Link>

          <LogOut logOut={props.logOut} />
        </nav>
      </div>
    );

}

