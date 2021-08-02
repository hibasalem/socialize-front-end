import React, { Component } from 'react';
import Posts from './Posts';
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
                  <Posts
          userID={this.props.userID}
          like={this.props.like}
          comments={this.props.comments}
          comment={this.props.comment}
          allPosts={this.props.allPosts} />
      </div>
    );
  }
}

export default Profile;
