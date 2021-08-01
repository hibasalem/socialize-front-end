import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/login';
import Main from './components/Main';
import Header from './components/Header';
import { Redirect } from 'react-router-dom';

// import cors from 'cors';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true,
    });
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
              <Home />
            </Route>
            <Route exact path="/login">
              <Login loggedIn={this.loggedIn} />
              {this.state.loggedIn && <Redirect to="/main" />}
            </Route>
            <Route exact path="/main">
              <Main logOut={this.logOut} />
              {!this.state.loggedIn && <Redirect to="/" />}
            </Route>
            {/* <Route exact path="/"></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
