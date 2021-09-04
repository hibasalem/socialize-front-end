import React, { useContext } from 'react';
import Image from 'react-bootstrap/Image';
import { DataContext } from '../context/data';

export default function GroupPost(props) {
  const context = useContext(DataContext);
  const postLike = (id, groupId) => {
    context.methods.groupPostLike(id, groupId);
  };
  return (
    <div key={props.key}>
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
        onClick={() => postLike(props.item.id, props.item.g_groups_id)}
      >
        Like
      </button>
      <p>{props.item.likes}&#128077;</p>
    </div>
  );
}
