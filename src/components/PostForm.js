// import e from 'cors'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { FcLike } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    input: {
      display: 'none',
    },
  },
}));



export function PostForm(props) {
  const classes = useStyles();
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

  useEffect(() => {
    handelUploadImage();
  }, [file])

  const handelOnChangeImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handelUploadImage = () => {
    if (file) {
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
    }
  };


  return (
    <div>
      <form
        className="postForm"
        onSubmit={(e) => {
          post(e);
        }}
      >
        <textarea
          required
          type="text"
          placeholder="type your post here "
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        {/* <input type="file" onChange={handelOnChangeImage} /> */}
        {/* <input
          type="button"
          value="Upload"
          onClick={handelUploadImage}
        /> */}
        <div className={classes.root}>
          <input style={{ display: 'none' }} accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handelOnChangeImage} />
          <label htmlFor="icon-button-file">
            {/* <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => handelUploadImage
            }>
              <FcLike />
            </IconButton> */}
          <Button
           onClick={() => handelUploadImage}
            variant="contained"
            color="default"
            component="span"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
  
          </label>
        </div>
        {/* <input className="mybuttonnn" type="submit" value="post" /> */}
        <Button variant="contained" color="default" type="submit" value="post">Post</Button>
        {
          percentage > 0 &&

          <ProgressBar now={percentage} label={`${percentage}%`} />
        }

      </form>
    </div>
  );

}

export default PostForm;
