import React, { useState, useContext } from 'react';
import { DataContext } from '../context/data';

export default function CommentForm(props) {
  const context = useContext(DataContext);

  const [content, setcontent] = useState('');
  const comment = (e) => {
    e.preventDefault();
    context.methods.newComment(content, props.id);
  };
  return (
    <div>
      <form
        className="commentForm"
        onSubmit={(e) => {
          comment(e);
        }}
      >
        <input
          required
          placeholder="type your comment here"
          type="text"
          onChange={(e) => {
            setcontent(e.target.value);
          }}
        />
        <input className="mybuttonnn" type="submit" value="comment" />
      </form>
    </div>
  );
}
