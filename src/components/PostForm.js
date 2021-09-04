// import e from 'cors'
import React, { useState, useContext } from 'react';
import axios from 'axios';

import { DataContext } from '../context/data';

export default function PostForm(props) {
  const context = useContext(DataContext);

  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function post(e) {
    e.preventDefault();

    props.post(content, imageUrl, context.state.currentGroupID);

    setFile('');
    setImageUrl('');
    e.target.reset();
  }

  function handelOnChangeImage(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  function handelUploadImage() {
    const fd = new FormData();
    fd.append('image', file, file.name);
    axios
      .post(
        'https://us-central1-graphite-cell-321207.cloudfunctions.net/uploadFile',
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              'upload Progress : ' +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                '%'
            );
          },
        }
      )
      .then((res) => {
        console.log(res.data.url);
        setImageUrl(res.data.url);
      });
  }

  return (
    <div>
      <form
        className="postForm"
        onSubmit={(e) => {
          post(e);
        }}
      >
        <input
          required
          type="text"
          placeholder="type your post here "
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <input type="file" onChange={handelOnChangeImage} />
        <input type="button" value="Upload" onClick={handelUploadImage} />

        <input className="mybuttonnn" type="submit" value="post" />
      </form>
    </div>
  );
}
