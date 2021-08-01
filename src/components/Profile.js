import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
        <p>{this.props.user.firstname}</p>
        <p>{this.props.user.lastname}</p>
        <p>{this.props.user.age}</p>
        <p>{this.props.user.gender}</p>
      </div>
    );
  }
}

export default Profile;
