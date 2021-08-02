import React, { Component } from 'react';

export class Friend extends Component {
  render() {
    return (
      <div key={this.props.item.id}>
        <p>
          {this.props.item.firstname} {this.props.item.lastname}
        </p>
        <button onClick={() => this.props.handleAddFriend(this.props.item.id)}>
          Add Friend
        </button>
      </div>
    );
  }
}

export default Friend;
