import React, { Component } from 'react';

export class Post extends Component {

    like = (id) => {
        this.props.like(id);
    }
    render() {

        return (
            <div>
                {this.props.postContent}
                <button onClick={() => this.like(this.props.postID)}>Like</button>

                {this.props.comments.map((item, index) => {
                    let value;
                    if (this.props.postID === item.post_id) {
                        value = <div key={index}>{item.content}</div>
                    }
                    return value;

                })}

            </div>
        )
    }
}

export default Post
