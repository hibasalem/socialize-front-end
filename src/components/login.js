import React, { useState, useContext } from 'react';
import { DataContext } from '../context/data';
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();

function Login() {
  const context = useContext(DataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
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

      if (!(result instanceof Error)) {
        context.methods.logIn(result.data);
      }
    } catch (err) {
      alert(err.message);
    }
  }

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
            }}
          />
          <br />
          <input type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default Login;
