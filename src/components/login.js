import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      console.log('trying to login');
      const token = base64.encode(`${email}:${password}`);
      let result = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/signin`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
            console.log(result);

      if (!(result instanceof Error)) {
        props.loggedInFunction(result.data);
      }
    } catch (err) {
      NotificationManager.error('Wrong Email or Password!');
    }
  };

  return (
    <div>
      <div className="sign2">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            login(e);
          }}
        >
          <TextField
            id="standard-basic"
            label="Email"
            type="text"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <br />
          <br />

          {/* <a href="#top" className="a"> */}
          <Button
            onClick={() => window.scrollTo(0, 0)}
            type="submit"
            className="newbuttn2"
            variant="outlined"
          >
            Log In
          </Button>
          {/* </a> */}
        </form>
      </div>
    </div>
  );
}
