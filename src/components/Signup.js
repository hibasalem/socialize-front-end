import React, { Component } from 'react';

 class Signup extends Component {
  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.signup(e) }}>
                    <label>enter Email:</label>
                    <input type='text' placeholder='your Email' required onChange={(e) => {
                        this.setState({ email: e.target.value })
                        console.log(this.state.email);
                    }} />
                    <label>enter password:</label>
                    <input type='password' placeholder='your Password' required onChange={(e) => {
                        this.setState({ password: e.target.value });
                        console.log(this.state.password);
                    }} />
                    <label>first name:</label>
                    <input type='text' required onChange={(e) => { this.setState({ firstName: e.target.value }); console.log(this.state.firstName) }} />
                    <label>last name:</label>
                    <input type='text' required onChange={(e) => { this.setState({ lastName: e.target.value }); console.log(this.state.lastName) }} />
                    <input type='submit' />
                </form>
      </div>
    )
  }
}

export default Signup
