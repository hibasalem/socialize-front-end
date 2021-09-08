import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import CallEndIcon from '@material-ui/icons/CallEnd';

import { SocketContext } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Notifications = (props) => {
  const {
    answerCall,
    call,
    callAccepted,
    setCall,
    socket,
    leaveCall,
    callEnded,
  } = useContext(SocketContext);

  const classes = useStyles();

  const handelClick = () => {
    props.handleHideVideoCall();
    leaveCall();
  };

  return (
    <>
      {!(call.from == props.user.userID) &&
        call.isReceivingCall &&
        !callAccepted && (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h4>{call.name} is calling:</h4>
            <Button
              variant="contained"
              color="default"
              className="newbuttn3"
              startIcon={<PhoneCallbackIcon />}
              variant="outlined"
              onClick={() => answerCall()}
            >
              Answer
            </Button>
          </div>
        )}
      {console.log('iam here ')}
      {callAccepted && !callEnded && (
        <Button
          variant="contained"
          color="default"
          className="newbuttn3"
          startIcon={<CallEndIcon />}
          variant="outlined"
          onClick={() => handelClick()}
        >
          Hang Up
        </Button>
      )}
    </>
  );
};

export default Notifications;
