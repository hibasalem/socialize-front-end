import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
            <h1>{call.name} is calling:</h1>
            <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button>
          </div>
        )}

      {callAccepted && !callEnded && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PhoneDisabled fontSize="large" />}
          fullWidth
          onClick={() => handelClick()}
        >
          Hang Up
        </Button>
      )}
    </>
  );
};

export default Notifications;
