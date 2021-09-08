import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Group from './Group';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Groups(props) {
  const classes = useStyles();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [current, setCurrent] = useState('joined');

  useEffect(() => {
    props.getGroupRequests();
    props.getAllGroups();
    props.getUsergroups();
  }, []);

  const createGroup = (e) => {
    e.preventDefault();
    props.handleCreateGroup(groupName, groupDescription);
  };

  return (
    <div className="mainDiv">
      <div className="createGroup">
        <form
          className="groupForm"
          onSubmit={(e) => {
            createGroup(e);
          }}
        >
          {/* <label className="createGroup">Create a group</label> */}
          <TextField
            id="standard-basic"
            label="Enter Group Name"
            type="text"
            required
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          &nbsp; &nbsp; &nbsp;
          <TextField
            id="standard-basic"
            label="Enter Description"
            type="text"
            required
            onChange={(e) => {
              setGroupDescription(e.target.value);
            }}
          />
          &nbsp; &nbsp; &nbsp;
          <Button type="submit" className="newbuttn3" variant="outlined">
            Create Group
          </Button>
        </form>
      </div>

      <div className="groupsRequests">
        <h4>
          <b>Groups requests</b>
          <br />
          <br />
        </h4>
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
                    {item.firstname} {item.lastname}&nbsp;
                  </b>
                  requsted to join&nbsp;
                  <b> {item.group_name}</b>
                </p>
                <Button
                  className="newbuttn2"
                  variant="outlined"
                  color="default"
                  onClick={() =>
                    props.handleAcceptJoinGroup(
                      item.group_id,
                      item.member_id,
                      item.owner_id
                    )
                  }
                >
                  Accept
                </Button>
              </div>
            );
          })}
      </div>

      <div className="groupsCont">
        <div>
          <ButtonGroup variant="text" aria-label="text primary button group">
            <Button className="newbuttn" onClick={() => setCurrent('joined')}>
              Joined Groups
            </Button>
            <Button className="newbuttn" onClick={() => setCurrent('all')}>
              Other Groups
            </Button>
          </ButtonGroup>
        </div>

        {current == 'joined' && (
          <div>
            <h4>
              <br />
              <b>Joined groups</b>
              <br />
            </h4>
            {props.showUsergroups &&
              props.usergroups.map((item, idx) => {
                return (
                  <div className="groupRapRap">
                    {console.log(props.usergroups)}
                    <p>
                      <b>{item.group_name}</b>
                    </p>
                    <p>{item.group_description}</p>

                    <Link
                      to={`/groups/${item.group_id}`}
                      onClick={() => {
                        props.handleViewgroup(item.group_id);
                      }}
                      className="links"
                    >
                      <Button className="newbuttn3" variant="outlined">
                        View Group
                      </Button>
                    </Link>
                  </div>
                );
              })}
          </div>
        )}

        {current == 'all' && (
          <div>
            <h4>
              <br />
              <b>Other groups </b>
            </h4>

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
        )}
      </div>

      <Fab
        className="Fab2"
        aria-label="add"
        onClick={() => window.scrollTo(0, 0)}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </div>
  );
}
