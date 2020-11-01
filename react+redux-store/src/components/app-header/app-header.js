import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './app-header.scss';

const AppHeader = ({total}) => {
    return (
        <header className="header">
            <Link to={'/'} className="header__link">Menu</Link>
            <Link to={"/cart"} className="header__link">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total:{total}$
            </Link>
        </header>
    )
};

export default connect()(AppHeader);