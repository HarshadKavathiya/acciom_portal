import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Reports, Admin, Dashboard, Logout, Header, Login } from './modules/';
//import CONSTANTS from './constants/CONSTANTS';

class Routing extends React.Component {
    isLoggedin () {
        let token = localStorage.getItem('token');
        return token ? true : false;
    }
    setToken () {
        let token = localStorage.getItem('token');
        if (token) {

        } else {
            localStorage.setItem('token', Math.random());
        }
    }
    render () {
        //this.setToken();// need to comment after completing login functionality
        if (this.isLoggedin()) {
            return (
                <div className="content">
                    <Header></Header>
                    <Switch>
                        <Route path="/dashboard"
                            component= {() => <Dashboard />}
                        />
                        <Route path="/reports"
                            exact={true}
                            component= {() => <Reports />}
                        />
                        <Route path="/admin"
                            exact={true}
                            component= {() => <Admin />}
                        />
                        <Route path="/logout"
                            exact={true}
                            component= {() => <Logout />}
                        />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className="content">
                    <Switch>
                        <Route path="/login"
                            exact={true}
                            component= {() => <Login />}
                        />
                        <Redirect from="/" to="/login" />
                    </Switch>
                </div>
            );
        }
    }
};

export default Routing;