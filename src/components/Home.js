// import axios from 'axios';
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class Home extends Component {

    componentDidMount = () => {

        socket.on('connect', () => {
            socket.emit('test');
        })
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
