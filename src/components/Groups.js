import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Group from './Group';

export default function Groups(props) {

  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(()=>{
    props.getGroupRequests();
    props.getAllGroups();
    props.getUsergroups();
  },[])

  const createGroup = (e) => {
    e.preventDefault();
    props.handleCreateGroup(
      groupName,
      groupDescription
    );
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
              setGroupName(e.target.value);              
            }}
          />
          <input
            type="text"
            placeholder="Enter Description"
            onChange={(e) => {
              setGroupDescription(e.target.value);
            }}
          />
          <input type="submit" />
        </form>
        <div className="groupsRequests">
          <h2>
            <b>Groups requests</b>
          </h2>
          {/* {console.log(props.GroupRequests)} */}
          {props.showGroupsRequests &&
            props.GroupRequests.map((item, idx) => {
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
                      props.handleAcceptJoinGroup(
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
          {props.showUsergroups &&
            props.usergroups.map((item, idx) => {
          
              return (
                <div className="elementsRap">
                  <p>
                    <b>{item.group_name}</b>
                  </p>

                  <Link to={`/groups/${item.group_id}`} onClick={()=>{props.handleViewgroup(item.group_id)}}> view group</Link>

                </div>
              );
            })}
        </div>{' '}
        <div className="groupsCont">
          <h2>
            <b>All groups </b>
          </h2>
          {/* {console.log(props.usergroups)}
          {console.log(props.allGroups)} */}

          {props.showGroups &&
            props.allGroups.map((item, idx) => {
              return (
                <div className="groupRapRap">
                  <Group
                    handleJoinGroup={props.handleJoinGroup}
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


