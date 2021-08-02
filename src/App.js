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
import AddFriends from './components/AddFriends';

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
      allusers: [],
      allFollowing: [],
      showFollowing: false,
      allFollowers: [],
      showFollowers: false,
      posts: [],
      comments: [],
    };
  }

  componentDidMount = async () => {
    socket.on('connect', () => {
      socket.emit('test');
      socket.emit('getAllUsers');
    });

    socket.on('returnAllUsers', (data) => {
      this.setState({
        allusers: data,
      });
      // console.log(this.state.allusers);
    });

    socket.on('returnFollowing', (data) => {
      let data2 = data;
      // console.log(data);
      this.setState({
        allFollowing: data2,
        showFollowing: true,
      });
      console.log(this.state.allFollowing);
    });

    socket.on('returnFollowers', (data) => {
      let data2 = data;
      // console.log(data);
      this.setState({
        allFollowers: data2,
        showFollowers: true,
      });
      console.log(this.state.allFollowing);
    });

    socket.on('error', (payload) => {
      console.log(payload);
    });

    //-----requesting to get the post from the server-----//
    socket.emit('getAllPosts', { userID: this.state.user.userID });


    //---requestin to get the comments from the server---//
    socket.emit('getAllComments', { userID: this.state.user.userID });



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


  getFollowing = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowing', { userID: userID });
  };

  getFollowers = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowers', { userID: userID });
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
    let payload = {
      userID: this.state.user.userID,
    }
    socket.emit('getAllPosts', { userID: this.state.user.userID });

    console.log('user', this.state.path, this.state.user);
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };

  handleAddFriend = (reciverId) => {
    let data = { reciverId: reciverId, senderId: this.state.user.userID };
    console.log(data);
    socket.emit('addFriend', data);
    // socket.emit('joinFollowRoom', { reciverId });
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
  //------sending the like to the server------//
  like = (post_id) => {
    let payload = {
      post_id: post_id,
      userID: this.state.user.userID,
    }
    socket.emit('like', payload);
  }


  render() {
    return (
      <Router>
        <Header path={this.state.path} logOut={this.logOut} />
        <div>
          <Switch>
            <Route exact path="/">
              <Home
                logOut={this.logOut}
                loggedIn={this.state.loggedIn}
                loggedInFunction={this.loggedIn}
              />
              {this.state.loggedIn && this.state.path && (
                <Redirect to="/feedPage" />
              )}
            </Route>
            <Route exact path="/feedPage">
              {<FeedPage
                userID={this.state.user.userID}
                like={this.like}
                comments={this.state.comments}
                comment={this.comment}
                allPosts={this.state.posts}
                post={this.post}
                logOut={this.logOut} />}
            </Route>
            <Route exact path={this.state.path}>
              {this.state.path && (
                <Profile
                userID={this.state.user.userID}
                  getFollowing={this.getFollowing}
                  getFollowers={this.getFollowers}
                  allFollowing={this.state.allFollowing}
                  allFollowers={this.state.allFollowers}
                  user={this.state.user}
                  showFollowing={this.state.showFollowing}
                  showFollowers={this.state.showFollowers}
                  like={this.like}
                  comments={this.state.comments}
                  comment={this.comment}
                  allPosts={this.state.posts}
                  post={this.post}
                />
              )}
            </Route>
            <Route exact path="/addFriends">
              <AddFriends
                allusers={this.state.allusers}
                handleAddFriend={this.handleAddFriend}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
