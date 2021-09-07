import React from 'react'

export default function Message(props){

    return (
      <div>
        {props.allMessages.map((item,idx)=>{
          return(
            <>
            <p key={idx}><b>{item.sender_name}</b> {item.content}, {new Date(item.send_time).toLocaleString()}</p>
            </>
          )
        })}
      </div>
    )

}


