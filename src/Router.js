import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getToken, unsplash } from './apis/unsplash';
import Header from './components/header/index';
import Home from './containers/home/index';
import UnregisterPage from './containers/authpage/index';
import { getCookie, setCookie } from './helpers';

import { changeSettingsAction, setMyInfoAction } from './actions/index';

class App extends React.Component {
  render() {
    const { state, changeSettingsAction, setMyInfoAction, routeLocation } = this.props;
    window.token = getCookie("token");
    const getAsync = async () => {
      if (window.location.search.split('code=')[1]) {
        await getToken(unsplash, window.location.search.split('code=')[1]);
        window.token = getCookie("token");
      } else if (window.token) {
        getToken(unsplash);
      }
      if (!window.localStorage['user'] && window.token) {
        let data = await getUser(unsplash);
        if (data) {
          window.localStorage['user'] = JSON.stringify(data);
        }
      }
      if (window.localStorage['user'] && !Object.keys(state.user_info).length) {
        setMyInfoAction(JSON.parse(window.localStorage['user']));
      }
      if (window.location.search.split('code=')[1]) {
        routeLocation.history.push('/');
      }
    }
    getAsync();
    console.log(state);
    if (!getCookie("token") || !window.localStorage['keycode']) {
      return <div>
        <Header />
        <UnregisterPage />
      </div>;
    } else if (window.localStorage['user']) {
      return <div className="App">
            <Header state={ state } changeSettingsAction={ changeSettingsAction } />
            <Route exact path="/*" render={ (ev)=><Home state={state} route={ev} /> } />
          </div>;
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
    setMyInfoAction: (info) => {
      dispatch(setMyInfoAction(info));
    },
    changeSettingsAction: (status) => {
      dispatch(changeSettingsAction(status));
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
