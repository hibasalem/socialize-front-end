import React from 'react';
import CommentForm from './CommentForm';
import Image from 'react-bootstrap/Image';

export default function Post(props) {
  const like = (id) => {
    props.like(id);
  };

  return (
    <div>
      <div>
        <div className="post">
          <h4 className="poster">
            <Image src={props.poster_image_url} roundedCircle height="30px" />
            &nbsp;
            {props.poster_name}
          </h4>
          <p className="posterDate">
            at {new Date(props.post_time).toLocaleString()}
          </p>
          {props.postContent}
          <br />
          {props.image_url && <img src={props.image_url} width="100%" />}
        </div>
        <button className="like" onClick={() => like(props.postID)}>
          Like
        </button>
        <p>{props.post_likes}&#128077;</p>
      </div>

      <CommentForm comment={props.comment} id={props.postID} />

      <div>
        {console.log(props.comments)}
        {props.comments.map((item, index) => {
          let value;
          if (props.postID === item.post_id) {
            value = (
              <div className="comment">
                <h5 className="poster">
                  <Image
                    src={item.commenter_image_url}
                    roundedCircle
                    height="30px"
                  />
                  &nbsp;
                  {item.commenter_name}
                </h5>
                <p className="commeentDate">
                  at {new Date(item.send_time).toLocaleString()}
                </p>
                <div key={index}>{item.content}</div>
              </div>
            );
          }
          return value;
        })}
      </div>
    </div>
  );
}
