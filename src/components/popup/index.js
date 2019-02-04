import React from 'react';
import closeSVG from '../../img/svg/close.svg';
import downloadSVG from '../../img/svg/126488.svg';
import './index.scss';

const Popup = ({ state, popupImage }) => {
    document.querySelector('.photos-grid-view').classList.add('blur');
    document.querySelector('.navbar').classList.add('blur');
    document.body.style.overflow = 'hidden';
    return <div className="popup">
        <div className="bg-popup" onClick={ev=>popupImage(-1, {}, {})}></div>
        <div className="popup-component">
            <div className="close-popup-bg" onClick={ev=>popupImage(-1, {}, {})}></div>
            <img src={closeSVG} alt="" className="close-btn" onClick={ev=>popupImage(-1, {}, {})} />
            <div className="popupContainer">
                <div className="popup_header">
                    <span className="popup_user-card">
                        <img src={state.image.user.profile_image.small} alt="" className="popup_profile-image" />
                        <div className="popup_profile-links">
                            <b className="popup_user-card__user-name"> {state.image.user.name}</b>
                            <br/>
                            <b> <a href={state.image.user.links.html} target="_blank" rel="noopener noreferrer" className="popup_user-card__user-login">@{state.image.user.username}</a></b>
                        </div>
                    </span>
                    <a href={state.image.links.download} target="_blank" rel="noopener noreferrer">
                        <img src={downloadSVG} alt="" className="download" />
                    </a>
                    <button className="like-button popup-like">
                        <img src="/static/media/61731.5fc44516.svg" alt="" className="like-small" />
                        <span className="likes">{state.image.likes}</span>
                    </button>
                </div>
                <img src={state.image.urls.regular} alt="" className="image i-min" />
            </div>
        </div>
    </div>;
}

export default Popup;