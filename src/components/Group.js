import React, { useState } from 'react';

export default function Group(props) {
 
  const [disableIt, setDisableIt] = useState(false)


  function handleClicked(id, owner_id) {
    props.handleJoinGroup(id, owner_id);
    
      setDisableIt( true);

    console.log(disableIt);
  }

 
    return (
      <div>
        <p>
          <b>{props.item.group_name}</b>
        </p>
        <p>Description {props.item.group_description}</p>

        {!disableIt && (
          <button
            className="mybuttonnn"
            onClick={() =>
              handleClicked(props.item.id, props.item.owner_id)
            }
          >
            Join group
          </button>
        )}

        {disableIt && (
          <button className="mybuttonnn" disabled>
            request sent
          </button>
        )}
      </div>
    );

}
