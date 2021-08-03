import React, { Component } from 'react'

export class TargetProfile extends Component {
    render() {
        return (
            <div className="target">
                someStuff
                <div>
                    hi {this.props.targetedProfileInfo.firstname} {this.props.targetedProfileInfo.lastname}
                    </div>
                <div>
                    <h2>all following</h2>
                    {this.props.targetedFollowing.map((element,index)=>{
                        return(<div key={index}>{element.firstname} {element.lastname}</div>)
                    })}
                </div>
                <div>
                    <h2>all followers</h2>
                    {this.props.targetedFollowers.map((element,index)=>{
                        return(<div key={index}>{element.firstname} {element.lastname}</div>)
                    })}

                </div>
                <div>
                    {this.props.targetedPosts.map((element,index)=>{
                        return(<div key={index}>
                            {element.content}
                        </div>)
                    })}
                </div>
                {this.props.targetedProfileInfo.id}
            </div>
        )
    }
}

export default TargetProfile
