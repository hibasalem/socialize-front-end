import React, { Component } from 'react';

import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './VideoPlayer';
import Notifications from './Notifications';
import Sidebar from './Sidebar';
import { ContextProvider } from '../context';

export default class VideoCall extends Component {
  render() {
    return (
      <div>
        {/* <ContextProvider user={this.props.user}> */}
        {/* <Sidebar> */}
        {/* <Notifications /> */}
        {/* </Sidebar> */}
        {/* </ContextProvider> */}
      </div>
    );
  }
}
