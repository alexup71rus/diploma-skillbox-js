import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Unsplash from 'unsplash-js';

const Home = (props) => {
  return <div>
    Home
  </div>;
}

const Auth = (props, accessKey, secretkey) => {
  const unsplash = new Unsplash({
    applicationId: accessKey,
    secret: secretkey,
    callbackUrl: "https://diploma-skillbox-js.stackblitz.io/a.done"
  });

  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
  ]);

  location.assign(authenticationUrl);

  return <div>
    Auth
  </div>;
}

const AuthDone = (props, accessKey, secretkey) => {
  const unsplash = new Unsplash({
    applicationId: accessKey,
    secret: secretkey,
    callbackUrl: "https://diploma-skillbox-js.stackblitz.io/a.done"
  });

  const code = location.search.split('code=')[1];

  if (code) {
    unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json => {
        unsplash.auth.setBearerToken(json.access_token);
        unsplash.photos.likePhoto("kBJEJqWNtNY");
      });
  }

  return <div>
    Авторизация пройдена. Лайк <a href="https://unsplash.com/photos/kBJEJqWNtNY" target="_blank">на картинку</a> поставлен!
  </div>;
}
export default ({ accessKey, secretkey }) => {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div>
            <Route exact path="/" foo="bar" render={Home} />
            <Route exact path="/auth" render={ (props)=>Auth(props, accessKey, secretkey) } />
            <Route exact path="/a.done" render={ (props)=>AuthDone(props, accessKey, secretkey) } />
          </div>
        </div>
      </Router>
  );
};
