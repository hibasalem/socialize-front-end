import React, {useState} from 'react';
// import { Redirect } from 'react-router-dom';
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();




function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function login(e){
    e.preventDefault();
    try {
      console.log('trying to login');
      const token = base64.encode(`${email}:${password}`);
      let result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/signin`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      // console.log(result.data);

      if (!(result instanceof Error)) {
        props.loggedInFunction(result.data);
      }
    } catch (err) {
      // console.log(err);
      alert(err.message);
    }
  };


  return (
    <div>
        <div className="sign">
          <h4>Signin</h4>
          <form
            onSubmit={(e) => {
              login(e);
            }}
          >
            {/* <label>Email </label> */}
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => {
               setEmail( e.target.value );
              }}
            />
            <br />

            {/* <label>Password </label> */}
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
  )
}

export default Login








// export class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   login = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('trying to login');
//       const token = base64.encode(`${this.state.email}:${this.state.password}`);
//       let result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/signin`, {
//         headers: {
//           Authorization: `Basic ${token}`,
//         },
//       });
//       // console.log(result.data);

//       if (!(result instanceof Error)) {
//         this.props.loggedInFunction(result.data);
//       }
//     } catch (err) {
//       // console.log(err);
//       alert(err.message);
//     }
//   };

//   render() {
//     return (
//       <div>
//         <div className="sign">
//           <h4>Signin</h4>
//           <form
//             onSubmit={(e) => {
//               this.login(e);
//             }}
//           >
//             {/* <label>Email </label> */}
//             <input
//               type="text"
//               placeholder="Email"
//               required
//               onChange={(e) => {
//                 this.setState({ email: e.target.value });
//                 console.log(this.state.email);
//               }}
//             />
//             <br />

//             {/* <label>Password </label> */}
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               onChange={(e) => {
//                 this.setState({ password: e.target.value });
//                 console.log(this.state.password);
//               }}
//             />
//             <br />
//             <input type="submit" value="Sign in" />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;
