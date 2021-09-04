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
import Groups from './components/Groups';
import TargetProfile from './components/TargetProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataProvider from './context/data';

export default function App() {
  return (
    <div>
      <DataProvider>
        <Router>
          <Header path={this.state.path} logOut={this.logOut} />
          <div>
            <Switch>
              <Route exact path="/">
                <Home
                // logOut={this.logOut}
                // loggedIn={this.state.loggedIn}
                // loggedInFunction={this.loggedIn}
                
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
      </DataProvider>
    </div>
  );
}
