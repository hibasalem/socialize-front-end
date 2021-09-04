<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read } from './store/postReducer';
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
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
import TargetProfile from './components/TargetProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVER_URL = 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

<<<<<<< HEAD
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
        image_url: null,
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
      targetedProfileInfo: [],
      targetedFollowing: [],
      targetedFollowers: [],
      targetedPosts: [],
      groupPosts: [],
      showGroupPosts: false,
      currentGroupID: null,
      groupMembers: [],
      showGroupMembers: false,
      groupPostsLikes: [],
      showGroupPostsLikes: false,
      groupComments: [],
      showGroupComments: false,
    };
  }

  componentDidMount = async () => {
=======

function App() {
  const state = useSelector(state => state);
  console.log('state',state.postReducer);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    userID: null,
    firstname: null,
    lastname: null,
    gender: null,
    age: null,
    auth_id: null,
    image_url: null,
  });
  console.log('1111')
  const [path, setPath] = useState('/profile');
  const [allusers, setAllusers] = useState([]);
  const [allFollowing, setAllFollowing] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);
  const [allFollowers, setAllFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [showMessenger, setShowMessenger] = useState(false);
  const [messageReceiverId, setMessageReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [showGroups, setShowGroups] = useState(false);
  const [GroupRequests, setGroupRequests] = useState([]);
  const [showGroupsRequests, setShowGroupsRequests] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [usergroups, setUsergroups] = useState([]);
  const [showUsergroups, setShowUsergroups] = useState(false);
  const [currentGroupPath, setCurrentGroupPath] = useState('');
  const [showCurrentGroupPath, setShowCurrentGroupPath] = useState(false);
  const [currentGroupContent, setCurrentGroupContent] = useState([]);
  const [showCurrentGroupContent, setShowCurrentGroupContent] = useState(false);
  const [targetedProfileInfo, setTargetedProfileInfo] = useState([]);
  const [targetedFollowing, setTargetedFollowing] = useState([]);
  const [targetedFollowers, setTargetedFollowers] = useState([]);
  const [targetedPosts, setTargetedPosts] = useState([]);
  const [groupPosts, setGroupPosts] = useState([]);
  const [showGroupPosts, setShowGroupPosts] = useState(false);
  const [currentGroupID, setCurrentGroupID] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const [groupPostsLikes, setGroupPostsLikes] = useState([]);
  // const [showGroupPostsLikes, setShowGroupPostsLikes] = useState(false);
  const [groupComments, setGroupComments] = useState([]);
  const [showGroupComments, setShowGroupComments] = useState(false);

  useEffect(() => {

>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    socket.on('connect', () => {
      socket.emit('test');
      socket.emit('getAllUsers');
      socket.on('requestAccepted', (payload) => {
<<<<<<< HEAD
        // console.log(payload.ownerId);
        // console.log(payload.memberId);
        if (
          this.state.user.userID === payload.memberId ||
          this.state.user.userID === payload.ownerId
        ) {
          let userID = this.state.user.userID;
=======

        if (
          user.userID === payload.memberId ||
          user.userID === payload.ownerId
        ) {
          let userID = user.userID;
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
          socket.emit('getAllGroups', { userID: userID });
          socket.emit('getUsergroups', { userID: userID });
          socket.emit('getGroupRequests', { userID: userID });
        }
      });
<<<<<<< HEAD
      socket.on('newLike', () => {
        socket.emit('getAllPosts', { userID: this.state.user.userID });
      });
      socket.on('joinGroupRequest', (payload) => {
        if (this.state.user.userID === payload) {
          this.getGroupRequests();
        }
      });
      socket.on('groupisCreated', () => {
        let userID = this.state.user.userID;
=======
      socket.on('joinGroupRequest', (payload) => {
        if (user.userID === payload) {
          getGroupRequests();
        }
      });
      socket.on('groupisCreated', () => {
        let userID = user.userID;
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
        socket.emit('getAllGroups', { userID: userID });
        socket.emit('getUsergroups', { userID: userID });
      });
      socket.on('haveBeenFollowed', (payload) => {
<<<<<<< HEAD
        if (this.state.user.userID === payload) {
          this.getFollowers();
        }
      });
      socket.on('newGroupPostMade', (payload) => {
        console.log('currentGroupID ', this.state.currentGroupID);
        console.log('payload ', payload);
        if (this.state.currentGroupID === payload) {
          socket.emit('getAllGroupPosts', {
            groupID: this.state.currentGroupID,
=======
        if (user.userID === payload) {
          getFollowers();
        }
      });
      socket.on('newGroupPostMade', (payload) => {


        if (currentGroupID === payload) {
          socket.emit('getAllGroupPosts', {
            groupID: currentGroupID,
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
          });
        }
      });
      socket.on('targetInfo', (payload) => {
<<<<<<< HEAD
        this.setState({
          targetedProfileInfo: payload[0],
        });
        // console.log(this.state.targetedProfileInfo);
      });
      socket.on('targetFollowing', (payload) => {
        this.setState({
          targetedFollowing: payload,
        });
        // console.log(this.state.targetedFollowing);
      });
      socket.on('targetFollowers', (payload) => {
        this.setState({
          targetedFollowers: payload,
        });
        // console.log(this.state.targetedFollowers);
      });
      socket.on('targetPosts', (payload) => {
        this.setState({
          targetedPosts: payload,
        });
        // console.log(this.state.targetedPosts);
=======
        setTargetedProfileInfo(payload[0]);

      });
      socket.on('targetFollowing', (payload) => {
        setTargetedFollowing(payload)

      });
      socket.on('targetFollowers', (payload) => {

        setTargetedFollowers(payload)


      });
      socket.on('targetPosts', (payload) => {

        setTargetedPosts(payload)


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
      });
      socket.on('newUsersList', () => {
        socket.emit('getAllUsers');
      });
    });

<<<<<<< HEAD
    // socket.on('newuser',()=>{
    //   socket.emit('getAllUsers');
    // })
    socket.on('returnAllUsers', (data) => {
      this.setState({
        allusers: data,
      });
      // console.log(this.state.allusers);
=======
    socket.on('returnAllUsers', (data) => {

      setAllusers(data);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnFollowing', (data) => {
      let data2 = data;
<<<<<<< HEAD
      // console.log(data);
      this.setState({
        allFollowing: data2,
        showFollowing: true,
      });
      console.log('following', this.state.allFollowing);
=======


      setAllFollowing(data2);
      setShowFollowing(true);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnFollowers', (data) => {
      let data2 = data;
<<<<<<< HEAD
      // console.log(data);
      this.setState({
        allFollowers: data2,
        showFollowers: true,
      });
      console.log('followers', this.state.allFollowers);
=======

      setAllFollowers(data2);
      setShowFollowers(true);

>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnMessages', (returnedMessages) => {
      let messages = returnedMessages;
<<<<<<< HEAD
      // console.log(data);
      this.setState({
        allMessages: messages,
        showMessages: true,
      });
      console.log('messages', this.state.allMessages);
=======


      setAllMessages(messages);
      setShowMessages(true);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnAllGroups', (returnedGroups) => {
      // let groups = returnedGroups;
<<<<<<< HEAD
      // console.log('before',groups);
      this.setState({
        allGroups: returnedGroups,
        showGroups: true,
      });
      // console.log('groups', this.state.allGroups);
=======


      setAllGroups(returnedGroups);
      setShowGroups(true);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnGroupRequests', (returnedGroupRequests) => {
      let GroupRequests = returnedGroupRequests;
<<<<<<< HEAD
      // console.log('hi');
      this.setState({
        GroupRequests: GroupRequests,
        showGroupsRequests: true,
      });
      console.log('GroupRequests', GroupRequests);
=======


      setGroupRequests(GroupRequests);
      setShowGroupsRequests(true);

>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnUsergroups', (data) => {
      let usergroups = data;
<<<<<<< HEAD
      // console.log('usergroups', usergroups);
      this.setState({
        usergroups: usergroups,
        showUsergroups: true,
      });
      console.log('usergroups', this.state.usergroups);
=======


      setUsergroups(usergroups);
      setShowUsergroups(true);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnGroupMembers', (data) => {
      let groupMembers = data;
<<<<<<< HEAD
      this.setState({
        groupMembers: groupMembers,
        showGroupMembers: true,
      });
      console.log('usergroups', this.state.usergroups);
=======

      setGroupMembers(groupMembers);
      setShowGroupMembers(true);


>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnCurrentGroupContent', (data) => {
      let currentGroupContent = data;
<<<<<<< HEAD
      // console.log('usergroups', usergroups);
      this.setState({
        currentGroupContent: currentGroupContent,
        showCurrentGroupContent: true,
      });
      console.log('currentGroupContent', this.state.currentGroupContent);
=======
      setCurrentGroupContent(currentGroupContent);
      setShowCurrentGroupContent(true);
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('error', (payload) => {
      console.log(payload);
    });

    //-----requesting to get the post from the server-----//
<<<<<<< HEAD
    socket.emit('getAllPosts', { userID: this.state.user.userID });

    //---requestin to get the comments from the server---//
    socket.emit('getAllComments', { userID: this.state.user.userID });

    //-------getting the posts from the server-------//
    socket.on('read', (payload) => {
      let stuff = payload;
      this.setState({
        posts: stuff,
        showPosts: true,
      });
      console.log('this is the read ', this.state.posts.length);
    });

    //------getting the comments from the server------//
    socket.on('readComments', (payload) => {
      this.setState({
        comments: payload,
      });
    });

    socket.on('returnGroupComments', (payload) => {
      this.setState({
        groupComments: payload,
        showGroupComments: true,
      });
      console.log('returned comments payload', payload);
    });

    //------notification of a new post ------//
    socket.on('newPost', () => {
      socket.emit('getAllPosts', { userID: this.state.user.userID });
    });

    socket.on('returnNewGroupPost', (data) => {
      let groupPosts = data;
      console.log('groupPosts', groupPosts);
      this.setState({
        groupPosts: groupPosts,
        showGroupPosts: true,
      });
      console.log('groupPosts', this.state.groupPosts);
=======
    // socket.emit('getAllPosts', { userID: user.userID });


    //---requestin to get the comments from the server---//
    socket.emit('getAllComments', { userID: user.userID });


    //------getting the comments from the server------//
    socket.on('readComments', (payload) => {
      setComment(payload);
    });

    socket.on('returnGroupComments', (payload) => {

      setGroupComments(payload);
      setShowGroupComments(true);


    });


    socket.on('returnNewGroupPost', (data) => {
      let groupPosts = data;
      setGroupPosts(groupPosts);
      setShowGroupPosts(true);

>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    });

    socket.on('returnGroupLikes', (payload) => {
      let info = payload;
<<<<<<< HEAD
      console.log('what is this', payload);
      socket.emit('getAllGroupPosts', { groupID: info[0].g_groups_id });
    });
  };

  getAllGroupPosts = (data) => {
    // console.log('this is data: ', data);
    socket.emit('getAllGroupPosts', { groupID: data });
  };

  getAllGroupComments = () => {
    socket.emit('getAllGroupComments');
  };

  getGroupMembers = (data) => {
    socket.emit('getGroupMembers', { groupID: data });
  };

  getFollowing = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowing', { userID: userID });
  };

  // getFollowing = () => {
  //   let userID = this.state.user.userID;
  //   socket.emit('getFollowing', { userID: userID });
  // };

  getFollowers = () => {
    let userID = this.state.user.userID;
    socket.emit('getFollowers', { userID: userID });
  };

  getGroupRequests = () => {
    let userID = this.state.user.userID;
    socket.emit('getGroupRequests', { userID: userID });
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
    console.log('user', user);
    this.setState({
      loggedIn: true,
      user: {
        userID: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        auth_id: user.auth_id,
        image_url: user.image_url,
      },
    });
    this.setState({
      path: `/profile/${this.state.user.userID}`,
    });
    let payload = {
      userID: this.state.user.userID,
    };
    socket.emit('getAllPosts', { userID: this.state.user.userID });
    socket.emit('getNewUsersList');
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

    let room;
    if (reciverId > this.state.user.userID) {
      room = `${this.state.user.userID}_${reciverId}`;
    } else {
      room = `${reciverId}_${this.state.user.userID}`;
=======

      socket.emit('getAllGroupPosts', { groupID: info[0].g_groups_id });
    });
  }, []);

  //-------getting the posts from the server-------//
  socket.on('read', (payload) => {
    console.log('123')
    let stuff = payload;
    console.log('stuff',stuff)
    dispatch(read(stuff));
    setShowPosts(true);
  });



  socket.on('newLike', () => {
    socket.emit('getAllPosts', { userID: user.userID });
  });

  //------notification of a new post ------//
  socket.on('newPost', () => {
    socket.emit('getAllPosts', { userID: user.userID });
  });


  const getAllGroupPosts = (data) => {

    socket.emit('getAllGroupPosts', { groupID: data });
  };

  const getAllGroupComments = () => {
    socket.emit('getAllGroupComments');
  };

  const getGroupMembers = (data) => {
    socket.emit('getGroupMembers', { groupID: data });
  };

  const getFollowing = () => {
    let userID = user.userID;
    socket.emit('getFollowing', { userID: userID });
  };



  const getFollowers = () => {
    let userID = user.userID;
    socket.emit('getFollowers', { userID: userID });
  };

  const getGroupRequests = () => {
    let userID = user.userID;
    socket.emit('getGroupRequests', { userID: userID });
  };

  const getUsergroups = () => {
    let userID = user.userID;
    socket.emit('getUsergroups', { userID: userID });
  };

  const getAllGroups = () => {
    let userID = user.userID;
    socket.emit('getAllGroups', { userID: userID });
  };

  const loggedInFunction = (user) => {

    setLoggedIn(true);
    setUser({
      userID: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      gender: user.gender,
      auth_id: user.auth_id,
      image_url: user.image_url,
    });

  };
  useEffect(() => {
    socket.emit('getAllPosts', { userID: user.userID });
    socket.emit('getNewUsersList');
    setPath(`/profile/${user.userID}`);
  }, [user]);

  const logOut = () => {
    setLoggedIn(false);
  };

  const handleAddFriend = (reciverId) => {

    let data = { reciverId: reciverId, senderId: user.userID };

    socket.emit('addFriend', data);
    getFollowing();
    getFollowers();
    socket.on('friendAdded', () => {
      socket.emit('getAllPosts', { userID: user.userID });
    });
    // socket.emit('joinFollowRoom', { reciverId });
    // socket.emit('getAllPosts', { userID:  user.userID });
  };

  const handleShowMessenger = (reciverId) => {

    setShowMessenger(true);
    setMessageReceiverId(reciverId);

    let room;
    if (reciverId > user.userID) {
      room = `${user.userID}_${reciverId}`;
    } else {
      room = `${reciverId}_${user.userID}`;
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    }
    let payload = {
      messageRoomId: room,
    };

    socket.emit('returnAllMessages', payload);
  };

<<<<<<< HEAD
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
=======
  const handleSendMessage = (messageContent) => {
    let room;
    if (messageReceiverId > user.userID) {
      room = `${user.userID}_${messageReceiverId}`;
    } else {
      room = `${messageReceiverId}_${user.userID}`;
    }
    let payload = {
      messageContent: messageContent,
      receiverId: messageReceiverId,
      senderId: user.userID,
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
      messageRoomId: room,
    };
    socket.emit('sendMessage', payload);
  };

<<<<<<< HEAD
  handleCreateGroup = (groupName, groupDescription) => {
    let payload = {
      group_name: groupName,
      group_owner: this.state.user.userID,
      group_description: groupDescription,
    };
    socket.emit('createGroup', payload);
    // this.getAllGroups();
    // this.getUsergroups();
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

  handleAcceptJoinGroup = (groupId, memberId, owner_id) => {
=======
  const handleCreateGroup = (groupName, groupDescription) => {
    let payload = {
      group_name: groupName,
      group_owner: user.userID,
      group_description: groupDescription,
    };
    socket.emit('createGroup', payload);
    //  getAllGroups();
    //  getUsergroups();
  };

  const handleJoinGroup = async (groupId, owner_id) => {
    let payload = {
      groupId: groupId,
      senderId: user.userID,
      owner_id: owner_id,
    };
    socket.emit('joinGroup', payload);
    getGroupRequests();
  };

  const handleAcceptJoinGroup = (groupId, memberId, owner_id) => {
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    let payload = {
      groupId: groupId,
      memberId: memberId,
      ownerId: owner_id,
    };
    socket.emit('acceptJoinGroup', payload);
<<<<<<< HEAD
    // console.log('accept pressed');
    // this.getGroupRequests();
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

  groupPostLike = (postId, groupId) => {
    let payload = {
      postId: postId,
      userId: this.state.user.userID,
=======
    //  getGroupRequests();
  };

  const handleViewgroup = (groupId) => {
    let payload = {
      groupId: groupId,
    };

    setCurrentGroupID(groupId);
    setCurrentGroupPath(`/groups/${groupId}`);
    setShowCurrentGroupPath(true);

    socket.emit('viewGroup', payload);
    //  getGroupRequests();
  };

  const groupPostLike = (postId, groupId) => {
    let payload = {
      postId: postId,
      userId: user.userID,
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
      groupId: groupId,
    };
    socket.emit('groupPostLike', payload);
  };

  //-----sending the post to the server-----//
<<<<<<< HEAD
  post = (postContent, imageUrl) => {
    let payload = {
      postContent: postContent,
      imageUrl: imageUrl,
      userID: this.state.user.userID,
      poster_image_url: this.state.user.image_url,
      name: `${this.state.user.firstname} ${this.state.user.lastname}`,
    };
    console.log(payload);
    socket.emit('post', payload);
  };

  handelGroupPost = (postContent, imageUrl, groupID) => {
    let payload = {
      postContent: postContent,
      userID: this.state.user.userID,
      groupID: groupID,
      imageUrl: imageUrl,
    };
    console.log('groupPost', payload);
=======
  const newPost = (postContent, imageUrl) => {

    let payload = {
      postContent: postContent,
      imageUrl: imageUrl,
      userID: user.userID,
      name: `${user.firstname} ${user.lastname}`,
    };
    socket.emit('post', payload);
  };

  const handelGroupPost = (postContent, imageUrl, groupID) => {
    let payload = {
      postContent: postContent,
      userID: user.userID,
      groupID: groupID,
      imageUrl: imageUrl,
    };
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    socket.emit('groupPost', payload);
  };

  //----sending the comment to the server----//
<<<<<<< HEAD
  comment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: this.state.user.userID,
      commenter_image_url: this.state.user.image_url,
      name: `${this.state.user.firstname} ${this.state.user.lastname}`,
=======
  const newComment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: user.userID,
      name: `${user.firstname} ${user.lastname}`,
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    };
    socket.emit('comment', payload);
  };

<<<<<<< HEAD
  handleGroupComment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      postId: post_id,
      userId: this.state.user.userID,
    };
    // console.log('hello from group comment',payload);
    socket.emit('groupComment', payload);
  };
  //-----target getting info of the target profile from BE-----//
  targetProfile = (id) => {
=======
  const handleGroupComment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      postId: post_id,
      userId: user.userID,
    };
    socket.emit('groupComment', payload);
  };
  //-----target getting info of the target profile from BE-----//
  const targetProfile = (id) => {
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
    socket.emit('getTargetInfo', id);
    socket.emit('getTargetFollowing', id);
    socket.emit('getTargetFollowers', id);
    socket.emit('getTargetPosts', id);
  };
  //----updating the post like-----//
<<<<<<< HEAD
  like = (id) => {
    socket.emit('like', id);
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
                  showPosts="/profile/:id"
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
                  comment={this.comment}
                />
              )}
            </Route>
            <Route exact path="/addFriends">
              <AddFriends
                targetProfile={this.targetProfile}
                allusers={this.state.allusers}
                handleAddFriend={this.handleAddFriend}
                userID={this.state.user.userID}
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
            <Route exact path="/groups/:id">
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
                groupPostLike={this.groupPostLike}
                groupPostsLikes={this.state.groupPostsLikes}
                comment={this.handleGroupComment}
                groupComments={this.state.groupComments}
                showGroupComments={this.state.showGroupComments}
                getAllGroupComments={this.getAllGroupComments}
              />
            </Route>
            <Route exact path="/target/:id">
              <TargetProfile
                targetedProfileInfo={this.state.targetedProfileInfo}
                targetedFollowing={this.state.targetedFollowing}
                targetedFollowers={this.state.targetedFollowers}
                targetedPosts={this.state.targetedPosts}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
=======
  const like = (id) => {
    socket.emit('like', id);
  };

  return (
    <Router>
      <Header path={path} logOut={logOut} />
      <div>
        <Switch>
          <Route exact path="/">
            <Home
              logOut={logOut}
              loggedIn={loggedIn}
              loggedInFunction={loggedInFunction}
            />
            {loggedIn && path && (
              <Redirect to="/feedPage" />
            )}
          </Route>
          <Route exact path="/feedPage">
            {
              <FeedPage
                showPosts={showPosts}
                userID={user.userID}
                like={like}
                comments={comment}
                comment={newComment}
                allPosts={state.postReducer.posts}
                post={newPost}
                logOut={logOut}
              />
            }
          </Route>
          <Route exact path={path}>
            {path && (
              <Profile
                showPosts="/profile/:id"
                userID={user.userID}
                getFollowing={getFollowing}
                getFollowers={getFollowers}
                allFollowing={allFollowing}
                allFollowers={allFollowers}
                user={user}
                showFollowing={showFollowing}
                showFollowers={showFollowers}
                like={like}
                comments={comment}
                allPosts={posts}
                post={newPost}
                handleShowMessenger={handleShowMessenger}
                showMessenger={showMessenger}
                messageReceiverId={messageReceiverId}
                handleSendMessage={handleSendMessage}
                allMessages={allMessages}
                showMessages={showMessages}
                getUsergroups={getUsergroups}
                comment={newComment}
              />
            )}
          </Route>
          <Route exact path="/addFriends">
            <AddFriends
              targetProfile={targetProfile}
              allusers={allusers}
              handleAddFriend={handleAddFriend}
              userID={user.userID}
            />
          </Route>
          <Route exact path="/groups">
            <Groups
              handleCreateGroup={handleCreateGroup}
              handleJoinGroup={handleJoinGroup}
              getAllGroups={getAllGroups}
              allGroups={allGroups}
              showGroups={showGroups}
              getGroupRequests={getGroupRequests}
              GroupRequests={GroupRequests}
              showGroupsRequests={showGroupsRequests}
              handleAcceptJoinGroup={handleAcceptJoinGroup}
              getUsergroups={getUsergroups}
              usergroups={usergroups}
              showUsergroups={showUsergroups}
              handleViewgroup={handleViewgroup}
              currentGroupPath={currentGroupPath}
              showCurrentGroupPath={showCurrentGroupPath}
            />
          </Route>
          <Route exact path="/groups/:id">
            <CurrentGroup
              currentGroupContent={currentGroupContent}
              showCurrentGroupContent={showCurrentGroupContent}
              post={handelGroupPost}
              groupPosts={groupPosts}
              showGroupPosts={showGroupPosts}
              getAllGroupPosts={getAllGroupPosts}
              currentGroupID={currentGroupID}
              getGroupMembers={getGroupMembers}
              showCurrentGroupPath={showCurrentGroupPath}
              groupMembers={groupMembers}
              showGroupMembers={showGroupMembers}
              groupPostLike={groupPostLike}
              groupPostsLikes={groupPostsLikes}
              comment={handleGroupComment}
              groupComments={groupComments}
              showGroupComments={showGroupComments}
              getAllGroupComments={getAllGroupComments}
            />
          </Route>
          <Route exact path="/target/:id">
            <TargetProfile
              targetedProfileInfo={targetedProfileInfo}
              targetedFollowing={targetedFollowing}
              targetedFollowers={targetedFollowers}
              targetedPosts={targetedPosts}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
>>>>>>> 39bfeff03bffff3c4d233342209b1eb056a8e47c
}

export default App;



