import { useState, createContext, useEffect } from 'react';
import { socket } from './socket';

export const DataContext = createContext();

export default function Data(props) {
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

  console.log('1111');
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
  const [groupComments, setGroupComments] = useState([]);
  const [showGroupComments, setShowGroupComments] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('test');
      socket.emit('getAllUsers');
      socket.on('requestAccepted', (payload) => {
        // console.log(payload.ownerId);
        // console.log(payload.memberId);
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
      socket.on('newLike', () => {
        socket.emit('getAllPosts', { userID: user.userID });
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
        console.log('currentGroupID ', currentGroupID);
        console.log('payload ', payload);
        if (currentGroupID === payload) {
          socket.emit('getAllGroupPosts', {
            groupID: currentGroupID,
          });
        }
      });
      socket.on('targetInfo', (payload) => {
        setTargetedProfileInfo(payload[0]);

        // console.log(targetedProfileInfo);
      });

      socket.on('targetFollowing', (payload) => {
        setTargetedFollowing(payload);
        // console.log(targetedFollowing);
      });
      socket.on('targetFollowers', (payload) => {
        setTargetedFollowers(payload);

        // console.log(targetedFollowers);
      });
      socket.on('targetPosts', (payload) => {
        setTargetedPosts(payload);
        // console.log(targetedPosts);
      });
      socket.on('newUsersList', () => {
        socket.emit('getAllUsers');
      });
    });

    // socket.on('newuser',()=>{
    //   socket.emit('getAllUsers');
    // })
    socket.on('returnAllUsers', (data) => {
      setAllusers(data);
      // console.log(allusers);
    });

    socket.on('returnFollowing', (data) => {
      let data2 = data;
      // console.log(data);

      setAllFollowing(data2);
      setShowFollowing(true);
      console.log('following', allFollowing);
    });

    socket.on('returnFollowers', (data) => {
      let data2 = data;
      // console.log(data);
      setAllFollowers(data2);
      setShowFollowers(true);
      console.log('followers', allFollowers);
    });

    socket.on('returnMessages', (returnedMessages) => {
      let messages = returnedMessages;
      // console.log(data);
      setAllMessages(messages);
      setshowMessages(true);

      console.log('messages', allMessages);
    });

    socket.on('returnAllGroups', (returnedGroups) => {
      // let groups = returnedGroups;
      // console.log('before',groups);
      setAllGroups(returnedGroups);
      setShowGroups(true);
      // console.log('groups', allGroups);
    });

    socket.on('returnGroupRequests', (returnedGroupRequests) => {
      let GroupRequests = returnedGroupRequests;
      // console.log('hi');
      setGroupRequests(GroupRequests);
      setShowGroupsRequests(true);

      console.log('GroupRequests', GroupRequests);
    });

    socket.on('returnUsergroups', (data) => {
      let usergroups = data;
      // console.log('usergroups', usergroups);
      setUsergroups(usergroups);
      setShowUsergroups(true);
      console.log('usergroups', usergroups);
    });

    socket.on('returnGroupMembers', (data) => {
      let groupMembers = data;

      setGroupMembers(groupMembers);
      setShowGroupMembers(true);

      console.log('usergroups', usergroups);
    });

    socket.on('returnCurrentGroupContent', (data) => {
      let currentGroupContent = data;
      // console.log('usergroups', usergroups);
      setCurrentGroupContent(currentGroupContent);
      setShowCurrentGroupContent(true);

      console.log('currentGroupContent', currentGroupContent);
    });

    socket.on('error', (payload) => {
      console.log(payload);
    });

    //-----requesting to get the post from the server-----//
    socket.emit('getAllPosts', { userID: user.userID });

    //---requestin to get the comments from the server---//
    socket.emit('getAllComments', { userID: user.userID });

    //-------getting the posts from the server-------//
    socket.on('read', (payload) => {
      let stuff = payload;
      setPosts(stuff);
      setShowPosts(true);

      console.log('this is the read ', posts.length);
    });

    //------getting the comments from the server------//
    socket.on('readComments', (payload) => {
      setComments(payload);
    });

    socket.on('returnGroupComments', (payload) => {
      setGroupComments(payload);
      setShowGroupComments(true);
      console.log('returned comments payload', payload);
    });

    //------notification of a new post ------//
    socket.on('newPost', () => {
      socket.emit('getAllPosts', { userID: user.userID });
    });

    socket.on('returnNewGroupPost', (data) => {
      let groupPosts = data;
      console.log('groupPosts', groupPosts);
      setGroupPosts(groupPosts);
      setShowGroupPosts(true);
      console.log('groupPosts', groupPosts);
    });

    socket.on('returnGroupLikes', (payload) => {
      let info = payload;
      console.log('what is this', payload);
      socket.emit('getAllGroupPosts', { groupID: info[0].g_groups_id });
    });
  }, []);

  const getAllGroupPosts = (data) => {
    // console.log('this is data: ', data);
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

  const logIn = (user) => {
    console.log('user', user);

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
    setPath(`/profile/${user.userID}`);
    let payload = {
      userID: user.userID,
    };
    socket.emit('getAllPosts', { userID: user.userID });
    socket.emit('getNewUsersList');
    // console.log(posts);
    // socket.emit('join', { userID: user.userID });
    // console.log('user', path, user);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  const handleAddFriend = (reciverId) => {
    console.log('following...');
    let data = { reciverId: reciverId, senderId: user.userID };
    console.log(data);
    socket.emit('addFriend', data);
    getFollowing();
    getFollowers();
    socket.on('friendAdded', () => {
      socket.emit('getAllPosts', { userID: user.userID });
    });
    // socket.emit('joinFollowRoom', { reciverId });
    // socket.emit('getAllPosts', { userID: user.userID });
  };

  const handleShowMessenger = (reciverId) => {
    setShowMessenger(true);
    setMessageReceiverId(receiverId);

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
    // getAllGroups();
    // getUsergroups();
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
    // console.log('accept pressed');
    // getGroupRequests();
  };

  const handleViewgroup = (groupId) => {
    let payload = {
      groupId: groupId,
    };
    setCurrentGroupID(groupId);
    setCurrentGroupPath(`/groups/${groupId}`);
    setShowCurrentGroupPath(true);

    socket.emit('viewGroup', payload);
    // console.log(payload);
    // getGroupRequests();
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
  const post = (postContent, imageUrl) => {
    let payload = {
      postContent: postContent,
      imageUrl: imageUrl,
      userID: user.userID,
      poster_image_url: user.image_url,
      name: `${user.firstname} ${user.lastname}`,
    };
    console.log(payload);
    socket.emit('post', payload);
  };

  const handelGroupPost = (postContent, imageUrl, groupID) => {
    let payload = {
      postContent: postContent,
      userID: user.userID,
      groupID: groupID,
      imageUrl: imageUrl,
    };
    console.log('groupPost', payload);
    socket.emit('groupPost', payload);
  };

  //----sending the comment to the server----//
  const newComment = (commentContent, post_id) => {
    let payload = {
      content: commentContent,
      post_id: post_id,
      userID: user.userID,
      commenter_image_url: user.image_url,
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
    // console.log('hello from group comment',payload);
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

  const state = {
    loggedIn,
    user,
    path,
    allusers,
    allFollowing,
    showFollowing,
    allFollowers,
    showFollowers,
    posts,
    comment,
    showMessenger,
    messageReceiverId,
    allMessages,
    showMessages,
    allGroups,
    showGroups,
    GroupRequests,
    showGroupsRequests,
    showPosts,
    usergroups,
    showUsergroups,
    currentGroupPath,
    showCurrentGroupPath,
    currentGroupContent,
    showCurrentGroupContent,
    targetedProfileInfo,
    targetedFollowing,
    targetedFollowers,
    targetedPosts,
    groupPosts,
    showGroupPosts,
    currentGroupID,
    groupMembers,
    showGroupMembers,
    groupPostsLikes,
    groupComments,
    showGroupComments,
  };

  const methods = {
    getAllGroupPosts,
    getAllGroupComments,
    getGroupMembers,
    getFollowing,
    getFollowers,
    getGroupRequests,
    getUsergroups,
    getAllGroups,
    logIn,
    logOut,
    handleAddFriend,
    handleShowMessenger,
    handleSendMessage,
    handleCreateGroup,
    handleJoinGroup,
    handleAcceptJoinGroup,
    handleViewgroup,
    groupPostLike,
    post,
    handelGroupPost,
    newComment,
    handleGroupComment,
    targetProfile,
    like,
  };

  return (
    <DataContext.Provider value={(state, methods)}>
      {props.children}
    </DataContext.Provider>
  );
}
