import React, { Component } from 'react';
import './index.scss';
import logo from '../../img/svg/logo2.svg';

const Header = (props) => {
  const { unsplash, setMyInfo, userstate, authenticationUrl } = props;
  if(userstate){
    return <header className="App-header">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={ev=>ev.preventDefault()}>
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> <span className="logo-text">UNSPLASH</span> <span style={{color: "#999", fontSize: "13px"}}>viewer</span>
        </a>
        {/* <a className="nav-link scroll-top-link" href="#">Home</a> */}
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="username">{userstate.first_name}</span>
          </a>
          <div className="dropdown-menu" style={{right: 0, left: 'auto'}} aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#">Профиль</a>
            <a className="dropdown-item" href="#">Настройки</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" onClick={ev=>{
                  ev.preventDefault();
                  window.localStorage.setItem('user', '');
                  window.location.reload();
                }}>Выйти</a>
          </div>
        </li>
      </nav>
    </header>;
  } else {
    return <header className="App-header">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={ev=>ev.preventDefault()}>
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> <span className="logo-text">UNSPLASH</span> <span style={{color: "#999", fontSize: "13px"}}>viewer</span>
        </a>
        <button className="btn btn-outline-primary" onClick={ev=>{window.location.assign(authenticationUrl);}}>Авторизация</button>
      </nav>
    </header>;
  }
};

export default Header;