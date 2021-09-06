import React, { Component } from 'react';
import Message from './Message';
import VideoPlayer from './VideoPlayer';

export class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageContent: '',
    };
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.props.handleSendMessage(this.state.messageContent);
  };

  render() {
    return (
      <div>
        <div className="Meessages">
          {this.props.showMessages && (
            <Message allMessages={this.props.allMessages} />
          )}
        </div>
        <form
          onSubmit={(e) => {
            this.sendMessage(e);
          }}
        >
          <input
            type="text"
            placeholder="Type Your Message Here"
            onChange={(e) => {
              this.setState({
                messageContent: e.target.value,
              });
            }}
          />
          <input type="submit" />
        </form>

        <button
          className="mybuttonnn"
          onClick={() => this.props.handleShowVideoCall()}
        >
          start video call
        </button>

        {this.props.showVideoCall && (
          <div>
            <VideoPlayer videoCallData={this.props.videoCallData} />
          </div>
        )}
      </div>
    );
  }
}

export default Messenger;
