import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import FeedPage from './components/FeedPage';
import Profile from './components/Profile';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        id: null,
        firstname: null,
        lastname: null,
        gender: null,
        age: null,
        auth_id: null,
        path: '/profile',
      },
    };
  }

  componentDidMount = () => {
    socket.on('connect', () => {
      socket.emit('test');
    });
  };

  loggedIn = (user) => {
    this.setState({
      loggedIn: true,
      userID: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      age: user.age,
      gender: user.gender,
    });
    console.log('user', user);
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };

  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home
                logOut={this.logOut}
                loggedIn={this.state.loggedIn}
                loggedInFunction={this.loggedIn}
              />
              {this.state.loggedIn && <Redirect to="/feedPage" />}
            </Route>
            <Route exact path="/feedPage">
              <FeedPage logOut={this.logOut} />
            </Route>
            <Route exact path={this.state.path}>
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
