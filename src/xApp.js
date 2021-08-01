import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import FeedPage from './components/FeedPage';
import { useHistory } from "react-router-dom";

const App =()=> {
  let history = useHistory();
  
  const [logged, setlogged] = useState(false)
  
  function loggedIn () {
    // console.log(this.state.history);
    // [logged, setlogged] = useState(true)
    setlogged(true)
    {logged &&
    history.push("/feedPage");}
    console.log(history);
    // history.push("/feedPage");
    console.log('called saeed mad');
  };

  const logOut = () => {
    //  [logged, setlogged] = useState(false)
     setlogged(false)
  };


  
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home 
               logOut={logOut}
               loggedIn={logged}
               loggedInFunction={loggedIn} />
               {/* {logged && <Redirect to="/feedPage" />} */}
             </Route>
            <Route exact path="/feedPage">
              <FeedPage logOut={logOut} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  
}

export default App;
