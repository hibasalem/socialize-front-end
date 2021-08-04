import React, { Component } from 'react';

export class Post extends Component {

    like = (id) => {
        this.props.like(id);
    }
    render() {

        return (
            <div>
                <h4>{this.props.poster_name} At { new Date(this.props.post_time).toLocaleString()} </h4>
                {this.props.postContent}
                <button onClick={() => this.like(this.props.postID)}>Like</button>

                {this.props.comments.map((item, index) => {
                    let value;
                    if (this.props.postID === item.post_id) {
                        value = <>
                        <h5>{item.commenter_name} AT {item.send_time}</h5>
                        <div key={index}>{item.content}
                        </div></>
                    }
                    return value;

                })}

            </div>
        )
    }
}

export default Post
