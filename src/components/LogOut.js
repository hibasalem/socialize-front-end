import axios from 'axios';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './header.css';
require('dotenv').config();


function LogOut(props) {

  async function logout(){
    // await axios.get('http://localhost:5000/logout');
    props.logOut();
    console.log('buy');
    // <Redirect to="/" />;
  };


  return (
    <a href={`${process.env.REACT_APP_FRONT_END}/`}>
        <button className="logout" onClick={logout}>
          Log Out
        </button>
      </a>
  )
}

export default LogOut









// export class LogOut extends Component {
//   logout = async () => {
//     // await axios.get('http://localhost:5000/logout');
//     this.props.logOut();
//     console.log('buy');
//     // <Redirect to="/" />;
//   };

//   render() {
//     return (
//       <a href={`${process.env.REACT_APP_FRONT_END}/`}>
//         <button className="logout" onClick={this.logout}>
//           Log Out
//         </button>
//       </a>
//     );
//   }
// }

// export default LogOut;
