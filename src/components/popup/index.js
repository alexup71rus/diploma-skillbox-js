import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { unsplash } from '../../apis/unsplash';
import closeSVG from '../../img/svg/close.svg';
import downloadSVG from '../../img/svg/126488.svg';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';
import './index.scss';

class Popup extends React.Component {
    render() {
        const { route, state, popupImageAction, likePhoto, likeImageAction, changePhoto } = this.props;
        if (document.querySelector('.photos-grid-view') && state.settings.blur) {
            document.querySelector('.photos-grid-view').classList.add('blur');
            document.querySelector('.navbar').classList.add('blur');
        }
        document.body.style.overflow = 'hidden';
        if (state.popup_image.id > -1) {
            return <div className="popup">
                <Link to="/">
                    <div className="bg-popup"></div>
                </Link>
                <div className="popup-component">
                    <Link to="/">
                        <div className="close-popup-bg"></div>
                        <img src={closeSVG} alt="close button" className="close-btn"  />
                    </Link>
                    <div className="popupContainer" tabIndex={99} onKeyDown={(e) => changePhoto(e)}>
                        <div className="popup_header">
                            <div className="popup_user-card">
                                <img src={state.popup_image.image.user.profile_image.small} alt="popup image" className="popup_profile-image" />
                                <div className="popup_profile-links">
                                    <b className="popup_user-card__user-name"> {state.popup_image.image.user.name}</b>
                                    <br/>
                                    <b> <a href={state.popup_image.image.user.links.html} target="_blank" rel="noopener noreferrer" className="popup_user-card__user-login">@{state.popup_image.image.user.username}</a></b>
                                </div>
                            </div>
                            <a href={state.popup_image.image.links.download} target="_blank" rel="noopener noreferrer">
                                <img src={downloadSVG} alt="" className="download" />
                            </a>
                            <button className="like-button popup-like" onClick={ev=>{
                                likePhoto(unsplash, state.popup_image.image);
                                likeImageAction(unsplash, state.popup_image.id, state.popup_image.image)}
                            }>
                                <img src={state.popup_image.image.liked_by_user?liked:like} alt="like" className="like-small" />
                                <span className="likes">{state.popup_image.image.likes}</span>
                            </button>
                        </div>
                        <img src={state.popup_image.image.urls.regular} alt="" className="image i-max" onClick={ev=>{
                            if(ev.target.classList[1] == 'i-max') {
                                ev.target.classList.remove('i-max');
                                ev.target.classList.add('i-min');
                            } else if (ev.target.classList[1] == 'i-min') {
                                ev.target.classList.remove('i-min');
                                ev.target.classList.add('i-max');
                            }
                        }} />
                        {state.settings.date?<div className="popup_date-owner">{state.popup_image.image.updated_at}</div>:null}
                    </div>
                </div>
            </div>;
        } else {
            if (state.popup_image.id == -1) {
                popupImageAction(-2, {/* state */}, {});
                unsplash.photos.getPhoto(route.location.pathname.split('/')[2])
                .then(res => res.json())
                .then(json => {
                    popupImageAction(state.images.length, {/* state */}, json);
                });
            }
            return <div className="popup" onKeyDown={changePhoto}>
                <div className="loading bg-popup">
                    <Link to="/" className="btn btn-outline-primary btn-cancel">Отменить</Link>
                </div>
            </div>;
        }
    }
}

export default Popup;