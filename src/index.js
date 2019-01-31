import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { usrReducer } from './reducers/index';
import Router from './Router';
import './style.scss';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

const ustore = createStore(usrReducer, {});

render(<Provider store={ustore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();