import React, { Component, useEffect, useContext } from 'react';
import Posts from './Posts';
import Messenger from './Messenger';
import Image from 'react-bootstrap/Image';

import { DataContext } from '../context/data';

function Profile() {
  const context = useContext(DataContext);

  useEffect(() => {
    context.methods.getFollowing();
    context.methods.getFollowers();
  }, []);

  return (
    <div className="mainDiv">
      {/* {console.log('hello', props.user)} */}

      <h2 className="profileName">
        <Image src={context.state.user.image_url} roundedCircle height="70px" />
        &nbsp; &nbsp;
        {context.state.user.firstname} {context.state.user.lastname}
      </h2>

      <p>{context.state.user.age}</p>
      <p>{context.state.user.gender}</p>
      <div className="following">
        <h2>Following</h2>
        {context.state.showFollowing &&
          context.state.allFollowing.map((item) => {
            return (
              <>
                {/* {console.log(props.allFollowing)} */}

                <p>
                  <Image src={item.image_url} roundedCircle height="30px" />
                  &nbsp;
                  {item.firstname} {item.lastname}
                </p>
                <button
                  className="mybuttonnn"
                  onClick={() => context.methods.handleShowMessenger(item.id)}
                >
                  Chat
                </button>
              </>
            );
          })}
      </div>

      <div className="followers">
        <h2>Followers</h2>

        {context.state.showFollowers &&
          context.state.allFollowers.map((item) => {
            return (
              <>
                {/* {console.log(props.allFollowers)} */}
                <p>
                  <Image src={item.image_url} roundedCircle height="30px" />
                  &nbsp;
                  {item.firstname} {item.lastname}
                </p>
                <button
                  className="mybuttonnn"
                  onClick={() => context.methods.handleShowMessenger(item.id)}
                >
                  Chat
                </button>
              </>
            );
          })}
      </div>
      <Posts />
      {context.state.showMessenger && (
        <div className="Messenger">
          <h2>Messenger</h2>
          <Messenger />
        </div>
      )}
    </div>
  );
}

export default Profile;
