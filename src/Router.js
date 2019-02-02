import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import Unsplash from 'unsplash-js';
import Header from './components/header/index';
import Home from './pages/home/index';
import About from './pages/about/index';
import UnregisterPage from './pages/unregister/index';

import { setMyInfo, addImages, likeImage, test } from './actions/index';

window.onres = () => {
  document.querySelector('.photos-grid-view ').addEventListener('DOMAttrModified', function(e){
    console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
    if (e.attrName === 'style') {
      console.log('prevValue: ' + e.prevValue, 'newValue: ' + e.newValue);
    }
  }, false);
  // document.querySelector('.navbar ').style.width = document.querySelector('.photos-grid-view ').style.width;
  // window.onresize = function() {
  //     document.querySelector('.navbar ').style.width = document.querySelector('.photos-grid-view ').style.width;
  // }
}

let app = {
  accessKey: '...',
  secretkey: '...',
  keycode: '',
  token: '',
};
let _getUserInfo = true;

let App = ({ state, setMyInfo, addImages, likeImage, test }) => {
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
        <UnregisterPage />
      </div>;
    } else if (_getUserInfo) {
      _getUserInfo = false;
      setMyInfo(JSON.parse(window.localStorage.getItem('user')));
    }
  } catch (ex) { console.error(ex); }
  
  return <Router>
      <div className="App">
        {/* <Header unsplash={ unsplash } setMyInfo={ setMyInfo } state={ state.user_info } /> */}
        <Route exact path="/" render={ (ev)=>Home(app, unsplash, setMyInfo, addImages, likeImage, state) } />
        <Route exact path="/about" render={ About } />
      </div>
    </Router>;
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
    likeImage: (id) => {
      dispatch(likeImage(id));
    },
    test: () => {
      dispatch(test());
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
