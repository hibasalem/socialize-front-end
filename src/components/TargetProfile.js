import React, { Component } from 'react';
import '../App.css';

export class TargetProfile extends Component {
  render() {
    return (
      <div className="mainDiv">
        <div className="mainDiv">
          <h2 className="profileName">
            {this.props.targetedProfileInfo.firstname}
            {this.props.targetedProfileInfo.lastname}
          </h2>
        </div>
        <div className="following">
          <h2>Following</h2>
          {this.props.targetedFollowing.map((element, index) => {
            return (
              <div key={index}>
                {element.firstname} {element.lastname}
              </div>
            );
          })}
        </div>

        <div className="followers">
          <h2>Followers</h2>
          {this.props.targetedFollowers.map((element, index) => {
            return (
              <div key={index}>
                {element.firstname} {element.lastname}
              </div>
            );
          })}
        </div>

        <div>
          {this.props.targetedPosts.map((element, index) => {
            return (
              <div className="postDiv" key={index}>
                <div className="post">
                  <h4 className="poster">{element.poster_name}</h4>
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
}

export default TargetProfile;