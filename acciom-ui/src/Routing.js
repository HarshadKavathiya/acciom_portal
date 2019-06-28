import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Reports, Admin, Dashboard, Logout }  from './modules/';
import CONSTANTS from './constants/CONSTANTS';

class Routing extends React.Component {
    setLocalStorage() {
        localStorage.setItem('token', CONSTANTS.USER_TOKEN);
    }
    render () {
        this.setLocalStorage();
        return (
            <div className="content">
                <Switch>
                	<Route path="/dashboard"
                        component= {() => <Dashboard />}
                    />
                    <Route path="/reports"
                        component= {() => <Reports />}
                    />
                    <Route path="/admin"
                        component= {() => <Admin />}
                    />
                    <Route path="/logout"
                        component= {() => <Logout />}
                    />
                </Switch>
            </div>
        );
    }
};

export default Routing;