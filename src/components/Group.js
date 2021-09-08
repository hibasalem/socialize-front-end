import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export default function Group(props) {
  const [disableIt, setDisableIt] = useState(false);

  function handleClicked(id, owner_id) {
    props.handleJoinGroup(id, owner_id);

    setDisableIt(true);

    console.log(disableIt);
  }

  return (
    <div>
      <p>
        <b>{props.item.group_name}</b>
      </p>
      <p>{props.item.group_description}</p>

      {!disableIt && (
        <Button
          variant="contained"
          onClick={() => handleClicked(props.item.id, props.item.owner_id)}
        >
          Join Group
        </Button>
        // <button
        //   className="mybuttonnn"
        //   onClick={() =>
        //     handleClicked(props.item.id, props.item.owner_id)
        //   }
        // >
        //   Join group
        // </button>
      )}

      {disableIt && (
        <Button variant="contained" disabled>
          Request Sent
        </Button>
        // <button className="mybuttonnn" disabled>
        //   request sent
        // </button>
      )}
    </div>
  );
}
