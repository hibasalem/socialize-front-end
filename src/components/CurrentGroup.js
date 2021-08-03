import React, { Component } from 'react';

export class CurrentGroup extends Component {
  render() {
    return (
      <>
        {this.props.showCurrentGroupContent && (
          <div>{this.props.currentGroupContent.group_name}</div>
        )}
      </>
    );
  }
}

export default CurrentGroup;
