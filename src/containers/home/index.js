import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import Popup from '../../components/popup/index';
import './index.scss';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';
import { getPhotos, unsplash } from '../../apis/unsplash';

let indexImages = 1;
let loadingImages = false;
const debounce = async (addImages, unsplash, state) => {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrolled >= document.body.clientHeight - 300) {
        if(!loadingImages) {
            loadingImages = true;
            const res = await getPhotos(unsplash, indexImages, 15);
            if (res && Object.keys(res).length) {
                indexImages++;
                addImages(res);
                loadingImages = false;
            } else {
                alert('Исчерпан лимит запросов!');
                console.error('Исчерпан лимит запросов!');
            }
        }
    }
}

const Home = (setMyInfo, addImages, likeImage, popupImage, state) => {
    if (!Object.keys(state.user_info).length) {
        setMyInfo(JSON.parse(window.localStorage['user']));
    }
    if (state.images.length === 0) {
        debounce(addImages, unsplash, state);
    }
    window.onscroll = function() {
        debounce(addImages, unsplash, state);
    }

    if(document.querySelector('.photos-grid-view')) {
        document.querySelector('.photos-grid-view').classList.remove('blur');
        document.querySelector('.navbar').classList.remove('blur');
    }
    document.body.style.overflow = 'overlay';
    return <div className="home-container">
        <Route path="/:image" component={ (ev)=>Popup(ev, state, state.popup_image, popupImage, state.popup_image.id, unsplash, likeImage) } />
        <Masonry
            className={ 'photos-grid-view' }
            elementType={'div'}
            options={{ transitionDuration: 0, originTop: true, fitWidth: true }}
            disableImagesLoaded={false}
        >
            {
                state.images.map((image, i=0)=>{
                    i++;

                    let rColor, color, dateJSX = null;
                    if(state.settings.date) {
                        rColor = image.color.slice(1);
                        color = (parseInt(rColor, 16) ^ 0xFFFFFF | 0x1000000).toString(16).substring(1);
                        dateJSX = <span className="owner-date" style={{ color: image.color + "e7", backgroundColor: "#" + color + "60" }}>{image.updated_at}</span>;
                    }
                    let liked_by = image.liked_by_user?liked:like;
                    return <figure key={i} className="figure" style={{minHeight: 195}}>
                        <Link to={"/image/" + image.id}>
                            <img src={image.urls.small} className="figure-img img-fluid rounded" alt="" style={{minHeight: '195px', minWidth: '100%', backgroundColor: image.color}} onClick={ev=>popupImage(i, {/* state */}, image)}/>
                        </Link>
                        {dateJSX}
                        <figcaption className="figure-caption text-right">
                            <a href={image.user.links.html} target="_blank" rel="noopener noreferrer" className="owner"><b>{image.user.name}</b></a>
                            <button className="like-button" onClick={ev=>likeImage(i, unsplash, image.id)}>
                                <img src={liked_by} alt="" className="like-small"/>
                                <span className="likes">{image.likes}</span>
                            </button>
                        </figcaption>
                    </figure>;
                })
            }
        </Masonry>
        </div>;
}

export default Home;

