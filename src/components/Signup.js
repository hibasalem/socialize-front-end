import React, { Component,useState } from 'react';
import axios from 'axios';
require('dotenv').config();


function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  async function signup(e){
    e.preventDefault();
    console.log('sent');
    let url;
    imageUrl.length > 0
      ? (url = imageUrl)
      : (url =
          'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png');

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      email:email,
      pass:password,
      firstName:firstName,
      lastName:lastName,
      imageUrl: url,
    });
    
      setFile('');
      setImageUrl('')

    e.target.reset();
  };


  function handelOnChangeImage (e){
    // console.log(e.target.files[0]);
      setFile(e.target.files[0]);
  };

  function handelUploadImage(){
    const fd = new FormData();
    fd.append('image', file, file.name);
    axios
      .post(
        'https://us-central1-graphite-cell-321207.cloudfunctions.net/uploadFile',
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              'upload Progress : ' +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                '%'
            );
          },
        }
      )
      .then((res) => {
        console.log(res.data.url);
          setImageUrl( res.data.url);
      });
  };

  return (
    <div>
    <div className="sign">
      <h4>Sign up</h4>
      <form
        onSubmit={(e) => {
          signup(e);
        }}
      >
        <input
          type="text"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
           setPassword(e.target.value); 
          }}
        />
        <br />

        <input
          type="text"
          required
          placeholder="First name"
          onChange={(e) => {
           setFirstName(e.target.value);
          }}
        />
        <br />

        <input
          type="text"
          required
          placeholder="Last name"
          onChange={(e) => {
           setLastName( e.target.value );
          }}
        />
        <br />
        <input type="file" onChange={handelOnChangeImage} />
        <input
          type="button"
          value="Upload"
          onClick={handelUploadImage}
        />
        <br />

        <input type="submit" value="Sign up" />
      </form>
    </div>
  </div>
  )
}

export default Signup


// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       firstName: '',
//       lastName: '',
//       file: '',
//       imageUrl: '',
//     };
//   }

//   signup = async (e) => {
//     e.preventDefault();
//     console.log('sent');
//     let url;
//     this.state.imageUrl.length > 0
//       ? (url = this.state.imageUrl)
//       : (url =
//           'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png');

//     await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
//       email: this.state.email,
//       pass: this.state.password,
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       imageUrl: url,
//     });
//     this.setState({
//       file: '',
//       imageUrl: '',
//     });
//     e.target.reset();
//   };

//   handelOnChangeImage = (e) => {
//     // console.log(e.target.files[0]);
//     this.setState({
//       file: e.target.files[0],
//     });
//   };

//   handelUploadImage = () => {
//     const fd = new FormData();
//     fd.append('image', this.state.file, this.state.file.name);
//     axios
//       .post(
//         'https://us-central1-graphite-cell-321207.cloudfunctions.net/uploadFile',
//         fd,
//         {
//           onUploadProgress: (ProgressEvent) => {
//             console.log(
//               'upload Progress : ' +
//                 Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
//                 '%'
//             );
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data.url);
//         this.setState({
//           imageUrl: res.data.url,
//         });
//       });
//   };

//   render() {
//     return (
//       <div>
//         <div className="sign">
//           <h4>Sign up</h4>
//           <form
//             onSubmit={(e) => {
//               this.signup(e);
//             }}
//           >
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

//             <input
//               type="text"
//               required
//               placeholder="First name"
//               onChange={(e) => {
//                 this.setState({ firstName: e.target.value });
//                 console.log(this.state.firstName);
//               }}
//             />
//             <br />

//             <input
//               type="text"
//               required
//               placeholder="Last name"
//               onChange={(e) => {
//                 this.setState({ lastName: e.target.value });
//                 console.log(this.state.lastName);
//               }}
//             />
//             <br />
//             <input type="file" onChange={this.handelOnChangeImage} />
//             <input
//               type="button"
//               value="Upload"
//               onClick={this.handelUploadImage}
//             />
//             <br />

//             <input type="submit" value="Sign up" />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Signup;
