import React, { Component } from 'react';
import './index.scss';
import maskFigure from '../../img/svg/MaskFigureUnregister2.svg';

const UnregisterPage = ({authenticationUrl}) => {
    return <div>
        <div className="jumbotron-reg">
            <span>Дипломная работа Ходырева Александра по курсу js с использованием API unsplash.</span>
        </div>
        <embed className="figure-image" src={maskFigure}></embed>
    </div>;
}

export default UnregisterPage;