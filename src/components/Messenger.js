import React, { useState } from 'react';
import Message from './Message';
import VideoPlayer from './VideoPlayer';

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
        <input type="submit" />
      </form>

      <button
        className="mybuttonnn"
        onClick={() => props.handleShowVideoCall()}
      >
        start video call
      </button>

      {props.showVideoCall && (
        <div>
          <VideoPlayer videoCallData={props.videoCallData} />
        </div>
      )}
    </div>
  );

}