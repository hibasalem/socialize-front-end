import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import FeedPage from './components/FeedPage';

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
    console.log('called saeed mad');
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
               loggedInFunction={this.loggedIn} />
               {this.state.loggedIn && <Redirect to="/feedPage" />}
             </Route>
            <Route exact path="/feedPage">
              <FeedPage logOut={this.logOut} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
