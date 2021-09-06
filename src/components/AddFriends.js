import React, { Component } from 'react';
import Friend from './Friend';

export class AddFriends extends Component {
  componentDidMount = () => {
    this.props.getFollowing();
  };

  render() {
    return (
      <div className="mainDiv">
        <h2 className="profileName">All users</h2>
        <div className="peopleCont">
          {/* {console.log(this.props.allusers)}
          {console.log(this.props.followingIds)} */}

          {this.props.allusers.map((item, idx) => {
            if (item.id !== this.props.userID) {
              return (
                <Friend
                  targetProfile={this.props.targetProfile}
                  key={idx}
                  item={item}
                  handleAddFriend={this.props.handleAddFriend}
                  disableIt={
                    item.auth_id == this.props.followingIds[idx] ? true : false
                  }
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default AddFriends;
