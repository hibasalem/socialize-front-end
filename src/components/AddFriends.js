import React, { useContext } from 'react';
import Friend from './Friend';
import { DataContext } from '../context/data';

export default function AddFriends() {
  const context = useContext(DataContext);

  return (
    <div>
      <div className="mainDiv">
        <h2 className="profileName">All users</h2>
        <div className="peopleCont">
          {context.state.allusers.map((item, idx) => {
            if (item.id !== context.state.user.userID) {
              return <Friend key={idx} item={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
