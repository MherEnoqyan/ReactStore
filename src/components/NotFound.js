import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

    render() {
        return (
            <div className="container text-center">
                <h1>404</h1>
                <h1>Page Not Found</h1>
                <p><Link to="/">Back to store</Link></p>
            </div>
        );
    }
}

export default NotFound;
