import React, { Component } from 'react';

class Profile extends Component {
  componentDidMount = () => {
    // console.log(this.props.user);
    this.props.getFollowing();
    this.props.getFollowers();
  };

  render() {
    return (
      <div>
        <p>
          <b>hi</b> {this.props.user.firstname} {this.props.user.lastname}
        </p>
        <p>{this.props.user.age}</p>
        <p>{this.props.user.gender}</p>
        <h2>allFollowing</h2>
        {this.props.showFollowing &&
          this.props.allFollowing.map((item) => {
            return (
              <p>
                {item.firstname} {item.lastname}
              </p>
            );
          })}
        <h2>allFollowers</h2>
        {this.props.showFollowers &&
          this.props.allFollowers.map((item) => {
            return (
              <p>
                {item.firstname} {item.lastname}
              </p>
            );
          })}
      </div>
    );
  }
}

export default Profile;
