import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from '@material-ui/core/Button';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';


export default function Friend(props) {
  const [path, setPath] = useState(`/target/${props.item.id}`);
  const [visible, setVisible] = useState(props.disableIt);
  const targetProfile = () => {
    props.targetProfile(props.item.id);
  };

  return (
    <div className="personCont" key={props.item.id}>
      {/* {console.log('hello', props.item)} */}
      <nav>
        <Link
          className="personName"
          to={path}
          onClick={() => {
            targetProfile();
          }}
        >
          <Image
            src={props.item.image_url}
            roundedCircle
            height="70px"
            width="70px"
          />
          &nbsp;
          <br />
          {props.item.firstname} {props.item.lastname}
          <br />
        </Link>
      </nav>

      {!props.disableIt && (
        <Button
          type="submit"
          variant="outlined"
          onClick={() => {
            props.handleAddFriend(props.item.id);
            setVisible(false);
          }}
          className="newbuttn3"
          color="default"
          startIcon={<PersonAddOutlinedIcon />}
        >
          Follow
        </Button>
      )}

      {(visible || props.disableIt) && (
        <Button
          variant="outlined"
          type="submit"
          className="newbuttn3"
          color="default"
          startIcon={<PersonAddDisabledOutlinedIcon />}
          disabled
        >
          Followed
        </Button>
      )}
    </div>
  );
}
