import React, { useState } from 'react';
import Message from './Message';
import VideoPlayer from './VideoPlayer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

export default function Messenger(props) {
  const [messageContent, setMessageContent] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    props.handleSendMessage(messageContent);
  };

  return (
    <div>
      <div className="Meessages">
        {props.showMessages && <Message allMessages={props.allMessages} />}
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e);
          e.target.reset();
        }}
      >
        <TextField
          id="standard-basic"
          label="Type Your Message Here"
          type="text"
          required
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        />

        <Button
          type="submit"
          color="default"
          startIcon={<SendRoundedIcon />}
          className="newbuttn3"
          variant="outlined"
        >
          send
        </Button>
      </form>
      <Button
        color="default"
        className="newbuttn3"
        startIcon={<CameraAltIcon />}
        variant="outlined"
        onClick={() => props.handleShowVideoCall()}
      >
        Preview Camera
      </Button>

      {props.showVideoCall && (
        <div>
          <VideoPlayer videoCallData={props.videoCallData} />
        </div>
      )}
    </div>
  );
}
