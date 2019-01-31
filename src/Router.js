import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Unsplash from 'unsplash-js';
import Header from './components/header/index';
import Home from './pages/home/index';
import About from './pages/about/index';
import UnregisterPage from './pages/unregister/index';

import { setMyInfo } from './actions/index';

let app = {
  accessKey: '...',
  secretkey: '...',
  keycode: '',
  token: '',
};

let Rout = ({ userstate, setMyInfo }) => {
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
              // window.location.reload();
          });
        });
    } else if (!window.localStorage.getItem('user') && !app.token) { 
      const authenticationUrl = unsplash.auth.getAuthenticationUrl(["public","write_likes"]);
    
      return <div>
        <Header authenticationUrl={authenticationUrl} />
        <UnregisterPage />
      </div>;
    } else if (!userstate.first_name) {
      setMyInfo(JSON.parse(window.localStorage.getItem('user')));
    }
  } catch (ex) { console.error(ex); }

  return <Router>
      <div className="App">
        <Header unsplash={ unsplash } setMyInfo={ setMyInfo } userstate={ userstate } />
        <Route exact path="/" render={ (ev)=>Home(app, unsplash, setMyInfo, userstate) } />
        <Route exact path="/about" render={ About } />
      </div>
    </Router>;
}

const mapStateToProps = (state) => {
  return {
    userstate: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMyInfo: (info) => {
      dispatch(setMyInfo(info));
    }
  }
}

Rout = connect(
  mapStateToProps,
  mapDispatchToProps

)(Rout);

export default Rout;
