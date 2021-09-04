import React from 'react';
import Friend from './Friend';

export default function AddFriends(props) {
  return (
    <div>
      <div className="mainDiv">
        <h2 className="profileName">All users</h2>
        <div className="peopleCont">
          {props.allusers.map((item, idx) => {
            if (item.id !== props.userID) {
              return (
                <Friend
                  targetProfile={props.targetProfile}
                  key={idx}
                  item={item}
                  handleAddFriend={props.handleAddFriend}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
