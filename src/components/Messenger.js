import React, { useState } from 'react';
import Message from './Message';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';

export default function Messenger(props) {

  const [messageContent, setMessageContent] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    props.handleSendMessage(messageContent);
  };


  return (
    <div>
      <div className="Meessages">
        {props.showMessages && (
          <Message allMessages={props.allMessages} />
        )}
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e);
        }}
      >
        <input
          type="text"
          placeholder="Type Your Message Here"
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        />
         <Button type="submit" variant="contained">send</Button>
      </form>
      <Button variant="contained"  onClick={() => props.handleShowVideoCall()}>start video call</Button>
      {/* <button
        className="mybuttonnn"
        onClick={() => props.handleShowVideoCall()}
      >
        start video call
      </button> */}

      {props.showVideoCall && (
        <div>
          <VideoPlayer videoCallData={props.videoCallData} />
        </div>
      )}
    </div>
  );

}