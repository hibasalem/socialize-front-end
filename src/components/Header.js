import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <div className="Header">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </nav>
                
            </div>
        )
    }
}

export default Header
