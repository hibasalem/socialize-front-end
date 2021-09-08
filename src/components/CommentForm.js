import React, { Component, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export function CommentForm(props) {
  const [content, setContent] = useState('');

  const comment = (e) => {
    e.preventDefault();
    props.comment(content, props.id);
    e.target.reset();
  };

  return (
    <div>
      <form
        className="commentForm"
        onSubmit={(e) => {
          comment(e);
        }}
      >
        <TextField
          className="commentInput"
          required
          id="standard-basic"
          label="Type Your Comment Here"
          placeholder="Type Your Comment Here"
          type="text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <Button className="newbuttn3" variant="outlined" type="submit">
          Comment
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
