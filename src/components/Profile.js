import React, { useEffect } from 'react';
import Posts from './Posts';
import Messenger from './Messenger';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
function Profile(props) {
  useEffect(() => {
    props.getFollowing();
    props.getFollowers();
  }, [])


  return (
    <div className="mainDiv">
      {/* {console.log('hello', props.user)} */}

      <h2 className="profileName">
        <Image
          src={props.user.image_url}
          roundedCircle
          height="70px"
          width="70px"
        />
        &nbsp; &nbsp;
        {props.user.firstname} {props.user.lastname}
      </h2>

      <p>{props.user.age}</p>
      <p>{props.user.gender}</p>

      <div className="following">
        <h2>Following</h2>
        {props.showFollowing &&
          props.allFollowing.map((item, idx) => {
            return (
              <div key={idx}>
                {/* {console.log(props.allFollowing)} */}

                <p>
                  <Image
                    src={item.image_url}
                    roundedCircle
                    height="30px"
                    width="30px"
                  />
                  &nbsp;
                  {item.firstname} {item.lastname}
                </p>
                <Button variant="contained"  onClick={() =>
                    props.handleShowMessenger(item.receiverid)
                  }>Chat</Button>
              </div>
            );
          })}
      </div>

      <div className="followers">
        <h2>Followers</h2>

        {props.showFollowers &&
          props.allFollowers.map((item, idx) => {
            return (
              <div key={idx}>
                <p>
                  <Image
                    src={item.image_url}
                    roundedCircle
                    height="30px"
                    width="30px"
                  />
                  &nbsp;
                  {item.firstname} {item.lastname}
                </p>
                <Button variant="contained"  onClick={() => props.handleShowMessenger(item.senderid)}>Chat</Button>
                {/* <button
                  className="mybuttonnn"
                  onClick={() => props.handleShowMessenger(item.senderid)}
                >
                  Chat
                </button> */}
              </div>
            );
          })}
      </div>
      <Posts
        userID={props.userID}
        like={props.like}
        comments={props.comments}
        comment={props.comment}
        allPosts={props.allPosts}
        socket={props.socket}
      />
      {props.showMessenger && (
        <div className="Messenger">
          <h2>Messenger</h2>
          <Messenger
            handleSendMessage={props.handleSendMessage}
            allMessages={props.allMessages}
            showMessages={props.showMessages}
          />
        </div>
      )}
    </div>
  );

}

export default Profile;
