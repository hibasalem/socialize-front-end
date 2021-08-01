import React, { Component } from 'react';

class Profile extends Component {
  componentDidMount = () => {
    // console.log(this.props.user);
    this.props.getFollowing();
  };

  render() {
    return (
      <div>
        hi
        <p>{this.props.user.firstname}</p>
        <p>{this.props.user.lastname}</p>
        <p>{this.props.user.age}</p>
        <p>{this.props.user.gender}</p>
        {this.props.showFollowing &&
          this.props.allFollowing.map((item) => {
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
