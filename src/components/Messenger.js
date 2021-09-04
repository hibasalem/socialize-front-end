import React, {Component, useState } from 'react';
import Message from './Message';



function Messenger(props) {
  const [messageContent, setMessageContent] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    props.handleSendMessage(messageContent);
  };

  return (
    <div>
      <div className="Meessages">
        {console.log('hiii', props.allMessages)}
        {props.showMessages && (
          <Message allMessages={props.allMessages} />
        )}
      </div>
      <form
        onSubmit={(e) => {
          sendMessage(e);
        }}
      >
        <input
          type="text"
          placeholder="Type Your Message Here"
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Messenger




// export class Messenger extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messageContent: '',
//     };
//   }
//   sendMessage = (e) => {
//     e.preventDefault();
//     this.props.handleSendMessage(this.state.messageContent);
//   };
//   render() {
//     return (
//       <div>
//         <div className="Meessages">
//           {console.log('hiii', this.props.allMessages)}
//           {this.props.showMessages && (
//             <Message allMessages={this.props.allMessages} />
//           )}
//         </div>
//         <form
//           onSubmit={(e) => {
//             this.sendMessage(e);
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Type Your Message Here"
//             onChange={(e) => {
//               this.setState({
//                 messageContent: e.target.value,
//               });
//             }}
//           />
//           <input type="submit" />
//         </form>
//       </div>
//     );
//   }
// }

// export default Messenger;
