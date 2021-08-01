import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    }

    componentDidMount = () => {
        if (this.props.loggedIn) {
            socket.on('connect', () => {
                socket.emit('test', { loggedIn: this.props.loggedIn });
            })
        }
    }
    signup = (e) => {
        e.preventDefault();
        console.log('sent');
        axios.post('http://localhost:5000/signup', { email: this.state.email, pass: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName });

    }
    render() {
        return (
            <div>
                {this.props.loggedIn &&
                    <LogOut logOut={this.props.logOut} />}

                {!this.props.loggedIn &&
                    <>
                        <Login loggedIn={this.props.loggedIn}
                            loggedInFunction={this.props.loggedInFunction}
                        />
                        <Signup />
                    </>

                }
                {/* {this.state.loggedIn && <Redirect to="/main" />} */}

            </div>
        )
    }
}

export default Home
