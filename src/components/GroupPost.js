import React from 'react';
import Image from 'react-bootstrap/Image';

export default function GroupPost(props) {
  const postLike = (id, groupId) => {
    props.groupPostLike(id, groupId);
  };
  return (
    <div>
      {/* {console.log(props.item)} */}
      <div className="post">
        <h4 className="poster">
          <Image
            src={props.item.poster_image_url}
            roundedCircle
            height="30px"
          />
          &nbsp;
          {props.item.poster_name}
        </h4>

        <p className="posterDate">
          at {new Date(props.item.send_time).toLocaleString()}
        </p>
        <p>{props.item.content}</p>
        <br />
        {props.item.image_url && (
          <img src={props.item.image_url} width="100%" />
        )}
      </div>

      <button
        className="like"
        onClick={() =>
          postLike(props.item.id, props.item.g_groups_id)
        }
      >
        Like
      </button>
      <p>{props.item.likes}&#128077;</p>
    </div>
  );
}
