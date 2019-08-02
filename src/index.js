"use strict";
import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './router';
import './style.scss';

const settings = window.localStorage['settings'] ? JSON.parse(window.localStorage['settings']) : window.localStorage['settings'] = JSON.stringify({
    date: false,
    blur: true
});

const store = createStore(reducers, { user_info: {}, images: [], settings: {...settings}, popup_image: { id: -1, state: {}, image: {} } });

render(<Provider store={store}><Router><Route exact path="*" render={ (ev)=><App routeLocation={ev} />} /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

let deferredPrompt = null;

