import React, { Component } from 'react';
import './index.scss';
import maskFigure from '../../img/svg/MaskFigureUnregister2.svg';
import { authenticationUnsplash, unsplash } from '../../apis/unsplash';

const UnregisterPage = () => {
    return <div>
        <button className="btn btn-outline-primary auth-btn" onClick={ev=>{authenticationUnsplash(unsplash);}}>Авторизация</button>
        <embed className="figure-image" src={process.env.PUBLIC_URL + maskFigure}></embed>
    </div>;
}

export default UnregisterPage;