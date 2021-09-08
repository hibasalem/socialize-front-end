import React, { Component, useState } from 'react';
import CommentForm from './CommentForm';
import Image from 'react-bootstrap/Image';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FcLike } from 'react-icons/fc';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

export default function Post(props) {
  const [ShowComments, setShowComments] = useState(false);
  const like = (id) => {
    props.like(id);
  };

  return (
    <div>
      <div>
        <div className="post">
          <p className="poster">
            <Image
              src={props.poster_image_url}
              roundedCircle
              height="50px"
              width="50px"
              className="posterImg"
            />
            &nbsp;
            <b className="posterName">&nbsp;{props.poster_name}</b>
            <br />
            <p className="posterDate">
              &nbsp;
              {new Date(props.post_time).toLocaleString()}
            </p>
          </p>
          <p className="postcontent">{props.postContent}</p>

          <br />
          {props.image_url && (
            <img className="postImg" src={props.image_url} width="100%" />
          )}

          <p>
            <hr />
            <div className="likeContainer">
              <IconButton
                component="span"
                className="like"
                onClick={() => like(props.postID)}
              >
                <ThumbUpAltOutlinedIcon className="likeicon" />
              </IconButton>
              <p className="likesNumber">
                {props.post_likes ? props.post_likes.length : 0}
              </p>
            </div>

            <div className="likeContainer">
              <IconButton component="span" className="like">
                <CommentOutlinedIcon
                  onClick={() => setShowComments(!ShowComments)}
                  className="likeicon"
                />
              </IconButton>{' '}
            </div>
            <hr />
          </p>

          <div>
            {ShowComments && (
              <div>
                <CommentForm comment={props.comment} id={props.postID} />
                {props.comments.map((item, index) => {
                  let value;
                  if (props.postID === item.post_id) {
                    value = (
                      <div className="comment">
                        <p className="poster">
                          <Image
                            src={item.commenter_image_url}
                            roundedCircle
                            height="40px"
                            width="40px"
                          />
                          &nbsp;
                          <p className="commenterName">
                            &nbsp;<b>{item.commenter_name}</b>
                          </p>
                          <p className="commeentDate">
                            &nbsp;{new Date(item.send_time).toLocaleString()}
                          </p>
                        </p>
                        <div className="commentContent" key={index}>
                          {item.content}
                        </div>
                      </div>
                    );
                  }
                  return value;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
