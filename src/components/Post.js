import React, { Component } from 'react';

export class Post extends Component {
    render() {

        return (
            <div>
                {this.props.postContent}
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
