// import axios from 'axios';
import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import './home.css';
import back from './0000.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Home(props) {
  const [sign, setsign] = useState('signin');
  const classes = useStyles();

  return (
    <>
      <h1 className="mainTitle">SOCIALIZE</h1>
      <div className="cover">
        <img className="img" src={back} />
        <a href="#GETSTARTED" className="a">
          <Fab variant="extended" className="buttn">
            <ArrowDropDownCircleRoundedIcon />
            &nbsp; GET STARTED
          </Fab>
        </a>
      </div>

      <div className="homeH">
        {props.loggedIn && <LogOut logOut={props.logOut} />}

        {!props.loggedIn && (
          <div id="GETSTARTED">
            <div className="signHeader">
              {sign == 'signin' && <h2>Log In</h2>}
              {sign == 'signup' && <h2>Sign Up</h2>}
              <ButtonGroup
                variant="text"
                aria-label="text primary button group"
              >
                <Button className="newbuttn" onClick={() => setsign('signin')}>
                  Log In
                </Button>
                <Button className="newbuttn" onClick={() => setsign('signup')}>
                  Sign Up
                </Button>
              </ButtonGroup>
            </div>
            {sign == 'signin' && (
              <Login
                loggedIn={props.loggedIn}
                loggedInFunction={props.loggedInFunction}
              />
            )}
            {sign == 'signup' && <Signup />}
          </div>
        )}
      </div>
    </>
  );
}
