import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

function Signup(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');



  const signup = async (e) => {
    e.preventDefault();
    console.log('sent');
    let url;
    imageUrl.length > 0
      ? (url = imageUrl)
      : (url =
          'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png');

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      email: email,
      pass: password,
      firstName: firstName,
      lastName: lastName,
      imageUrl: url,
    });
    setFile('');
    setImageUrl('');
    e.target.reset();
  };

  const handelOnChangeImage = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0])
  };

  const handelUploadImage = () => {
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
        setImageUrl(res.data.url);
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
                setEmail(e.target.value);
                // console.log(email);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                // console.log(password);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="First name"
              onChange={(e) => {
                setFirstName(e.target.value);
                // console.log(firstName);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="Last name"
              onChange={(e) => {
                setLastName(e.target.value);
                // console.log(lastName);
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
    );

}

export default Signup;
