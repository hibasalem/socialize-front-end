import React, { Component } from 'react'
const axios = require('axios');
const base64 = require('base-64');
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    login = (e) => {
        e.preventDefault();
        console.log('trying to login');
        const token = base64.encode(`${this.state.email}:${this.state.password}`);
        axios.get('http://localhost:5000/signin',{
        headers: {
          'Authorization': `Basic ${token}`
        },
      });
    }
    render() {
        return (
            <div>
                this is a login page
                <form onSubmit={(e)=>{this.login(e)}}>
                <label>enter Email:</label>
                    <input type='text' placeholder='your Email' required onChange={(e) => {
                        this.setState({ email: e.target.value })
                        console.log(this.state.email);
                    }} />
                    <label>enter password:</label>
                    <input type='password' placeholder='your Password' required onChange={(e) => {
                        this.setState({ password: e.target.value });
                        console.log(this.state.password);
                    }} />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default Login
