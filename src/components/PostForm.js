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
          onSubmit={(e) => {
            this.post(e);
          }}
        >
          <label>what on your mind</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({
                content: e.target.value,
              });
            }}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default PostForm;
