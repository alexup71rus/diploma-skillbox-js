import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Masonry from 'react-masonry-component';
import Popup from '../../components/popup/index';
import './index.scss';
import like from '../../img/svg/61731.svg';
import liked from '../../img/svg/291212.svg';
import { getPhotos, likePhoto, unsplash } from '../../apis/unsplash';
import { addImagesAction, likeImageAction, popupImageAction, setMyInfoAction } from '../../actions/index';
import { invertColor } from '../../helpers';

let indexImages = 1;
let loadingImages = false;
const debounce = async (addImagesAction, unsplash, state) => {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrolled >= document.body.clientHeight - 300) {
        if(!loadingImages) {
            loadingImages = true;
            const res = await getPhotos(unsplash, indexImages, 20);
            if (res && Object.keys(res).length) {
                indexImages++;
                addImagesAction(res);
                loadingImages = false;
            }
        }
    }
}

class Home extends React.Component {
    constructor (props) {
        super(props);
    }

    changePhoto(e) {
        if (this.props.state.popup_image.id >= 0) {
            if (e.key == "ArrowRight") {
                if (this.props.state.images.length - 1 > this.props.state.popup_image.id) {
                    const newID = this.props.state.popup_image.id + 1;
                    const newImage = this.props.state.images[newID];
                    if (newImage) {
                        this.props.route.history.push('/image/' + this.props.state.images[newID].id);
                        this.props.state.popup_image.id = newID;
                        this.props.state.popup_image.image = newImage;
                    }
                }
            } else if (e.key == "ArrowLeft") {
                if (this.props.state.popup_image.id > 0) {
                    const newID = this.props.state.popup_image.id - 1;
                    const newImage = this.props.state.images[newID];
                    if (newImage) {
                        this.props.route.history.push('/image/' + this.props.state.images[newID].id);
                        this.props.state.popup_image.id = newID;
                        this.props.state.popup_image.image = newImage;
                    }
                }
            }
        }
    }

    render() {
        const { state, route, addImagesAction, popupImageAction, likeImageAction, changePhoto } = this.props;
        if (!Object.keys(state.user_info).length) {
            setMyInfoAction(JSON.parse(window.localStorage['user']));
        }
        if (state.images.length === 0) {
            debounce(addImagesAction, unsplash, state);
        }
        window.onscroll = function() {
            debounce(addImagesAction, unsplash, state);
        }
    
        if(document.querySelector('.photos-grid-view')) {
            document.querySelector('.photos-grid-view').classList.remove('blur');
            document.querySelector('.navbar').classList.remove('blur');
        }
        document.body.style.overflow = 'auto';
        return <div className="home-container" onKeyDown={(e) => this.changePhoto(e)}>
            <Route path="/:image" render={(ev) => <Popup route={ev} state={state} popupImageAction={popupImageAction} likePhoto={likePhoto} likeImageAction={likeImageAction} changePhoto={(e) => this.changePhoto(e)} /> } />
            <Masonry
                className={ 'photos-grid-view' }
                elementType={'div'}
                options={{ transitionDuration: 0, originTop: true, fitWidth: true }}
                disableImagesLoaded={false}
            >
                {
                    state.images.map((image, i)=>{
                        let liked_by = image.liked_by_user?liked:like;
                        return <figure key={i} className="figure" style={{minHeight: 195}}>
                            <Link to={"/image/" + image.id}>
                                <img src={image.urls.small} className="figure-img img-fluid rounded" alt="image" style={{minHeight: '195px', minWidth: '100%', backgroundColor: image.color}} onClick={ev=>popupImageAction(i, {/* state */}, image)}/>
                            </Link>
                            {
                                state.settings.date ? <span className="owner-date">{image.updated_at}</span> : null
                            }
                            <figcaption className="figure-caption text-right">
                                <a href={image.user.links.html} target="_blank" rel="noopener noreferrer" className="owner"><b>{image.user.name}</b></a>
                                <button className="like-button" onClick={ev=>{
                                    likePhoto(unsplash, image);
                                    likeImageAction(unsplash, i, image);
                                }}>
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
}

const mapStateToProps = (state) => {
    return {
      state: state,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        addImagesAction: (images) => {
            dispatch(addImagesAction(images));
        },
        popupImageAction: (id, state, image) => {
            dispatch(popupImageAction(id, state, image));
        },
        likeImageAction: (unsplash, id, image) => {
            dispatch(likeImageAction(unsplash, id, image));
        }
    }
}
  
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;

