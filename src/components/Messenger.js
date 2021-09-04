import React, { useState, useContext } from 'react';
import Message from './Message';

import { DataContext } from '../context/data';

function Messenger() {
  const context = useContext(DataContext);
  const [messageContent, setMessageContent] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    context.methods.handleSendMessage(messageContent);
  }

  return (
    <div>
      <div className="Meessages">
        {/* {console.log('hiii', props.allMessages)} */}
        {context.state.showMessages && <Message />}
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
    </div>
  );
}

export default Messenger;
