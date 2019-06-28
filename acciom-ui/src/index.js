import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routing from './Routing';
import './webcomponents/PlotNav';

ReactDOM.render(
    <BrowserRouter>
        <Route component={Routing}/>
    </BrowserRouter>,
    document.getElementById('root')
);
