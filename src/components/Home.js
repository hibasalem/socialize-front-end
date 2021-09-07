// import axios from 'axios';
import React from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import './home.css';
import back from './0000.png';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Home(props) {
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
            <Login
              loggedIn={props.loggedIn}
              loggedInFunction={props.loggedInFunction}
            />
            <Signup />
          </div>
        )}
      </div>
    </>
  );
}
