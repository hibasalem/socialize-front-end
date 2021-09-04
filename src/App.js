import React, { useContext } from 'react';
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
import AddFriends from './components/AddFriends';
import CurrentGroup from './components/CurrentGroup';
import Groups from './components/Groups';
import TargetProfile from './components/TargetProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataContext } from './context/data';

export default function App() {
  const context = useContext(DataContext);
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
              {context.state.loggedIn && context.state.path && (
                <Redirect to="/feedPage" />
              )}
            </Route>
            <Route exact path="/feedPage">
              <FeedPage />
            </Route>
            <Route exact path={context.state.path}>
              {context.state.path && <Profile />}
            </Route>
            <Route exact path="/addFriends">
              <AddFriends />
            </Route>
            <Route exact path="/groups">
              <Groups />
            </Route>
            <Route exact path="/groups/:id">
              <CurrentGroup />
            </Route>
            <Route exact path="/target/:id">
              <TargetProfile />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
