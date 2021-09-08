import React, { Component,useEffect } from 'react';
import Friend from './Friend';

export default function AddFriends (props) {
  useEffect(()=>{
    props.getFollowing();
  },[])


    return (
      <div className="mainDiv">
        <h2 className="profileName">All users</h2>
        <div className="peopleCont">
          {/* {console.log(this.props.allusers)}
          {console.log(this.props.followingIds)} */}

          {props.allusers.map((item, idx) => {
            if (item.id !== props.userID) {
              return (
                <Friend
                  targetProfile={props.targetProfile}
                  key={idx}
                  item={item}
                  handleAddFriend={props.handleAddFriend}
                  disableIt={
                   props.followingIds.includes(item.auth_id)
                  }
                />
              );
            }
          })}
        </div>
      </div>
    );
}


