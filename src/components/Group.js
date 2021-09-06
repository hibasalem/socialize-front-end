import React, { Component } from 'react';

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableIt: false,
    };
  }

  handleClicked(id, owner_id) {
    this.props.handleJoinGroup(id, owner_id);
    this.setState({
      disableIt: true,
    });
    console.log(this.state.disableIt);
  }

  render() {
    return (
      <div>
        <p>
          <b>{this.props.item.group_name}</b>
        </p>
        <p>Description {this.props.item.group_description}</p>

        {!this.state.disableIt && (
          <button
            className="mybuttonnn"
            onClick={() =>
              this.handleClicked(this.props.item.id, this.props.item.owner_id)
            }
          >
            Join group
          </button>
        )}

        {this.state.disableIt && (
          <button className="mybuttonnn" disabled>
            request sent
          </button>
        )}
      </div>
    );
  }
}
