import React, { Component, useEffect } from 'react';
import CommentForm from './CommentForm';
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
      <div className="groupMembers">
        {console.log(props.groupMembers)}
        <h2>Group members</h2>
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

      <PostForm
        className="form3"
        post={props.post}
        groupId={props.currentGroupContent.id}
      />
      {props.showCurrentGroupContent && (
        <>
          <div>
            <h2 className="profileName2">
              {props.currentGroupContent.group_name}
            </h2>
          </div>
        </>
      )}
      {/* {console.log(props.GroupPost)} */}
      {props.showGroupPosts && props.groupPosts.length>0&&
        props.groupPosts.map((item, idx) => {
          return (
            <>
              <div className="postDiv">
                <GroupPost
                  groupPostLike={props.groupPostLike}
                  item={item}
                  key={idx}
                  groupPostsLikes={props.groupPostsLikes}
                />
                <CommentForm comment={props.comment} id={item.id} />
                {/* {console.log('hii', props.groupComments)} */}
                {props.showGroupComments &&
                  props.groupComments.map((comment, index) => {
                    let value;
                    if (item.id === comment.g_post_id) {
                      value = (
                        <div className="comment">
                          <h5 className="poster">
                            <Image
                              src={comment.commenter_image_url}
                              roundedCircle
                              height="30px"
                              width="30px"
                            />
                            &nbsp;
                            {comment.g_commenter_name}
                          </h5>

                          <p className="commeentDate">
                            at {new Date(comment.send_time).toLocaleString()}
                          </p>

                          <div key={index}>{comment.content}</div>
                        </div>
                      );
                    }
                    return value;
                  })}
              </div>
            </>
          );
        })}
        {props.groupPosts.length===0&&<p className="postDiv3">This Group Has No Posts Yet</p>}
    </div>
  );
}
