import React, { Component } from 'react'

export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }
    comment = (e) => {
        e.preventDefault();
        this.props.comment(this.state.content, this.props.id);
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => { this.comment(e) }} >
                    <label>comment</label>
                    <input type='text' onChange={(e) => {
                        this.setState({
                            content: e.target.value
                        })
                    }} />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default CommentForm
