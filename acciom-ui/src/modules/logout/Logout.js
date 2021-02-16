import React from 'react';
import { logoutService } from '../../services';
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {
    render () {
        logoutService();
        //redirect to login page.
        return(
            <Redirect to='/logout' />
        );
    }
};

export default Dashboard;