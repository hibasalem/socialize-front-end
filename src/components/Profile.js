import React, { Component } from 'react';
import Posts from './Posts';
import Messenger from './Messenger';

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
        <h2 className="profileName">
          {this.props.user.firstname} {this.props.user.lastname}
        </h2>
        <p>{this.props.user.age}</p>
        <p>{this.props.user.gender}</p>
        <div className="following">
          <h2>Following</h2>
          {this.props.showFollowing &&
            this.props.allFollowing.map((item) => {
              return (
                <>
                  <p>
                    {item.firstname} {item.lastname}
                  </p>
                  <button
                    className="mybuttonnn"
                    onClick={() => this.props.handleShowMessenger(item.id)}
                  >
                    Chat
                  </button>
                </>
              );
            })}
        </div>

        <div className="followers">
          <h2>Followers</h2>
          {this.props.showFollowers &&
            this.props.allFollowers.map((item) => {
              return (
                <>
                  <p>
                    {item.firstname} {item.lastname}
                  </p>
                  <button
                    className="mybuttonnn"
                    onClick={() => this.props.handleShowMessenger(item.id)}
                  >
                    Chat
                  </button>
                </>
              );
            })}
        </div>
        <Posts
          userID={this.props.userID}
          like={this.props.like}
          comments={this.props.comments}
          comment={this.props.comment}
          allPosts={this.props.allPosts}
        />
        {this.props.showMessenger && (
          <div className="Messenger">
            <h2>Messenger</h2>
            <Messenger
              handleSendMessage={this.props.handleSendMessage}
              allMessages={this.props.allMessages}
              showMessages={this.props.showMessages}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
