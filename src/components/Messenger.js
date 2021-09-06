import React, { Component } from 'react';
import Message from './Message';
import VideoCall from './VideoCall';
import VideoPlayer from './VideoPlayer';

export class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageContent: '',
      showVideoCall: false,
    };
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.props.handleSendMessage(this.state.messageContent);
  };

  handleShowVideoCall = () => {
    this.setState({
      showVideoCall: true,
    });
    console.log('videoCallData', this.props.videoCallData);
  };

  render() {
    return (
      <div>
        <div className="Meessages">
          {/* {console.log('hiii', this.props.allMessages)} */}
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
          onClick={() => this.handleShowVideoCall()}
        >
          start video call
        </button>

        {this.state.showVideoCall && (
          <div>
            <VideoPlayer videoCallData={this.props.videoCallData} />

            {/* <VideoCall
              videoCallData={this.props.videoCallData}
              user={this.props.user}
            /> */}
          </div>
        )}
      </div>
    );
  }
}

export default Messenger;
