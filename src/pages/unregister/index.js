import React, { Component } from 'react';
import './index.scss';
import maskFigure from '../../img/svg/MaskFigureUnregister2.svg';

const UnregisterPage = ({authenticationUrl}) => {
    return <div>
        <button className="btn btn-outline-primary auth-btn" onClick={ev=>{window.location.assign(authenticationUrl);}}>Авторизация</button>
        <embed className="figure-image" src={maskFigure}></embed>
        {/* <div className="jumbotron-reg">
            Дипломная работа Ходырева Александра по курсу js с использованием API unsplash.
        </div> */}
    </div>;
}

export default UnregisterPage;