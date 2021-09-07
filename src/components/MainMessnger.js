import React, { useState,useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Messenger from './Messenger';
import { ContextProvider } from '../context';
import Notifications from './Notifications';

export default function MainMessnger(props) {

  const [showVideoCall, setShowVideoCall] = useState(false);


  const handleShowVideoCall = () => {
    setShowVideoCall(true);
  };

  const handleHideVideoCall = () => {
    setShowVideoCall(false);
  };
  useEffect(()=>{
    props.getFollowing();
  },[])


    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="following">
          <h2>people</h2>
          {props.showFollowing &&
            props.allFollowing.map((item, idx) => {
              return (
                <>
                  <p
                    key={idx}
                    onClick={() =>
                      props.handleShowMessenger(item.receiverid)
                    }
                  >
                    <Image
                      src={item.image_url}
                      roundedCircle
                      height="30px"
                      width="30px"
                    />
                    &nbsp;
                    {item.firstname} {item.lastname}
                  </p>
                </>
              );
            })}
        </div>

        <ContextProvider
          videoCallData={props.videoCallData}
          user={props.user}
        >
          {props.showMessenger && (
            <div className="Messenger2">
              <h2>Messenger</h2>
              <Messenger
                user={props.user}
                handleSendMessage={props.handleSendMessage}
                allMessages={props.allMessages}
                showMessages={props.showMessages}
                videoCallData={props.videoCallData}
                handleShowVideoCall={handleShowVideoCall}
                showVideoCall={showVideoCall}
              />

              <Notifications
                user={props.user}
                handleHideVideoCall={handleHideVideoCall}
              />
            </div>
          )}
        </ContextProvider>
      </div>
    );
  
}
