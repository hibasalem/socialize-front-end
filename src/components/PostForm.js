// import e from 'cors'
import React, { useState} from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'

export function PostForm(props){
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [percentage, setPercentage] = useState(0);

  const post = (e) => {
    e.preventDefault();

    props.post(
      content,
      imageUrl,
      props.groupId
    );
    setFile('');
    setImageUrl('');
    setPercentage(0);
    e.target.reset();
  };
  

  const handelOnChangeImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handelUploadImage = () => {
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
            setPercentage(Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100))
          },
        }
      )
      .then((res) => {
        console.log(res.data.url);
        setImageUrl(res.data.url);
      });
  };

  
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
          <input
            type="button"
            value="Upload"
            onClick={handelUploadImage}
          />
          <input className="mybuttonnn" type="submit" value="post" />
          {
            percentage > 0 &&

          <ProgressBar now={percentage} label={`${percentage}%`} />
          }
          
        </form>
      </div>
    );

}

export default PostForm;
