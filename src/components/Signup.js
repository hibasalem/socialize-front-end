import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }
  signup = async (e) => {
    e.preventDefault();
    console.log('sent');
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      email: this.state.email,
      pass: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };
  render() {
    return (
      <div>
        <div className="sign">
          <h4>Sign up</h4>
          <form
            onSubmit={(e) => {
              this.signup(e);
            }}
          >
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => {
                this.setState({ email: e.target.value });
                console.log(this.state.email);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                this.setState({ password: e.target.value });
                console.log(this.state.password);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="First name"
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
                console.log(this.state.firstName);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="Last name"
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
                console.log(this.state.lastName);
              }}
            />
            <br />

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
