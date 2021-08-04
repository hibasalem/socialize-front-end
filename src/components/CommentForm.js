import React, { Component } from 'react';

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  comment = (e) => {
    e.preventDefault();
    this.props.comment(this.state.content, this.props.id);
  };
  render() {
    return (
      <div>
        <form
          className="commentForm"
          onSubmit={(e) => {
            this.comment(e);
          }}
        >
          <input
            placeholder="type your comment here"
            type="text"
            onChange={(e) => {
              this.setState({
                content: e.target.value,
              });
            }}
          />
          <input className="mybuttonnn" type="submit" value="comment" />
        </form>
      </div>
    );
  }
}

export default CommentForm;
