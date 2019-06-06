import React, { Component } from 'react';
import './index.scss';
import logo from '../../img/svg/logo2.svg';
import { deleteCookie } from '../../helpers';

const Header = ({ state, changeSettingsAction }) => {
  if(state.user_info){
    let linkSelf = state.user_info.links?state.user_info.links.html:'#';
    return <header className="app-header">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> <span className="logo-text">UNSPLASH</span> <span style={{color: "#999", fontSize: "13px"}}>viewer</span>
        </a>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="username">{state.user_info.first_name}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right" style={{right: '0px', width: '225px', left: 'auto'}} aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href={linkSelf} target="_blank" rel="noopener noreferrer">Профиль</a>
            <div className="dropdown-divider"></div>
            <h6 className="dropdown-header">Настройки</h6>
            <div style={{marginLeft: '10px'}}>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="dateSet" defaultChecked={state.settings.date} onChange={ev=>{
                  const result = !state.settings.date;
                  changeSettingsAction({date: result});
                  const newSettings = JSON.parse(window.localStorage["settings"]);
                  newSettings["date"] = result;
                  window.localStorage["settings"] = JSON.stringify(newSettings);
                }} />
                <label className="custom-control-label" htmlFor="dateSet">Показывать дату</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="blurSet" defaultChecked={state.settings.blur} onChange={ev=>{
                  const result = !state.settings.blur;
                  changeSettingsAction({blur: !state.settings.blur});
                  const newSettings = JSON.parse(window.localStorage["settings"]);
                  newSettings["blur"] = result;
                  window.localStorage["settings"] = JSON.stringify(newSettings);
                }} />
                <label className="custom-control-label" htmlFor="blurSet">Размытие фона popup</label>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/" onClick={ev=>{
                  deleteCookie('token');
                  window.localStorage.setItem('user', '');
                  window.location.assign('/');
                }}>Выйти</a>
          </div>
        </li>
      </nav>
    </header>;
  } else {
    return <header className="app-header">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={ev=>ev.preventDefault()}>
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /> <span className="logo-text">UNSPLASH</span> <span style={{color: "#999", fontSize: "13px"}}>viewer</span>
        </a>
      </nav>
    </header>;
  }
};

export default Header;