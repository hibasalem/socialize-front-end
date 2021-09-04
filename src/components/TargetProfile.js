import React, { useContext } from 'react';
import '../App.css';
import Image from 'react-bootstrap/Image';
import { DataContext } from '../context/data';

export default function TargetProfile() {
  const context = useContext(DataContext);

  return (
    <div className="mainDiv">
      <div className="mainDiv">
        <h2 className="profileName">
          {context.state.targetedProfileInfo.firstname}
          {context.state.targetedProfileInfo.lastname}
        </h2>
      </div>
      <div className="following">
        <h2>Following</h2>
        {context.state.targetedFollowing.map((element, index) => {
          return (
            <div key={index}>
              <Image src={element.image_url} roundedCircle height="30px" />
              &nbsp;
              {element.firstname} {element.lastname}
            </div>
          );
        })}
      </div>

      <div className="followers">
        <h2>Followers</h2>
        {context.state.targetedFollowers.map((element, index) => {
          return (
            <div key={index}>
              <Image src={element.image_url} roundedCircle height="30px" />
              &nbsp;
              {element.firstname} {element.lastname}
            </div>
          );
        })}
      </div>

      <div>
        {context.state.targetedPosts.map((element, index) => {
          // {
          //   console.log(context.state.targetedPosts);
          // }
          return (
            <div className="postDiv" key={index}>
              <div className="post">
                <h4 className="poster">
                  <Image
                    src={element.poster_image_url}
                    roundedCircle
                    height="30px"
                  />
                  &nbsp;
                  {element.poster_name}
                </h4>
                <p className="posterDate">
                  at {new Date(element.send_time).toLocaleString()}
                </p>
                {element.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
