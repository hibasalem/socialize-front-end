import React, { Component } from 'react';
<<<<<<< HEAD
import Posts from './Posts';
=======
import Messenger from './Messenger';

>>>>>>> 9b9419eccf72b15ab5212be3feb741ad3e3e0d71
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
<<<<<<< HEAD
                  <Posts
          userID={this.props.userID}
          like={this.props.like}
          comments={this.props.comments}
          comment={this.props.comment}
          allPosts={this.props.allPosts} />
=======
          {this.props.showMessenger &&
          <>
          <h2>Messenger</h2>
          <Messenger 
          handleSendMessage={this.props.handleSendMessage}
          allMessages={this.props.allMessages}
          showMessages={this.props.showMessages}
          />
          </>
          }
>>>>>>> 9b9419eccf72b15ab5212be3feb741ad3e3e0d71
      </div>
    );
  }
}

export default Profile;
