import React, { Component, useEffect } from 'react';
import Friend from './Friend';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

export default function AddFriends(props) {
  useEffect(() => {
    props.getFollowing();
  }, []);

  return (
    <div className="mainDiv">
      <h2 className="profileName">Find a Friend</h2>
      <div className="peopleCont">
        {console.log('users', props.allusers)}
        {/* {console.log(this.props.followingIds)}  */}

        {props.allusers.map((item, idx) => {
          if (item.id !== props.userID) {
            return (
              <Friend
                socket={props.socket}
                targetProfile={props.targetProfile}
                key={idx}
                item={item}
                handleAddFriend={props.handleAddFriend}
                disableIt={props.followingIds.includes(item.id) ? true : false}
              />
            );
          }
        })}
      </div>

      <Fab
        className="Fab2"
        aria-label="add"
        onClick={() => window.scrollTo(0, 0)}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </div>
  );
}
