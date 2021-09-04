import React from 'react'



function Message(props) {
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

export default Message



// export class Message extends Component {
//   render() {
//     return (
//       <div>
//         {this.props.allMessages.map((item,idx)=>{
//           return(
//             <>
//             <p key={idx}><b>{item.sender_name}</b> {item.content}, {new Date(item.send_time).toLocaleString()}</p>
//             </>
//           )
//         })}
//       </div>
//     )
//   }
// }

// export default Message
