import React from 'react';
import './index.scss';

const Home = (app, unsplash, setMyInfo, userstate) => {
    let images = [...JSON.parse(window.localStorage.getItem('images'))];
    // unsplash.photos.listPhotos(2, 15, "latest")
    //     .then(res => res.json())
    //     .then(json => {
    //         window.localStorage.setItem('images', JSON.stringify(json));
    //     });

    console.log(images);
    // console.log(unsplash);
    // let asd = unsplash.
    return <div>
        {
            images.map(image=>{
                return <figure key={image.id} className="figure">
                    <img src={image.urls.small} className="figure-img img-fluid rounded" alt="" style={{backgroundColor: image.color}}/>
                    <figcaption className="figure-caption text-right">
                        <span className="likes">{image.likes}</span>
                    </figcaption>
                </figure>
            })
        }
    </div>;
}

export default Home;