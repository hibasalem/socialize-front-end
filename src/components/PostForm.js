// import e from 'cors'
import React, { Component } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      file: '',
      imageUrl: '',
      percentage:0
    };
  }
  post = (e) => {
    e.preventDefault();

    this.props.post(
      this.state.content,
      this.state.imageUrl,
      this.props.groupId
    );
    this.setState({
      file: '',
      imageUrl: '',
      percentage:0
    });
    e.target.reset();
  };
  

  handelOnChangeImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  };

  handelUploadImage = () => {
    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name);
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
            this.setState({
              percentage: Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            })
          },
        }
      )
      .then((res) => {
        console.log(res.data.url);
        this.setState({
          imageUrl: res.data.url,
        });
      });
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
          <input type="file" onChange={this.handelOnChangeImage} />
          <input
            type="button"
            value="Upload"
            onClick={this.handelUploadImage}
          />
          <input className="mybuttonnn" type="submit" value="post" />
          {
            this.state.percentage > 0 &&

          <ProgressBar now={this.state.percentage} label={`${this.state.percentage}%`} />
          }
          
        </form>
      </div>
    );
  }
}

export default PostForm;
