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

    this.props.getGroupRequests();
    this.props.getAllGroups();
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
      <div className="mainDiv">
        <form
          className="groupForm form2"
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
        <div className="groupsRequests">
          <h2>
            <b>Groups requests</b>
          </h2>
          {this.props.showGroupsRequests &&
            this.props.GroupRequests.map((item, idx) => {
              return (
                <div className="elementsRap">
                  <p>
                    <b> {item.firstname} {item.lastname}</b>
                    requsted to join <br /> <b> {item.group_name}</b>
                  </p>
                  <button
                    className="mybuttonnn"
                    onClick={() =>
                      this.props.handleAcceptJoinGroup(
                        item.group_id,
                        item.member_id,
                        item.owner_id
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
                </div>
              );
            })}
        </div>
        <div className="JoinedGroups">
          <h2>
            <b>Joined groups</b>
          </h2>

          {this.props.showUsergroups &&
            this.props.usergroups.map((item, idx) => {
              return (
                <div className="elementsRap">
                  <p>
                    <b>{item.group_name}</b>
                  </p>

                  <button
                    className="mybuttonnn"
                    onClick={() =>
                      this.props.handleViewgroup(
                        item.group_id
                      )
                    }
                  >
                    view group
                    {this.props.showCurrentGroupPath && (
                      <Link to={this.props.currentGroupPath}> view group</Link>
                    )}
                  </button>
                </div>
              );
            })}
        </div>{' '}
        <div className="groupsCont">
          <h2>
            <b>All groups </b>
          </h2>
          {this.props.showGroups &&
            this.props.allGroups.map((item, idx) => {
              return (
                <div className="groupRapRap">
                  <p>
                    <b>{item.group_name}</b>
                  </p>
                  <p>Description {item.group_description}</p>
                  <button
                    className="mybuttonnn"
                    onClick={() =>
                      this.props.handleJoinGroup(item.id, item.owner_id)
                    }
                  >
                    Join group
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Groups;
