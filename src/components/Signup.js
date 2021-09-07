import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
require('dotenv').config();
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    input: {
      display: 'none',
    },
  },
}));
function Signup(props) {
  const classes = useStyles();
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
    console.log('onchange', e.target.files[0]);
    setFile(e.target.files[0])
  };

  useEffect(() => {
    handelUploadImage();
  }, [file]);

  const handelUploadImage = () => {
    if (file) {
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
    }
  };


  return (
    <div>
      <div className="sign">
        <h4>Sign up</h4>
        <form className={classes.root} noValidate autoComplete="off"
          onSubmit={(e) => {
            signup(e);
          }}
        >
          <TextField id="standard-basic" label="Email" type="text"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              // console.log(email);
            }} />
          {/* <input
            type="text"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              // console.log(email);
            }}
          /> */}
          <br />
          <TextField id="standard-basic" label="Password" type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              // console.log(password);
            }} />
          {/* <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              // console.log(password);
            }}
          /> */}
          <br />
          <TextField id="standard-basic" label="First Name" type="text"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
              // console.log(firstName);
            }} />

          {/* <input
            type="text"
            required
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
              // console.log(firstName);
            }}
          /> */}
          <br />

          <TextField id="standard-basic" label="Last Name" type="text"
            required
            onChange={(e) => {
              setLastName(e.target.value);
              // console.log(lastName);
            }} />
          {/* <input
            type="text"
            required
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
              // console.log(lastName);
            }}
          /> */}
          <br />
          {/* <input type="file" onChange={handelOnChangeImage} />
          <input
            type="button"
            value="Upload"
            onClick={handelUploadImage}
          /> */}
          <div className={classes.root}>
            <input style={{ display: 'none' }} accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handelOnChangeImage} />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => handelUploadImage}>
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <br />
          <Button type="submit" variant="contained">Sign up</Button>
        </form>
      </div>
    </div>
  );

}

export default Signup;
