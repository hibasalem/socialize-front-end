// import e from 'cors'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    input: {
      display: 'none',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  },
}));

export function PostForm(props) {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [showForm, setshowForm] = useState(false);

  const post = (e) => {
    e.preventDefault();

    props.post(content, imageUrl, props.groupId);
    setFile('');
    setImageUrl('');
    setPercentage(0);
    e.target.reset();
  };

  useEffect(() => {
    handelUploadImage();
  }, [file]);

  useEffect(() => {
    setshowForm(false);
  }, []);

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
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  '%'
              );
              setPercentage(
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
              );
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
    <div className="formthings">
      <div className="theIcon">
        <div id="CREATE" className="addicon">
          <Fab
            onClick={() => setshowForm(true)}
            className="Fab"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
        <h5> Create Post </h5>
      </div>

      {showForm && (
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
          <div className="formButtons">
            <Button
              className="newbuttn3"
              color="default"
              type="submit"
              value="post"
              startIcon={<PostAddIcon />}
              variant="outlined"
            >
              Post
            </Button>
          </div>
          {/* <div className="formButtons"> */}
          <div id="upload" className={classes.root}>
            <input
              style={{ display: 'none' }}
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handelOnChangeImage}
            />
            <label htmlFor="icon-button-file">
              <Button
                onClick={() => handelUploadImage}
                color="default"
                component="span"
                startIcon={<CloudUploadIcon />}
                className="newbuttn3"
                variant="outlined"
              >
                Upload Image
              </Button>
            </label>
          </div>
          {/* </div> */}

          {percentage > 0 && (
            <LinearProgress
              variant="determinate"
              color="primary"
              className="progress"
              value={percentage}
            />
          )}
        </form>
      )}
      {/* <a href="#CREATE"> */}
      <Fab
        className="Fab2"
        aria-label="add"
        onClick={() => window.scrollTo(0, 0)}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
      {/* </a> */}
    </div>
  );
}

export default PostForm;
