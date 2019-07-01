import React from 'react';
import { logoutService } from '../../services';


class Dashboard extends React.Component {
    render () {
        logoutService();
        //redirect to login page.
        return(
            <div>
                Successful logout.
            </div>
        );
    }
};

export default Dashboard;