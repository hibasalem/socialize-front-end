import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();

export default function Login(props){
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
          <form
            onSubmit={(e) => {
              login(e);
            }}
          >
            {/* <label>Email </label> */}
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                // console.log(email);
              }}
            />
            <br />

            {/* <label>Password </label> */}
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                // console.log(password);
              }}
            />
            <br />
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
    );

}

