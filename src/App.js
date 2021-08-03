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
import CurrentGroup from './components/CurrentGroup';
import io from 'socket.io-client';
import Groups from './components/Groups';
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
      showMessenger: false,
      messageReceiverId: null,
      allMessages: [],
      showMessages: false,
      allGroups: [],
      showGroups: false,
      GroupRequests: [],
      showGroupsRequests: false,
      showPosts: false,
      usergroups: [],
      showUsergroups: false,
      currentGroupPath: '',
      showCurrentGroupPath: false,
      currentGroupContent: [],
      showCurrentGroupContent: false,
      groupPosts: [],
      showGroupPosts: false,
      currentGroupID: null,
      groupMembers: [],
      showGroupMembers: false,
    };
  }

  componentDidMount = async () => {
    socket.on('connect', () => {
      socket.emit('test');
      socket.emit('getAllUsers');
    });
    // socket.on('newuser',()=>{
    //   socket.emit('getAllUsers');
    // })
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
      console.log('following', this.state.allFollowing);
    });

    socket.on('returnFollowers', (data) => {
      let data2 = data;
      // console.log(data);
      this.setState({
        allFollowers: data2,
        showFollowers: true,
      });
      console.log('followers', this.state.allFollowers);
    });

    socket.on('returnMessages', (returnedMessages) => {
      let messages = returnedMessages;
      // console.log(data);
      this.setState({
        allMessages: messages,
        showMessages: true,
      });
      console.log('messages', this.state.allMessages);
    });

    socket.on('returnAllGroups', (returnedGroups) => {
      let groups = returnedGroups;
      // console.log(data);
      this.setState({
        allGroups: groups,
        showGroups: true,
      });
      console.log('groups', this.state.allGroups);
    });

    socket.on('returnGroupRequests', (returnedGroupRequests) => {
      let GroupRequests = returnedGroupRequests;
      // console.log('hi');
      this.setState({
        GroupRequests: GroupRequests,
        showGroupsRequests: true,
      });
      console.log('GroupRequests', this.state.GroupRequests);
    });

    socket.on('returnUsergroups', (data) => {
      let usergroups = data;
      // console.log('usergroups', usergroups);
      this.setState({
        usergroups: usergroups,
        showUsergroups: true,
      });
      console.log('usergroups', this.state.usergroups);
    });

    socket.on('returnGroupMembers', (data) => {
      let groupMembers = data;
      this.setState({
        groupMembers: groupMembers,
        showGroupMembers: true,
      });
      console.log('usergroups', this.state.usergroups);
    });

    socket.on('returnCurrentGroupContent', (data) => {
      let currentGroupContent = data;
      // console.log('usergroups', usergroups);
      this.setState({
        currentGroupContent: currentGroupContent,
        showCurrentGroupContent: true,
      });
      console.log('currentGroupContent', this.state.currentGroupContent);
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
      console.log(payload);
      let stuff = payload;
      this.setState({
        posts: stuff,
        showPosts: true,
      });
    });

    //------getting the comments from the server------//
    socket.on('readComments', (payload) => {
      this.setState({
        comments: payload,
      });
    });
    //------notification of a new post ------//
    socket.on('newPost', () => {
      socket.emit('getAllPosts', { userID: this.state.user.userID });
    });

    socket.on('returnNewGroupPost', (data) => {
      let groupPosts = data;
      // console.log('usergroups', usergroups);
      this.setState({
        groupPosts: groupPosts,
        showGroupPosts: true,
      });
      console.log('groupPosts', this.state.groupPosts);
    });
  };

  getAllGroupPosts = (data) => {
    socket.emit('getAllGroupPosts', { groupID: data });
  };

  getGroupMembers = (data) => {
    socket.emit('getGroupMembers', { groupID: data });
  };

  getFollowing = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowing', { userID: userID });
  };

  getFollowing = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowing', { userID: userID });
  };

  getGroupRequests = () => {
    let userID = this.state.user.userID;
    socket.emit('getGroupRequests', { userID: userID });
  };

  getFollowers = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowers', { userID: userID });
  };

  getUsergroups = () => {
    let userID = this.state.user.userID;
    socket.emit('getUsergroups', { userID: userID });
  };

  getAllGroups = () => {
    let userID = this.state.user.userID;
    socket.emit('getAllGroups', { userID: userID });
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
    };
    socket.emit('getAllPosts', { userID: this.state.user.userID });
    // console.log(this.state.posts);
    // socket.emit('join', { userID: this.state.user.userID });
    // console.log('user', this.state.path, this.state.user);
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
  };

  handleAddFriend = (reciverId) => {
    console.log('following...');
    let data = { reciverId: reciverId, senderId: this.state.user.userID };
    console.log(data);
    socket.emit('addFriend', data);
    this.getFollowing();
    this.getFollowers();
    socket.on('friendAdded', () => {
      socket.emit('getAllPosts', { userID: this.state.user.userID });
    });
    // socket.emit('joinFollowRoom', { reciverId });
    // socket.emit('getAllPosts', { userID: this.state.user.userID });
  };

  handleShowMessenger = (reciverId) => {
    this.setState({
      showMessenger: true,
      messageReceiverId: reciverId,
    });
  };

  handleSendMessage = (messageContent) => {
    let room;
    if (this.state.messageReceiverId > this.state.user.userID) {
      room = `${this.state.user.userID}_${this.state.messageReceiverId}`;
    } else {
      room = `${this.state.messageReceiverId}_${this.state.user.userID}`;
    }
    let payload = {
      messageContent: messageContent,
      receiverId: this.state.messageReceiverId,
      senderId: this.state.user.userID,
      messageRoomId: room,
    };
    socket.emit('sendMessage', payload);
  };

  handleCreateGroup = (groupName, groupDescription) => {
    let payload = {
      group_name: groupName,
      group_owner: this.state.user.userID,
      group_description: groupDescription,
    };
    socket.emit('createGroup', payload);
    this.getAllGroups();
    this.getUsergroups();
  };

  handleJoinGroup = async (groupId, owner_id) => {
    let payload = {
      groupId: groupId,
      senderId: this.state.user.userID,
      owner_id: owner_id,
    };
    socket.emit('joinGroup', payload);
    this.getGroupRequests();
  };

  handleAcceptJoinGroup = (groupId, memberId) => {
    let payload = {
      groupId: groupId,
      memberId: memberId,
    };
    socket.emit('acceptJoinGroup', payload);
    // console.log(payload);
    this.getGroupRequests();
  };

  handleViewgroup = (groupId) => {
    let payload = {
      groupId: groupId,
    };
    this.setState({
      currentGroupID: groupId,
      currentGroupPath: `/groups/${groupId}`,
      showCurrentGroupPath: true,
    });
    socket.emit('viewGroup', payload);
    // console.log(payload);
    // this.getGroupRequests();
  };

  //-----sending the post to the server-----//
  post = (postContent) => {
    let payload = {
      postContent: postContent,
      userID: this.state.user.userID,
    };
    console.log(payload);
    socket.emit('post', payload);
  };

  handelGroupPost = (postContent, groupID) => {
    let payload = {
      postContent: postContent,
      userID: this.state.user.userID,
      groupID: groupID,
    };
    console.log(payload);
    socket.emit('groupPost', payload);
  };

  //----sending the comment to the server----//
  comment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: this.state.user.userID,
    };
    socket.emit('comment', payload);
  };
  //------sending the like to the server------//
  like = (post_id) => {
    let payload = {
      post_id: post_id,
      userID: this.state.user.userID,
    };
    socket.emit('like', payload);
  };

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
              {
                <FeedPage
                  showPosts={this.state.showPosts}
                  userID={this.state.user.userID}
                  like={this.like}
                  comments={this.state.comments}
                  comment={this.comment}
                  allPosts={this.state.posts}
                  post={this.post}
                  logOut={this.logOut}
                />
              }
            </Route>
            <Route exact path={this.state.path}>
              {this.state.path && (
                <Profile
                  showPosts={this.state.showPosts}
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
                  handleShowMessenger={this.handleShowMessenger}
                  showMessenger={this.state.showMessenger}
                  messageReceiverId={this.state.messageReceiverId}
                  handleSendMessage={this.handleSendMessage}
                  allMessages={this.state.allMessages}
                  showMessages={this.state.showMessages}
                  getUsergroups={this.getUsergroups}
                />
              )}
            </Route>
            <Route exact path="/addFriends">
              <AddFriends
                allusers={this.state.allusers}
                handleAddFriend={this.handleAddFriend}
              />
            </Route>
            <Route exact path="/groups">
              <Groups
                handleCreateGroup={this.handleCreateGroup}
                handleJoinGroup={this.handleJoinGroup}
                getAllGroups={this.getAllGroups}
                allGroups={this.state.allGroups}
                showGroups={this.state.showGroups}
                getGroupRequests={this.getGroupRequests}
                GroupRequests={this.state.GroupRequests}
                showGroupsRequests={this.state.showGroupsRequests}
                handleAcceptJoinGroup={this.handleAcceptJoinGroup}
                getUsergroups={this.getUsergroups}
                usergroups={this.state.usergroups}
                showUsergroups={this.state.showUsergroups}
                handleViewgroup={this.handleViewgroup}
                currentGroupPath={this.state.currentGroupPath}
                showCurrentGroupPath={this.state.showCurrentGroupPath}
              />
            </Route>
            <Route exact path={this.state.currentGroupPath}>
              <CurrentGroup
                currentGroupContent={this.state.currentGroupContent}
                showCurrentGroupContent={this.state.showCurrentGroupContent}
                post={this.handelGroupPost}
                groupPosts={this.state.groupPosts}
                showGroupPosts={this.state.showGroupPosts}
                getAllGroupPosts={this.getAllGroupPosts}
                currentGroupID={this.state.currentGroupID}
                getGroupMembers={this.getGroupMembers}
                showCurrentGroupPath={this.state.showCurrentGroupPath}
                groupMembers={this.state.groupMembers}
                showGroupMembers={this.state.showGroupMembers}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
