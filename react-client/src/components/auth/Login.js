import React, { Component } from 'react';
import './Login.css';
import {userService} from '../../services';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var newUser = {...this.state.user}
        newUser[event.target.name] = event.target.value;

        this.setState({
            user: newUser
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let userPromise = userService.login(this.state.user.username, this.state.user.password);
        userPromise.then(data => {console.log(data)})
            .catch(err => {
                console.log(err);
            })

    }

    componentDidMount() {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => this.setState({hits: data}));
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <input name="username" type="text" className="form-control" placeholder="Your name" required="required" onChange={this.handleChange} value={this.state.user.username}/>
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" className="form-control" placeholder="Password" required="required" onChange={this.handleChange} value={this.state.user.password}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;