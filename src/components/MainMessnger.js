import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Messenger from './Messenger';
import { ContextProvider } from '../context';
import Notifications from './Notifications';
import { NoteRounded } from '@material-ui/icons';

export default function MainMessnger(props) {
  let followingIDs = [];
  let notRepeated = [];
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [people, setPeople] = useState([]);
  const [showPeople, setShowPeople] = useState(false);

  const handleShowVideoCall = () => {
    setShowVideoCall(true);
  };

  const handleHideVideoCall = () => {
    setShowVideoCall(false);
  };
  useEffect(() => {
    props.getFollowers();
    props.getFollowing();
  }, []);

  return (
    <div className="messanger">
      <div className="dk"></div>
      {!props.showMessenger && <p className="lastClass"> Choose a person to start a chat with </p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="following">
        <h2>People</h2>
        {props.showFollowing &&
          props.allFollowing.length > 0 &&
          props.allFollowing.map((item, idx) => {
            return (
              <>
                <p
                  key={idx}
                  onClick={() =>
                    props.handleShowMessenger(
                      item.receiverid,
                      item.firstname,
                      item.lastname
                    )
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
        {props.allFollowing.length === 0 && <p>No People to Chat with</p>}
      </div>

      <ContextProvider videoCallData={props.videoCallData} user={props.user}>
        {props.showMessenger && (
          <div className="Messenger2">
            <h2>{props.messageReceiverName}</h2>
            <br />
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
