import React, { useEffect, useContext } from 'react';
import CommentForm from './CommentForm';
import GroupPost from './GroupPost';
import PostForm from './PostForm';
import Image from 'react-bootstrap/Image';
import { DataContext } from '../context/data';

export default function CurrentGroup() {
  const context = useContext(DataContext);

  useEffect(() => {
    context.methods.getAllGroupPosts(context.state.currentGroupID);
    context.methods.getGroupMembers(context.state.currentGroupID);
    context.methods.getAllGroupComments();
  }, []);

  return (
    <div className="mainDiv">
      <div className="groupMembers">
        <h2>Group members</h2>
        {context.state.showGroupMembers &&
          context.state.groupMembers.map((item, idx) => {
            return (
              <p>
                <Image src={item.image_url} roundedCircle height="30px" />
                &nbsp;
                {item.firstname} {item.lastname}
              </p>
            );
          })}
      </div>

      <PostForm className="form3" post={context.methods.handelGroupPost} />

      {context.state.showCurrentGroupContent && (
        <>
          <div>
            <h2 className="profileName2">
              {context.state.currentGroupContent.group_name}
            </h2>
          </div>
        </>
      )}

      {/* {console.log(props.GroupPost)} */}
      {context.state.showGroupPosts &&
        context.state.groupPosts.map((item, idx) => {
          return (
            <>
              <div className="postDiv">
                <GroupPost item={item} key={idx} />
                <CommentForm id={item.id} />
                {/* {console.log('hii', props.groupComments)} */}
                {context.state.showGroupComments &&
                  context.state.groupComments.map((comment, index) => {
                    let value;
                    if (item.id === comment.g_post_id) {
                      value = (
                        <div className="comment">
                          <h5 className="poster">
                            <Image
                              src={comment.commenter_image_url}
                              roundedCircle
                              height="30px"
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
    </div>
  );
}
