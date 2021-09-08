import React, { Component, useEffect } from 'react';
import GroupPost from './GroupPost';
import PostForm from './PostForm';
import Image from 'react-bootstrap/Image';

export default function CurrentGroup(props) {
  useEffect(() => {
    props.getAllGroupPosts(props.currentGroupID);
    props.getGroupMembers(props.currentGroupID);
    props.getAllGroupComments();
  }, []);

  return (
    <div className="mainDiv">
      {props.showCurrentGroupContent && (
        <>
          <div>
            <h2 className="profileName3">
              {props.currentGroupContent.group_name}
            </h2>
          </div>
        </>
      )}
      <div className="groupMembers">
        {console.log(props.groupMembers)}
        <h4> Group members</h4>
        {props.showGroupMembers &&
          props.groupMembers.map((item, idx) => {
            return (
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
            );
          })}
      </div>
      <div>
        <PostForm
          className="form3"
          post={props.post}
          groupId={props.currentGroupContent.id}
        />
      </div>

      {/* {console.log(props.GroupPost)} */}

      {props.showGroupPosts &&
        props.groupPosts.map((item, idx) => {
          return (
            <>
              <div className="feedpage">
                <div className="postCont" key={idx}>
                  <GroupPost
                    groupPostLike={props.groupPostLike}
                    item={item}
                    key={idx}
                    groupPostsLikes={props.groupPostsLikes}
                    comment={props.comment}
                    id={item.id}
                    showGroupComments={props.showGroupComments}
                    groupComments={props.groupComments}
                  />
                  
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}
