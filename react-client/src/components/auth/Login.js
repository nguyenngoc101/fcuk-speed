import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    componentDidMount() {
        fetch('http://localhost:8080/users')
            .then(users => {
                console.log("fetching data....");
                console.log(JSON.stringify(users));
            });
    }

    render() {
        return (
            <div className="login-form">
                <form action="#" method="post">
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your name" required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required="required"/>
                    </div>
                    <div className="form-group">
                        <a className="btn btn-primary btn-block">Log In</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;