import React, { Component } from 'react';
import Posts from './Posts';
import Messenger from './Messenger';
import './profile.css';

class Profile extends Component {
  componentDidMount = () => {
    // console.log(this.props.user);
    this.props.getFollowing();
    this.props.getFollowers();
    // this.props.getUsergroups();
  };

  render() {
    return (
      <div className="mainDiv">
        <p>
          <b>hi</b> {this.props.user.firstname} {this.props.user.lastname}
        </p>
        <p>{this.props.user.age}</p>
        <p>{this.props.user.gender}</p>
        <h2>allFollowing</h2>
        {this.props.showFollowing &&
          this.props.allFollowing.map((item) => {
            return (
              <>
                <p>
                  {item.firstname} {item.lastname}
                </p>
                <button onClick={() => this.props.handleShowMessenger(item.id)}>
                  Send Message
                </button>
              </>
            );
          })}
        <h2>allFollowers</h2>
        {this.props.showFollowers &&
          this.props.allFollowers.map((item) => {
            return (
              <>
                <p>
                  {item.firstname} {item.lastname}
                </p>
                <button onClick={() => this.props.handleShowMessenger(item.id)}>
                  Send Message
                </button>
              </>
            );
          })}
        <Posts
          userID={this.props.userID}
          like={this.props.like}
          comments={this.props.comments}
          comment={this.props.comment}
          allPosts={this.props.allPosts}
        />
        {this.props.showMessenger && (
          <>
            <h2>Messenger</h2>
            <Messenger
              handleSendMessage={this.props.handleSendMessage}
              allMessages={this.props.allMessages}
              showMessages={this.props.showMessages}
            />
          </>
        )}
      </div>
    );
  }
}

export default Profile;
