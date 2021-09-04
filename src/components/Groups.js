import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { DataContext } from '../context/data';

export default function Groups() {
  const context = useContext(DataContext);

  const [groupName, setgroupName] = useState('');
  const [groupDescription, setgroupDescription] = useState('');

  useEffect(() => {
    context.methods.getGroupRequests();
    context.methods.getAllGroups();
    context.methods.getUsergroups();
  }, []);

  const createGroup = (e) => {
    e.preventDefault();
    context.methods.handleCreateGroup(groupName, groupDescription);
  };

  return (
    <div className="mainDiv">
      <form
        className="groupForm form2"
        onSubmit={(e) => {
          createGroup(e);
        }}
      >
        <label>Create a group</label>
        <input
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => {
            setgroupName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          onChange={(e) => {
            setgroupDescription(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
      <div className="groupsRequests">
        <h2>
          <b>Groups requests</b>
        </h2>
        {/* {console.log(props.GroupRequests)} */}
        {context.state.showGroupsRequests &&
          context.state.GroupRequests.map((item, idx) => {
            return (
              <div className="elementsRap">
                <p>
                  <b>
                    <Image src={item.image_url} roundedCircle height="30px" />
                    &nbsp;
                    {item.firstname} {item.lastname}
                  </b>
                  requsted to join <br /> <b> {item.group_name}</b>
                </p>
                <button
                  className="mybuttonnn"
                  onClick={() =>
                    context.methods.handleAcceptJoinGroup(
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
        {context.state.showUsergroups &&
          context.state.usergroups.map((item, idx) => {
            return (
              <div className="elementsRap">
                <p>
                  <b>{item.group_name}</b>
                </p>

                <button
                  className="mybuttonnn"
                  onClick={() => context.methods.handleViewgroup(item.group_id)}
                >
                  view group
                  {context.state.showCurrentGroupPath && (
                    <Link to={context.state.currentGroupPath}> view group</Link>
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
        {context.state.showGroups &&
          context.state.allGroups.map((item, idx) => {
            return (
              <div className="groupRapRap">
                <p>
                  <b>{item.group_name}</b>
                </p>
                <p>Description {item.group_description}</p>
                <button
                  className="mybuttonnn"
                  onClick={() =>
                    context.methods.handleJoinGroup(item.id, item.owner_id)
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
