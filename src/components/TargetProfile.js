import React, { useState } from 'react';
import '../App.css';
import Image from 'react-bootstrap/Image';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function TargetProfile(props) {
  const [current, setCurrent] = useState('following');
  const classes = useStyles();

  return (
    <div className="mainDiv">
      <div className="person">
        <h2 className="profileName">
          <Image
            src={props.targetedProfileInfo.image_url}
            roundedCircle
            height="70px"
            width="70px"
          />
          &nbsp; &nbsp;
          {props.targetedProfileInfo.firstname}
          &nbsp;
          {props.targetedProfileInfo.lastname}
        </h2>
      </div>

      <div>
        <ButtonGroup variant="text" aria-label="text primary button group">
          <Button className="newbuttn" onClick={() => setCurrent('following')}>
            Following
          </Button>
          <Button className="newbuttn" onClick={() => setCurrent('followers')}>
            Followers
          </Button>
        </ButtonGroup>
      </div>

      {current == 'following' && (
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
      )}

      {current == 'followers' && (
        <div className="following">
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
      )}
      <div className="targetPost">
        {props.targetedPosts.map((element, index) => {
          return (
            <div className="postDiv" key={index}>
              <div className="post2">
                <h4 className="poster">
                  <Image
                    src={element.poster_image_url}
                    roundedCircle
                    height="50px"
                    width="50px"
                    className="posterImg"
                  />
                  &nbsp;
                  {element.poster_name}
                </h4>
                <p className="posterDate2">
                  {new Date(element.send_time).toLocaleString()}
                </p>
                <p className="postcontent">{element.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Fab
        className="Fab2"
        aria-label="add"
        onClick={() => window.scrollTo(0, 0)}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </div>
  );
}

export default TargetProfile;
