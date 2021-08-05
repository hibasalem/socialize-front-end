// import e from 'cors'
import React, { Component } from 'react';

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  post = (e) => {
    e.preventDefault();
    this.props.post(this.state.content, this.props.groupId);
  };

  render() {
    return (
      <div>
        <form
          className="postForm"
          onSubmit={(e) => {
            this.post(e);
          }}
        >
          <input
            required
            type="text"
            placeholder="type your post here "
            onChange={(e) => {
              this.setState({
                content: e.target.value,
              });
            }}
          />
          <input className="mybuttonnn" type="submit" value="post" />
        </form>
      </div>
    );
  }
}

export default PostForm;
