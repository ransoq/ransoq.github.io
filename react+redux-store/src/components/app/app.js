import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import ItemPage from '../pages/itemPage'

import Background from './food-bg.jpg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/cart' exact component={CartPage}/>
                    <Route path = '/:id' component ={ItemPage}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;