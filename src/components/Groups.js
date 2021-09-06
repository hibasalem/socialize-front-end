import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Group from './Group';

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
          {/* {console.log(this.props.GroupRequests)} */}
          {this.props.showGroupsRequests &&
            this.props.GroupRequests.map((item, idx) => {
              return (
                <div className="elementsRap">
                  <p>
                    <b>
                      <Image
                        src={item.image_url}
                        roundedCircle
                        height="30px"
                        width="30px"
                      />
                      &nbsp;
                      {item.firstname} {item.lastname}
                    </b>
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

                  <Link to={`/groups/${item.group_id}`} onClick={()=>{this.props.handleViewgroup(item.group_id)}}> view group</Link>

                </div>
              );
            })}
        </div>{' '}
        <div className="groupsCont">
          <h2>
            <b>All groups </b>
          </h2>
          {/* {console.log(this.props.usergroups)}
          {console.log(this.props.allGroups)} */}

          {this.props.showGroups &&
            this.props.allGroups.map((item, idx) => {
              return (
                <div className="groupRapRap">
                  <Group
                    handleJoinGroup={this.props.handleJoinGroup}
                    item={item}
                    idx={idx}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Groups;
