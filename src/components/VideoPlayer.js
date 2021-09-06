import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { SocketContext } from '../context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = (props) => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    setStream,

    // setsomething,
  } = useContext(SocketContext);
  const classes = useStyles();

  useEffect(() => {
    console.log(props);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
  }, []);

  return (
    <div>
      <button
        className="mybuttonnn"
        onClick={() =>
          callUser(
            props.videoCallData.room,
            props.videoCallData.messageReceiverId
          )
        }
      >
        actuuly start video call
      </button>

      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || 'Name'}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {call.name || 'Name'}
              </Typography>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
      </Grid>
    </div>
  );
};

export default VideoPlayer;
