import React from 'react';
import '../App.css';
import Image from 'react-bootstrap/Image';

export function TargetProfile(props){
  
    return (
      <div className="mainDiv">
        <div className="mainDiv">
          <h2 className="profileName">
            {props.targetedProfileInfo.firstname} {props.targetedProfileInfo.lastname}
          </h2>
        </div>
        <div className="following">
          <h2>Following</h2>
          {props.targetedFollowing.map((element, index) => {
            return (
              <div key={index}>
                <Image
                  src={element.image_url}
                  roundedCircle
                  height="30px"
                  width="30px"
                />
                &nbsp;
                {element.firstname} {element.lastname}
              </div>
            );
          })}
        </div>

        <div className="followers">
          <h2>Followers</h2>
          {props.targetedFollowers.map((element, index) => {
            return (
              <div key={index}>
                <Image
                  src={element.image_url}
                  roundedCircle
                  height="30px"
                  width="30px"
                />
                &nbsp;
                {element.firstname} {element.lastname}
              </div>
            );
          })}
        </div>

        <div>
          {props.targetedPosts.map((element, index) => {
            {
              console.log(props.targetedPosts);
            }
            return (
              <div className="postDiv" key={index}>
                <div className="post">
                  <h4 className="poster">
                    <Image
                      src={element.poster_image_url}
                      roundedCircle
                      height="30px"
                      width="30px"
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

export default TargetProfile;
