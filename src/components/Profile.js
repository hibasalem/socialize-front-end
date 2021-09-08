import React, { useEffect, useState } from 'react';
import Posts from './Posts';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

function Profile(props) {
  const [current, setCurrent] = useState('following');
  const classes = useStyles();

  useEffect(() => {
    props.getFollowing();
    props.getFollowers();
  }, []);

  return (
    <div className="mainDiv">
      <div className="person">
        <h2 className="profileName">
          <Image
            src={props.user.image_url}
            roundedCircle
            height="70px"
            width="70px"
          />
          &nbsp; &nbsp;
          {props.user.firstname} {props.user.lastname}
        </h2>
      </div>
      <p>{props.user.age}</p>
      <p>{props.user.gender}</p>

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
          <h4>Following</h4>
          {props.showFollowing &&
            props.allFollowing.map((item, idx) => {
              return (
                <div key={idx}>
                  <p>
                    <Image
                      src={item.image_url}
                      roundedCircle
                      height="30px"
                      width="30px"
                    />
                    &nbsp;
                    {item.firstname} {item.lastname}
                  </p>
                </div>
              );
            })}
        </div>
      )}

      {current == 'followers' && (
        <div className="following">
          <h4>Followers</h4>

          {props.showFollowers &&
            props.allFollowers.map((item, idx) => {
              return (
                <div key={idx}>
                  <p>
                    <Image
                      src={item.image_url}
                      roundedCircle
                      height="30px"
                      width="30px"
                    />
                    &nbsp;
                    {item.firstname} {item.lastname}
                  </p>
                </div>
              );
            })}
        </div>
      )}

      <Posts
        userID={props.userID}
        like={props.like}
        comments={props.comments}
        comment={props.comment}
        allPosts={props.allPosts}
        socket={props.socket}
      />

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

export default Profile;
