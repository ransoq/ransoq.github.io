import React from 'react';
import { useHistory } from 'react-router-dom';
import './useHistory.css';

const HomeButton = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    }

    return (
        <div>
            <button 
                className="home-btn"
                onClick={handleClick} type="button">Go Home</button>
        </div>
    );
}

export default HomeButton;