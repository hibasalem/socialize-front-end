import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { DataContext } from '../context/data';

function Header() {
  const context = useContext(DataContext);

  return (
    <div className="Header">
      <nav>
        <Link className="name" to="/feedPage">
          Socialize
        </Link>
        <Link className="names" to="/feedPage">
          Feed
        </Link>
        <Link className="names" to={context.state.path}>
          Profile
        </Link>
        <Link className="names" to="/addFriends">
          People
        </Link>
        <Link className="names" to="/groups">
          Groups
        </Link>

        <LogOut />
      </nav>
    </div>
  );
}

export default Header;
