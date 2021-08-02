import React, { Component } from 'react'
import Message from './Message';

export class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageContent: '',
    }
  }
  sendMessage = (e) => {
    e.preventDefault();
    this.props.handleSendMessage(this.state.messageContent);
  }
  render() {
    return (
      <div>
        {
          this.props.showMessages &&
          <Message allMessages={this.props.allMessages} />
        }
        <form onSubmit={(e) => { this.sendMessage(e) }} >
          <input type='text' placeholder='Type Your Message Here' onChange={(e) => {
            this.setState({
              messageContent: e.target.value
            })
          }} />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Messenger
