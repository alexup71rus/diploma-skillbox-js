import React from 'react';
import './index.scss';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';

const Home = (app, unsplash, setMyInfo, addImages, likeImage, state) => {
    if (state.images.length <= 0) {
        if(window.localStorage.getItem('images')) {
            addImages( [...JSON.parse(window.localStorage.getItem('images'))] );
        } else {
            unsplash.photos.listPhotos(2, 15, "latest")
            .then(res => res.json())
            .then(json => {
                window.localStorage.setItem('images', JSON.stringify(json));
                addImages( json );
            });
        }
    }

    console.log(state.images);
    
    return <div className="photos-grid-view">
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
    </div>;
}

export default Home;