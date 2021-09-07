import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import LogOut from './LogOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import Image from 'react-bootstrap/Image';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const location = useLocation();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Header">
      <nav>
        <Link className="name" to="/">
          Socialize
        </Link>

        <Link
          // className="names"
          to="/feedPage"
          className={
            location.pathname === '/feedPage' ? `active-names` : `names`
          }
        >
          Feed
        </Link>
        <Link
          className={
            location.pathname === props.path ? `active-names` : `names`
          }
          to={props.path}
        >
          Profile
        </Link>

        <Link
          className={
            location.pathname === '/addFriends' ? `active-names` : `names`
          }
          to="/addFriends"
        >
          People
        </Link>

        <Link
          className={
            location.pathname === '/videocall' ? `active-names` : `names`
          }
          to="/videocall"
        >
          Messenger
        </Link>
        <Link
          className={location.pathname === '/groups' ? `active-names` : `names`}
          to="/groups"
        >
          Groups
        </Link>

        {props.loggedIn && (
          <Link onClick={handleMenu} className="names2" to={props.path}>
            {props.user.firstname} {props.user.lastname}
            &nbsp;
            <Image
              src={props.user.image_url}
              roundedCircle
              height="30px"
              width="30px"
            />
          </Link>
        )}

        {/* {!props.loggedIn && <p className="names2">hello</p>} */}

        <div className="menu">
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <Link class="innerLink" to={props.path}>
              <MenuItem onClick={handleClose}>
                &nbsp; &nbsp; Profile &nbsp; &nbsp;
              </MenuItem>
            </Link>

            <Link class="innerLink" to="/">
              <MenuItem
                onClick={() => {
                  handleClose();
                  props.logOut();
                }}
              >
                &nbsp; &nbsp; Logout &nbsp; &nbsp;
              </MenuItem>
            </Link>
          </Menu>
        </div>

        {/* <LogOut logOut={props.logOut} /> */}
      </nav>
    </div>
  );
}
