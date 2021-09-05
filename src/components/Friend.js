import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: `/target/${this.props.item.id}`,
    };
  }

  targetProfile = () => {
    this.props.targetProfile(this.props.item.id);
  };
  render() {
    return (
      <div className="personCont" key={this.props.item.id}>
        {/* {console.log('hello', this.props.item)} */}
        <nav>
          <Link
            className="personName"
            to={this.state.path}
            onClick={() => {
              this.targetProfile();
            }}
          >
            <Image
              src={this.props.item.image_url}
              roundedCircle
              height="40px"
            />
            &nbsp;
            {this.props.item.firstname} {this.props.item.lastname}
          </Link>
        </nav>
        <button
          className="mybuttonnn"
          onClick={() => this.props.handleAddFriend(this.props.item.id)}
        >
          Follow
        </button>
      </div>
    );
  }
}

export default Friend;
