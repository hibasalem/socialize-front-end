import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const SERVER_URL = 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

const ContextProvider = ({ children, user }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState(`${user.firstname} ${user.lastname}`);
  const [call, setCall] = useState({});
  const [me, setMe] = useState(user.userID);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);
    //     console.log(myVideo);

    //     myVideo.current.srcObject = currentStream;
    //   });
    socket.on('me', () => setMe(user.userID));
    console.log(user);
    // setName(`${user.firstName} ${user.lastName}`);
    // socket.on('callUser', ({ from, name: callerName, signal, hi }) => {
    //   console.log(hi, 'should be hi 2');
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(myVideo);

        myVideo.current.srcObject = currentStream;
      });

    console.log('call useer function worked ');
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
      // console.log('call useer function worked ', {
      //   userToCall: id,
      //   signalData: data,
      //   from: me,
      //   name,
      // });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        setCall,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
