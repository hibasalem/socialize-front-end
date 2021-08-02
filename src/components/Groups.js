import React, { Component } from 'react'

export class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: ''
    }
  }
  componentDidMount = () => {
    // console.log(this.props.user);
    this.props.getAllGroups();
  };
  createGroup = (e) => {
    e.preventDefault();
    this.props.handleCreateGroup(this.state.groupName, this.state.groupDescription);
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.createGroup(e) }} >
          <label>Create a group</label>
          <input type='text' placeholder='Enter Group Name' onChange={(e) => {
            this.setState({
              groupName: e.target.value
            })
          }} />
          <input type='text' placeholder='Enter Description' onChange={(e) => {
            this.setState({
              groupDescription: e.target.value
            })
          }} />
          <input type='submit' />
        </form>
        {this.props.showGroups && this.props.allGroups.map((item, idx) => {
          return (
            <>
              <p><b>{item.group_name}</b></p>
              <p>Description: {item.group_description}</p>
              <button 
              onClick={() => this.props.handleJoinGroup(item.id)}
              >
                Join Group
              </button>
            </>
          );
        })}

      </div>
    )
  }
}

export default Groups
