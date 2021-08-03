import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: '',
    };
  }
  componentDidMount = () => {
    // console.log(this.props.user);
    this.props.getAllGroups();
    this.props.getGroupRequests();
    this.props.getUsergroups();
  };
  createGroup = (e) => {
    e.preventDefault();
    this.props.handleCreateGroup(
      this.state.groupName,
      this.state.groupDescription
    );
  };
  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            this.createGroup(e);
          }}
        >
          <label>Create a group</label>
          <input
            type="text"
            placeholder="Enter Group Name"
            onChange={(e) => {
              this.setState({
                groupName: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="Enter Description"
            onChange={(e) => {
              this.setState({
                groupDescription: e.target.value,
              });
            }}
          />
          <input type="submit" />
        </form>

        <h2>
          <b>all groups </b>
        </h2>
        {this.props.showGroups &&
          this.props.allGroups.map((item, idx) => {
            return (
              <>
                <p>
                  <b>{item.group_name}</b>
                </p>
                <p>Description: {item.group_description}</p>
                <button
                  onClick={() =>
                    this.props.handleJoinGroup(item.id, item.owner_id)
                  }
                >
                  Join Group
                </button>
              </>
            );
          })}

        <h2>
          <b>your groups requests</b>
        </h2>

        {this.props.showGroupsRequests &&
          this.props.GroupRequests.groupsNames.map((item, idx) => {
            return (
              <>
                <p>
                  <b> {this.props.GroupRequests.membersNames[idx]}</b> requsted
                  to join <b> {item}</b>
                </p>
                <button
                  onClick={() =>
                    this.props.handleAcceptJoinGroup(
                      this.props.GroupRequests.data[idx].group_id,
                      this.props.GroupRequests.data[idx].member_id
                    )
                  }
                >
                  accept
                </button>

                {/* <button
                  onClick={() =>
                    this.props.handleAcceptJoinGroup(
                      this.props.GroupRequests.data.group_id,
                      this.props.GroupRequests.data.member_id
                    )
                  }
                >
                  decline
                </button> */}
              </>
            );
          })}

        <h2>
          <b>your joined groups</b>
        </h2>

        {this.props.showUsergroups &&
          this.props.usergroups.groupsNames.map((item, idx) => {
            return (
              <>
                <p>
                  <b>{item}</b>
                </p>

                <button
                  onClick={() =>
                    this.props.handleViewgroup(
                      this.props.usergroups.data[idx].group_id
                    )
                  }
                >
                  view group
                  {this.props.showCurrentGroupPath && (
                    <Link to={this.props.currentGroupPath}> view group</Link>
                  )}
                </button>
              </>
            );
          })}
      </div>
    );
  }
}

export default Groups;
