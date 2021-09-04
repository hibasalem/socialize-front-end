// import axios from 'axios';
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Login from './login';
import Signup from './Signup';
import LogOut from './LogOut';
import './home.css';



function Home(props) {
  return (
    <>
        <h1 className="mainTitle">SOCIALIZE</h1>
        <div className="cover"></div>

        <div className="homeH">
          {props.loggedIn && <LogOut logOut={props.logOut} />}

          {!props.loggedIn && (
            <>
              <Login
                loggedIn={props.loggedIn}
                loggedInFunction={props.loggedInFunction}
              />
              <Signup />
            </>
          )}
        </div>
      </>
  )
}

export default Home






// export class Home extends Component {
//   render() {
//     return (
//       <>
//         <h1 className="mainTitle">SOCIALIZE</h1>
//         <div className="cover"></div>

//         <div className="homeH">
//           {this.props.loggedIn && <LogOut logOut={this.props.logOut} />}

//           {!this.props.loggedIn && (
//             <>
//               <Login
//                 loggedIn={this.props.loggedIn}
//                 loggedInFunction={this.props.loggedInFunction}
//               />
//               <Signup />
//             </>
//           )}
//         </div>
//       </>
//     );
//   }
// }

// export default Home;
