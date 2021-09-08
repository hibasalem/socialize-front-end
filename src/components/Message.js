import React from 'react';
import Image from 'react-bootstrap/Image';

export default function Message(props) {
  return (
    <div>
      {props.allMessages.map((item, idx) => {
        return (
          <>
            {console.log(item)}
            <p key={idx}>
              <Image
                src={item.image_url}
                roundedCircle
                height="40px"
                width="40px"
              />
              &nbsp; &nbsp;
              {/* <b>{item.sender_name}</b> */}
              {item.content}
              <p className="time">
                {new Date(item.send_time).toLocaleString().slice(10, 21)}
              </p>
            </p>
          </>
        );
      })}
    </div>
  );
}
