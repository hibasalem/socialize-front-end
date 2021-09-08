import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const SERVER_URL = 'localhost:5000/';

const SERVER_URL = 'https://socialize401.herokuapp.com/';
// const SERVER_URL = 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

const ContextProvider = ({ children, user, videoCallData }) => {
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
    socket.on('me', () => setMe(user.userID));
    console.log(user);
    socket.on('callUser2', ({ from, name: callerName, signal, hi }) => {
      console.log(hi, 'should be hi 2');
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('answerCall', data);

      socket.emit('answerCall', { signal: data, to: videoCallData.room });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log(userVideo.current.srcObject, 'currentStream anseer');
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (room, messageReceiverId) => {
    console.log('call useer function worked ');
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      {
        console.log('calluser', data);
      }
      socket.emit('callUser', {
        messageReceiverId: messageReceiverId,
        userToCall: room,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log(userVideo.current.srcObject, 'currentStream');
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    console.log('leavecall');
    setCallEnded(true);
    connectionRef.current.destroy();
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
        setStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
