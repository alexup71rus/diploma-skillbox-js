import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { getUser, getToken, unsplash } from './apis/unsplash';
import Header from './components/header/index';
import Home from './containers/home/index';
import UnregisterPage from './containers/authpage/index';
import { getCookie, setCookie } from './helpers';

import { setMyInfo, addImages, likeImage, popupImage, changeSettings } from './actions/index';

class App extends React.Component {  
  render() {
    const { state, setMyInfo, addImages, likeImage, popupImage, changeSettings } = this.props;
    window.token = getCookie("token");
    const getAsync = async () => {
      if (!window.token && (window.location.search.split('code=')[1] || window.localStorage['keycode'])) {
        await getToken(unsplash);
      }
      if (window.location.search.split('code=')[1]) {
        let data = await getUser(unsplash);
        if (data != "Rate Limit Exceeded" && !JSON.parse(data).errors) {
          console.log(data);
          window.localStorage['user'] = data;
        }
      }
    }
    getAsync();
    setMyInfo(JSON.parse(window.localStorage['user']));
    console.log(JSON.parse(window.localStorage['user']));
    if (!getCookie("token") || !window.localStorage['keycode']) {      
      return <div>
        <Header />
        <UnregisterPage />
      </div>;
    } else if (window.localStorage['user']) {
      unsplash.auth.setBearerToken( window.localStorage['token'] );
      return <Router>
          <div className="App">
            <Header unsplash={ unsplash } setMyInfo={ setMyInfo } user_info={ state.user_info }  state={ state } changeSettings={ changeSettings } />
            <Route exact path="/*" render={ (ev)=>Home(ev, unsplash, setMyInfo, addImages, likeImage, popupImage, state) } />
          </div>
        </Router>;
    } else {
      return <b>Лимит запросов исчерпан или что-то пошло не так!</b>;
    }
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
    changeSettings: (status) => {
      dispatch(changeSettings(status));
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
