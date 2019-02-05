import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import closeSVG from '../../img/svg/close.svg';
import downloadSVG from '../../img/svg/126488.svg';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';
import './index.scss';

const Popup = (ev, state, statePopupImage, popupImage, index, unsplash, likeImage) => {
    if(document.querySelector('.photos-grid-view') && state.settings.blur) {
        document.querySelector('.photos-grid-view').classList.add('blur');
        document.querySelector('.navbar').classList.add('blur');
    }
    document.body.style.overflow = 'hidden';
    if(statePopupImage.id > -1) {
        let liked_by = statePopupImage.image.liked_by_user?liked:like;
        return <div className="popup">
            <Link to="/">
                <div className="bg-popup" ></div>
            </Link>
            <div className="popup-component">
                <Link to="/">
                    <div className="close-popup-bg" ></div>
                    <img src={closeSVG} alt="" className="close-btn"  />
                </Link>
                <div className="popupContainer">
                    <div className="popup_header">
                        <div className="popup_user-card">
                            <img src={statePopupImage.image.user.profile_image.small} alt="" className="popup_profile-image" />
                            <div className="popup_profile-links">
                                <b className="popup_user-card__user-name"> {statePopupImage.image.user.name}</b>
                                <br/>
                                <b> <a href={statePopupImage.image.user.links.html} target="_blank" rel="noopener noreferrer" className="popup_user-card__user-login">@{statePopupImage.image.user.username}</a></b>
                            </div>
                        </div>
                        <a href={statePopupImage.image.links.download} target="_blank" rel="noopener noreferrer">
                            <img src={downloadSVG} alt="" className="download" />
                        </a>
                        <button className="like-button popup-like" onClick={ev=>likeImage(index, unsplash, statePopupImage.image.id)}>
                            <img src={liked_by} alt="" className="like-small" />
                            <span className="likes">{statePopupImage.image.likes}</span>
                        </button>
                    </div>
                    <img src={statePopupImage.image.urls.regular} alt="" className="image i-max" onClick={ev=>{
                        if(ev.target.classList[1] == 'i-max') {
                            ev.target.classList.remove('i-max');
                            ev.target.classList.add('i-min');
                        } else if (ev.target.classList[1] == 'i-min') {
                            ev.target.classList.remove('i-min');
                            ev.target.classList.add('i-max');
                        }
                    }} />
                    {state.settings.date?<div className="popup_date-owner">{statePopupImage.image.updated_at}</div>:null}
                </div>
            </div>
        </div>;
    } else {
        if(statePopupImage.id == -1) {
            popupImage(-2, {/* state */}, {});
            unsplash.photos.getPhoto(ev.location.pathname.split('/')[2])
            .then(res => res.json())
            .then(json => {
                popupImage(9999, {/* state */}, json);
            });
        }

        return <div>Загрузка...</div>;
    }
}

export default Popup;