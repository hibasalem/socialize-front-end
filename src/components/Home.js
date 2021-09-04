import React, { useContext } from 'react';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import './home.css';
import { DataContext } from '../context/data';

function Home() {
  const context = useContext(DataContext);

  return (
    <>
      <h1 className="mainTitle">SOCIALIZE</h1>
      <div className="cover"></div>

      <div className="homeH">
        {context.state.loggedIn && <LogOut logOut={context.methods.logOut} />}

        {!context.state.loggedIn && (
          <>
            <Login />
            <Signup />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
