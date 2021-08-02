import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import FeedPage from './components/FeedPage';
import Profile from './components/Profile';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        userID: null,
        firstname: null,
        lastname: null,
        gender: null,
        age: null,
        auth_id: null,
      },
      path: '/profile',
      posts: [],
      comments: [],
    };
  }

  componentDidMount = () => {
    socket.on('connect', () => {
      socket.emit('test');
    });

    socket.on('error', (payload) => {
      console.log(payload);
    });

    //-----requesting to get the post from the server-----//
    socket.emit('getAllPosts');


    //---requestin to get the comments from the server---//
    socket.emit('getAllComments');



    //-------getting the posts from the server-------//
    socket.on('read', (payload) => {
      this.setState({
        posts: payload
      });
    });


    //------getting the comments from the server------//
    socket.on('readComments', (payload) => {
      this.setState({
        comments: payload
      });
    });
  };

  loggedIn = (user) => {
    this.setState({
      loggedIn: true,
      user: {
        userID: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        auth_id: user.auth_id,
      },
    });
    this.setState({
      path: `/profile/${this.state.user.userID}`,
    });

    console.log('user', this.state.path);
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };



  //-----sending the post to the server-----//
  post = (postContent) => {
    let payload = {
      postContent: postContent,
      userID: this.state.user.userID,
    }
    socket.emit('post', payload);
  }


  //----sending the comment to the server----//
  comment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: this.state.user.userID,
    }
    socket.emit('comment', payload);
  }


  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/">
              <Home
                logOut={this.logOut}
                loggedIn={this.state.loggedIn}
                loggedInFunction={this.loggedIn}
              />
              {this.state.loggedIn && <Redirect to="/feedPage" />}
            </Route>
            <Route exact path="/feedPage">
              {<FeedPage
                comments={this.state.comments}
                comment={this.comment}
                allPosts={this.state.posts}
                post={this.post}
                logOut={this.logOut} />}
            </Route>
            <Route exact path={this.state.path}>
              <Profile user={this.state.user} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
