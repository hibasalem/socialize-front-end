import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Friend extends Component {
  constructor(props){
    super(props);
    this.state={
      path:`/target/${this.props.item.id}`
    }
  }
  // setPath (id){
  //   this.setState({
  //     path:`/profile/${id}`
  //   })
  // }
  // componentDidMount=()=>{
  //   this.props.setPath(this.props.item.id)
  // }
  targetProfile=()=>{
    this.props.targetProfile(this.props.item.id);
  
   }
  render() {
    return (
      <div key={this.props.item.id}>
        
        <nav>
          <Link to={this.state.path} onClick={()=>{this.targetProfile()}}>{this.props.item.firstname} {this.props.item.lastname}</Link>
        
        </nav>
        <button onClick={() => this.props.handleAddFriend(this.props.item.id)}>
          Add Friend
        </button>
      </div>
    );
  }
}

export default Friend;
