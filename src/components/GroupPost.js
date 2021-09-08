import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FcLike } from 'react-icons/fc';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import CommentForm from './CommentForm';

export default function GroupPost(props) {
  const [ShowComments, setShowComments] = useState(false);

  const postLike = (id, groupId) => {
    props.groupPostLike(id, groupId);
  };

  return (
    <div>
      {console.log(props.item)}
      <div className="post">
        <p className="poster">
          <Image
            src={props.item.poster_image_url}
            roundedCircle
            height="50px"
            width="50px"
          />
          &nbsp;
          <b className="posterName">&nbsp;{props.item.poster_name}</b>
          <br />
          <p className="posterDate">
            &nbsp;
            {new Date(props.item.send_time).toLocaleString()}
          </p>
        </p>

        <p className="postcontent">{props.item.content}</p>
        <br />
        {props.item.image_url && (
          <img className="postImg" src={props.item.image_url} width="100%" />
        )}

        <p>
          <hr />
          <div className="likeContainer">
            <IconButton
              component="span"
              className="like"
              onClick={() => postLike(props.item.id, props.item.g_groups_id)}
            >
              <ThumbUpAltOutlinedIcon className="likeicon" />
            </IconButton>
            <p className="likesNumber">
              {props.item.likes ? props.item.likes.length : 0}
            </p>
          </div>

          <div className="likeContainer">
            <IconButton component="span" className="like">
              <CommentOutlinedIcon
                onClick={() => setShowComments(!ShowComments)}
                className="likeicon"
              />
            </IconButton>
          </div>
          <hr />
        </p>

        {ShowComments && <CommentForm comment={props.comment} id={props.id} />}

        {props.showGroupComments &&
          props.groupComments.map((comment, index) => {
            let value;
            if (props.id === comment.g_post_id) {
              value = (
                <div className="comment">
                  <p className="poster">
                    <Image
                      src={comment.commenter_image_url}
                      roundedCircle
                      height="40px"
                      width="40px"
                    />
                    &nbsp;
                    <p className="commenterName">
                      <b> {comment.g_commenter_name}</b>
                    </p>
                    <p className="commeentDate">
                      &nbsp;{new Date(comment.send_time).toLocaleString()}
                    </p>
                  </p>

                  <div className="commentContent" key={index}>
                    {comment.content}{' '}
                  </div>
                </div>
              );
            }
            return value;
          })}
      </div>
    </div>
  );
}
