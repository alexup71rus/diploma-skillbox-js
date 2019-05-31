import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
// import Header from '../../components/header/index';
import Popup from '../../components/popup/index';
import './index.scss';
// import logo from '../../img/svg/logo2.svg';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';

let i = 0;
let loading = false;
window.limit = false;
const onscroll = (addImages, unsplash, state) => {
    i++;
    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (window.innerHeight + scrolled >= document.body.clientHeight - 300) {
            if(!loading) {
                loading = true;
                unsplash.photos.listPhotos(i, 10, "latest") // отключить при отладке
                .then(res => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        window.limit = true;
                    }
                })
                .then(json => {
                    if (json && !window.limit) {
                        loading = false;
                        i++;
                        addImages( json );
                    } else if (!json && !window.limit) {
                        window.limit = true;
                        alert('Исчерпан лимит запросов!');
                        console.error('Исчерпан лимит запросов!');
                    }
                });

                // addImages( [...JSON.parse(window.localStorage.getItem('images'))] ); // включить при отладке
            }
        }
    }
}

const Home = (ev, app, unsplash, setMyInfo, addImages, likeImage, popupImage, state) => {
    onscroll(addImages, unsplash, state); // отключить при отладке
    if (state.images.length === 0) {
        try {
            // addImages( JSON.parse(window.localStorage.getItem('images')) ); // включить при отладке

            unsplash.photos.listPhotos(i, 15, "latest") // отключить при отладке
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    window.limit = true;
                }
            })
            .then(json => {
                if (state.images.length === 0 && json) {
                    addImages( json );
                } else if (!json && !window.limit) {
                    alert('Исчерпан лимит запросов!');
                    console.error('Исчерпан лимит запросов!');
                }
            });
        } catch (ex) { console.error("Ошибка при работе с unsplash:" + ex) }
    }

    if(document.querySelector('.photos-grid-view')) {
        document.querySelector('.photos-grid-view').classList.remove('blur');
        document.querySelector('.navbar').classList.remove('blur');
    }
    document.body.style.overflow = 'overlay';
    if(window.limit) {
        return <div>Лимит запросов исчерпан. Приходите позже.</div>;
    } else {
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
            <button className="btn load-more" onClick={ev=>{
                unsplash.photos.listPhotos(i, 10, "latest")
                    .then(res => res.json())
                    .then(json => {
                        i++;
                        addImages( json );
                    });
            }}>Загрузить ещё</button>
            </div>;
    }
}

export default Home;

