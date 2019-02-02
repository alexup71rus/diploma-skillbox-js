import React from 'react';
import Masonry from 'react-masonry-component';
import Header from '../../components/header/index';
import './index.scss';
import logo from '../../img/svg/logo2.svg';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';

let i = 1;
let loading = false;
const onscroll = (addImages, unsplash, state) => {
    if (state.images.length <= 0) {
        if(window.localStorage.getItem('images')) {
            addImages( [...JSON.parse(window.localStorage.getItem('images'))] );
            i++;
        } else {
            unsplash.photos.listPhotos(0, 10, "latest")
            .then(res => res.json())
            .then(json => {
                if(!window.localStorage.getItem('images')) {
                    addImages( json );
                    window.localStorage.setItem('images', JSON.stringify(json));
                }
            });
        }
    }

    i++;
    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (window.innerHeight + scrolled >= document.body.clientHeight - 5) {
            if(!loading) {
                loading = true;
                unsplash.photos.listPhotos(i, 10, "latest")
                .then(res => res.json())
                .then(json => {
                    loading = false;
                    i++;
                    addImages( json );
                });

                // addImages( [...JSON.parse(window.localStorage.getItem('images'))] );
            }
        }
    }
}

const Home = (app, unsplash, setMyInfo, addImages, likeImage, state) => {
    onscroll(addImages, unsplash, state);

    return <div className="home-container">
    <Masonry
            className={'photos-grid-view'}
            elementType={'div'}
            options={{ transitionDuration: 1, isFitWidth: true }}
            disableImagesLoaded={false}
        >
        <figure></figure>
        {/* <span></span> */}
        <Header unsplash={ unsplash } setMyInfo={ setMyInfo } state={ state.user_info } id="ellel" />
        {
            state.images.map((image, i=0)=>{
                i++;
                let liked_by = image.liked_by_user?liked:like;
                return <figure key={i} className="figure">
                    <img src={image.urls.small} className="figure-img img-fluid rounded" alt="" style={{backgroundColor: image.color}}/>
                    {/* <span className="owner-date">{image.updated_at}</span> */}
                    <figcaption className="figure-caption text-right">
                        <b className="owner">{image.user.name}</b>
                        <button className="like-button" onClick={ev=>{
                            likeImage(i);
                        }}>
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

export default Home;