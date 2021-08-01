import React, { Component } from 'react';
import Friend from './Friend';

export class AddFriends extends Component {
  render() {
    return (
      <div>
        {this.props.allusers.map((item, idx) => {
          return (
            <Friend
              key={idx}
              item={item}
              handleAddFriend={this.props.handleAddFriend}
            />
          );
        })}
      </div>
    );
  }
}

export default AddFriends;
