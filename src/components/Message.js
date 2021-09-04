import React, { useContext } from 'react';

import { DataContext } from '../context/data';

function Message() {
  const context = useContext(DataContext);

  return (
    <div>
      {context.state.allMessages.map((item, idx) => {
        return (
          <>
            <p key={idx}>
              <b>{item.sender_name}</b> {item.content},{' '}
              {new Date(item.send_time).toLocaleString()}
            </p>
          </>
        );
      })}
    </div>
  );
}

export default Message;
