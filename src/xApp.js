import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read } from './store/postReducer';
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

    socket.on('connect', () => {
      socket.emit('test');
      socket.emit('getAllUsers');
      socket.on('requestAccepted', (payload) => {

        if (
          user.userID === payload.memberId ||
          user.userID === payload.ownerId
        ) {
          let userID = user.userID;
          socket.emit('getAllGroups', { userID: userID });
          socket.emit('getUsergroups', { userID: userID });
          socket.emit('getGroupRequests', { userID: userID });
        }
      });
      socket.on('joinGroupRequest', (payload) => {
        if (user.userID === payload) {
          getGroupRequests();
        }
      });
      socket.on('groupisCreated', () => {
        let userID = user.userID;
        socket.emit('getAllGroups', { userID: userID });
        socket.emit('getUsergroups', { userID: userID });
      });
      socket.on('haveBeenFollowed', (payload) => {
        if (user.userID === payload) {
          getFollowers();
        }
      });
      socket.on('newGroupPostMade', (payload) => {


        if (currentGroupID === payload) {
          socket.emit('getAllGroupPosts', {
            groupID: currentGroupID,
          });
        }
      });
      socket.on('targetInfo', (payload) => {
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


      });
      socket.on('newUsersList', () => {
        socket.emit('getAllUsers');
      });
    });

    socket.on('returnAllUsers', (data) => {

      setAllusers(data);


    });

    socket.on('returnFollowing', (data) => {
      let data2 = data;


      setAllFollowing(data2);
      setShowFollowing(true);


    });

    socket.on('returnFollowers', (data) => {
      let data2 = data;

      setAllFollowers(data2);
      setShowFollowers(true);

    });

    socket.on('returnMessages', (returnedMessages) => {
      let messages = returnedMessages;


      setAllMessages(messages);
      setShowMessages(true);


    });

    socket.on('returnAllGroups', (returnedGroups) => {
      // let groups = returnedGroups;


      setAllGroups(returnedGroups);
      setShowGroups(true);


    });

    socket.on('returnGroupRequests', (returnedGroupRequests) => {
      let GroupRequests = returnedGroupRequests;


      setGroupRequests(GroupRequests);
      setShowGroupsRequests(true);

    });

    socket.on('returnUsergroups', (data) => {
      let usergroups = data;


      setUsergroups(usergroups);
      setShowUsergroups(true);


    });

    socket.on('returnGroupMembers', (data) => {
      let groupMembers = data;

      setGroupMembers(groupMembers);
      setShowGroupMembers(true);


    });

    socket.on('returnCurrentGroupContent', (data) => {
      let currentGroupContent = data;
      setCurrentGroupContent(currentGroupContent);
      setShowCurrentGroupContent(true);
    });

    socket.on('error', (payload) => {
      console.log(payload);
    });

    //-----requesting to get the post from the server-----//
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

    });

    socket.on('returnGroupLikes', (payload) => {
      let info = payload;

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
    }
    let payload = {
      messageRoomId: room,
    };

    socket.emit('returnAllMessages', payload);
  };

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
      messageRoomId: room,
    };
    socket.emit('sendMessage', payload);
  };

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
    let payload = {
      groupId: groupId,
      memberId: memberId,
      ownerId: owner_id,
    };
    socket.emit('acceptJoinGroup', payload);
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
      groupId: groupId,
    };
    socket.emit('groupPostLike', payload);
  };

  //-----sending the post to the server-----//
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
    socket.emit('groupPost', payload);
  };

  //----sending the comment to the server----//
  const newComment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: user.userID,
      name: `${user.firstname} ${user.lastname}`,
    };
    socket.emit('comment', payload);
  };

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
    socket.emit('getTargetInfo', id);
    socket.emit('getTargetFollowing', id);
    socket.emit('getTargetFollowers', id);
    socket.emit('getTargetPosts', id);
  };
  //----updating the post like-----//
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
}

export default App;



