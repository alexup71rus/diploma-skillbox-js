import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Unsplash from 'unsplash-js';
import Header from './components/header/index';
import Home from './pages/home/index';
import Settings from './pages/settings/index';
import UnregisterPage from './pages/unregister/index';

import { setMyInfo, addImages, likeImage, popupImage, toggleBlur, toggleDate } from './actions/index';

let app = {
  accessKey: '...',
  secretkey: '...',
  keycode: '',
  token: '',
};
let _getUserInfo = true;

let App = ({ state, setMyInfo, addImages, likeImage, popupImage, toggleBlur, toggleDate }) => {
  let unsplash = new Unsplash({
    applicationId: app.accessKey,
    secret: app.secretkey,
    callbackUrl: "http://khodyr.ru/php/unsplash.php"
  });
  try{
    let code;
    if (code = window.location.search.split('code=')[1]) {
      window.history.pushState({}, "", "/");
      unsplash.auth.userAuthentication(code)
        .then(res => res.json())
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);
          app.keycode = code;
          app.token = json.access_token;
          unsplash.currentUser.profile()
            .then(res => res.json())
            .then(json => {
              json.keycode = app.keycode;
              json.token = app.token;
              setMyInfo(json);
              window.localStorage.setItem('user', JSON.stringify(json));
              window.location.reload();
          });
        });
    } else if (!window.localStorage.getItem('user') && !app.token) { 
      const authenticationUrl = unsplash.auth.getAuthenticationUrl(["public","write_likes"]);
      
      return <div>
        <Header authenticationUrl={authenticationUrl} />
        <UnregisterPage authenticationUrl={authenticationUrl} />
      </div>;
    } else if (_getUserInfo) {
      _getUserInfo = false;
      setMyInfo(JSON.parse(window.localStorage.getItem('user')));
    }
  } catch (ex) { console.error(ex); }

  if (window.localStorage.getItem('user')) {
    let userInfo = JSON.parse( window.localStorage.getItem('user') );
    app.keycode = userInfo.keycode;
    app.token = userInfo.token;
    unsplash.auth.setBearerToken( app.token );
    return <Router>
        <div className="App">
          <Header unsplash={ unsplash } setMyInfo={ setMyInfo } user_info={ state.user_info }  state={ state } toggleBlur={ toggleBlur } toggleDate={ toggleDate } />
          <Route exact path="/*" render={ (ev)=>Home(ev, app, unsplash, setMyInfo, addImages, likeImage, popupImage, state) } />
          <Route exact path="/settings" render={ Settings } />
          {/* <Route exact path="/:image" component={ (ev)=>Home(ev, unsplash, setMyInfo, addImages, likeImage, popupImage, state) } /> */}
        </div>
      </Router>;
  } else {
    return <b>Пожалуйста, подождите.</b>;
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMyInfo: (info) => {
      dispatch(setMyInfo(info));
    },
    addImages: (images) => {
      dispatch(addImages(images));
    },
    likeImage: (id, unsplash, image) => {
      dispatch(likeImage(id, unsplash, image));
    },
    popupImage: (id, state, image) => {
      dispatch(popupImage(id, state, image));
    },
    toggleBlur: (status) => {
      dispatch(toggleBlur(status));
    },
    toggleDate: (status) => {
      dispatch(toggleDate(status));
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
