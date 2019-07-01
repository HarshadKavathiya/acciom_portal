import React from 'react';
import { loginService } from '../../services';

import { Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuth: false
        };
    }

    validateForm () {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        //akhil.bhardwaj@accionlabs.com , password: 123
        loginService(
            this.state.email,
            this.state.password
        ).then(
            (reponse) => {
                localStorage.setItem('token', reponse.data['access_token']);
                localStorage.setItem('isAuth', reponse.data['access_token']);
                this.setState({
                    email: 'g@gmail.com',
                    password: 'dsfff',
                    isAuth: true
                });
            },
            (error) => {
                alert('error logging', error);
            }
        ).catch((error) => {
            alert('exception while login');
        });
    }
    render () {
        if (this.state.isAuth) {
            return <Redirect to='/' />
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"/>
                    <button
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </button>
                </form>
            );
        }
    }
};

export default Login;

