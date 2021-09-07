import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
export default function Login(props){
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      console.log('trying to login');
      const token = base64.encode(`${email}:${password}`);
      let result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/signin`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      // console.log(result.data);

      if (!(result instanceof Error)) {
        props.loggedInFunction(result.data);
      }
    } catch (err) {
      // console.log(err);
      alert(err.message);
    }
  };


    return (
      <div>
        <div className="sign">
          <h4>Signin</h4>
          <form className={classes.root} noValidate autoComplete="off"
            onSubmit={(e) => {
              login(e);
            }}
          >
            {/* <label>Email </label> */}
            {/* <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log(email);
              }}
            /> */}
              <TextField id="standard-basic" label="Email"  type="text"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log(email);
              }} />
            <br />

            {/* <label>Password </label> */}
            <TextField id="standard-basic" label="Password" type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                // console.log(password);
              }} />
            {/* <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                // console.log(password);
              }}
            /> */}
            <br />
            <Button type="submit" variant="contained">Sign In</Button>
          </form>
        </div>
      </div>
    );

}

