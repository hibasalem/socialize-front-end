import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Messenger from './Messenger';
import { ContextProvider } from '../context';
import Notifications from './Notifications';

export default class MainMessnger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVideoCall: false,
    };
  }

  handleShowVideoCall = () => {
    this.setState({
      showVideoCall: true,
    });
  };

  handleHideVideoCall = () => {
    this.setState({
      showVideoCall: false,
    });
  };

  componentDidMount = () => {
    this.props.getFollowing();
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="following">
          <h2>people</h2>
          {this.props.showFollowing &&
            this.props.allFollowing.map((item, idx) => {
              return (
                <>
                  <p
                    key={idx}
                    onClick={() =>
                      this.props.handleShowMessenger(item.receiverid)
                    }
                  >
                    <Image
                      src={item.image_url}
                      roundedCircle
                      height="30px"
                      width="30px"
                    />
                    &nbsp;
                    {item.firstname} {item.lastname}
                  </p>
                </>
              );
            })}
        </div>

        <ContextProvider
          videoCallData={this.props.videoCallData}
          user={this.props.user}
        >
          {this.props.showMessenger && (
            <div className="Messenger2">
              <h2>Messenger</h2>
              <Messenger
                user={this.props.user}
                handleSendMessage={this.props.handleSendMessage}
                allMessages={this.props.allMessages}
                showMessages={this.props.showMessages}
                videoCallData={this.props.videoCallData}
                handleShowVideoCall={this.handleShowVideoCall}
                showVideoCall={this.state.showVideoCall}
              />

              <Notifications
                user={this.props.user}
                handleHideVideoCall={this.handleHideVideoCall}
              />
            </div>
          )}
        </ContextProvider>
      </div>
    );
  }
}
