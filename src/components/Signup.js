import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      file: '',
      imageUrl: '',
    };
  }

  signup = async (e) => {
    e.preventDefault();
    console.log('sent');
    let url;
    this.state.imageUrl.length > 0
      ? (url = this.state.imageUrl)
      : (url =
          'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png');

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      email: this.state.email,
      pass: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      imageUrl: url,
    });
    this.setState({
      file: '',
      imageUrl: '',
    });
    e.target.reset();
  };

  handelOnChangeImage = (e) => {
    // console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  };

  handelUploadImage = () => {
    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name);
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
        this.setState({
          imageUrl: res.data.url,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="sign">
          <h4>Sign up</h4>
          <form
            onSubmit={(e) => {
              this.signup(e);
            }}
          >
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => {
                this.setState({ email: e.target.value });
                console.log(this.state.email);
              }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                this.setState({ password: e.target.value });
                console.log(this.state.password);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="First name"
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
                console.log(this.state.firstName);
              }}
            />
            <br />

            <input
              type="text"
              required
              placeholder="Last name"
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
                console.log(this.state.lastName);
              }}
            />
            <br />
            <input type="file" onChange={this.handelOnChangeImage} />
            <input
              type="button"
              value="Upload"
              onClick={this.handelUploadImage}
            />
            <br />

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
