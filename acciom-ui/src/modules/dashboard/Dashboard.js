import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
          ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
          ['2019', 10, 11, 12, 13],
          ['2020', 20, 11, 14, 13],
          ['2021', 30, 15, 12, 13]
        ];
    }

    render () {
        return (
            <div> Am from Dashboard
            </div>
        );
    }
};

export default Dashboard;
