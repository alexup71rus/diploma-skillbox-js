(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{117:function(e,t,a){},234:function(e,t,a){},236:function(e,t,a){},239:function(e,t,a){},241:function(e,t,a){},243:function(e,t,a){"use strict";a.r(t);var n=a(6),r=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function o(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var i=a(0),c=a.n(i),s=a(83),l=a(30),u=a(16),m=a(54),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=Object(n.a)({},e);switch(t.type){case"SET_MY_INFO":return a.user_info=t.info,Object(n.a)({},a);case"ADD_IMAGES":return a.images=[].concat(Object(m.a)(e.images),Object(m.a)(t.images)),Object(n.a)({},a);case"TOGGLE_LIKE":return a.images=e.images.map(function(e,a){return a===t.id?(1==e.liked_by_user?(e.liked_by_user=!1,e.likes--):0==e.liked_by_user&&(e.liked_by_user=!0,e.likes++),e):e}),Object(n.a)({},a);case"POPUP_IMAGE":return a.popup_image={id:t.id,state:t.state,image:t.image},Object(n.a)({},a);case"CHANGE_SETTINGS":return Object.keys(t.arr).map(function(e,n){void 0!==a.settings[e]&&(a.settings[e]=t.arr[e])}),Object(n.a)({},a);default:return e}},d=a(245),g=a(246),f=a(19),h=a.n(f),b=a(31),w=a(13),v=a(14),E=a(17),k=a(15),N=a(18),_=a(85);function y(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):void 0}function S(e,t,a){var n=(a=a||{}).expires;if("number"==typeof n&&n){var r=new Date;r.setTime(r.getTime()+1e3*n),n=a.expires=r}n&&n.toUTCString&&(a.expires=n.toUTCString());var o=e+"="+(t=encodeURIComponent(t));for(var i in a){o+="; "+i;var c=a[i];!0!==c&&(o+="="+c)}document.cookie=o}var O="2e0b887662588b73126393d4d2621056982214f0414d16a8434a7e2386466cc7",x="569797e0eaec6cd9a46412ef0043b548c87e1ae6ad7ca45e8147aa5fe0cacda3",j="http://cdn.khodyr.ru/any/unsplash.php",A=new(a.n(_).a)({applicationId:O,secret:x,callbackUrl:j}),L=function(e,t){return y("token")?e.auth.setBearerToken(y("token")):t?e.auth.userAuthentication(t).then(function(e){return e.text()}).then(function(a){if(a&&"Rate Limit Exceeded"!=a){window.localStorage.keycode=t;var n=new Date;n.setDate(n.getDate()+1),S("token",JSON.parse(a).access_token,{expires:n.toUTCString()}),e.auth.setBearerToken(JSON.parse(a).access_token)}else console.error("\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d!")}):void 0},I=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15;return e.photos.listPhotos(t,a,"latest").then(function(e){return e.text()}).then(function(e){if("Rate Limit Exceeded"!=e&&!JSON.parse(e).errors)return JSON.parse(e);console.error("\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d!")})},C=function(e,t){return!0===t.liked_by_user?e.photos.unlikePhoto(t.id).then(function(e){return e.text()}).then(function(e){if("Rate Limit Exceeded"!=e&&!JSON.parse(e).errors)return JSON.parse(e);console.error("\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d!")}):!1===t.liked_by_user?e.photos.likePhoto(t.id).then(function(e){return e.text()}).then(function(e){if("Rate Limit Exceeded"!=e&&!JSON.parse(e).errors)return JSON.parse(e);console.error("\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d!")}):void 0},J=(a(117),a(53)),T=a.n(J),P=function(e){var t=e.state,a=e.changeSettingsAction;if(t&&t.user_info){var n=t.user_info.links?t.user_info.links.html:"#";return c.a.createElement("header",{className:"app-header"},c.a.createElement("nav",{className:"navbar navbar-light bg-light"},c.a.createElement("a",{className:"navbar-brand",href:"#"},c.a.createElement("img",{src:""+T.a,width:"30",height:"30",className:"d-inline-block align-top",alt:""})," ",c.a.createElement("span",{className:"logo-text"},"UNSPLASH")," ",c.a.createElement("span",{style:{color:"#999",fontSize:"13px"}},"viewer")),c.a.createElement("li",{className:"nav-item dropdown"},c.a.createElement("a",{className:"nav-link dropdown-toggle",href:"#",id:"navbarDropdownMenuLink",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},c.a.createElement("span",{className:"username"},t.user_info.first_name)),c.a.createElement("div",{className:"dropdown-menu dropdown-menu-right",style:{right:"0px",width:"225px",left:"auto"},"aria-labelledby":"navbarDropdownMenuLink"},c.a.createElement("a",{className:"dropdown-item",href:n,target:"_blank",rel:"noopener noreferrer"},"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"),c.a.createElement("div",{className:"dropdown-divider"}),c.a.createElement("h6",{className:"dropdown-header"},"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"),c.a.createElement("div",{style:{marginLeft:"10px"}},c.a.createElement("div",{className:"custom-control custom-checkbox"},c.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"dateSet",defaultChecked:t.settings.date,onChange:function(e){var n=!t.settings.date;a({date:n});var r=JSON.parse(window.localStorage.settings);r.date=n,window.localStorage.settings=JSON.stringify(r)}}),c.a.createElement("label",{className:"custom-control-label",htmlFor:"dateSet"},"\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0434\u0430\u0442\u0443")),c.a.createElement("div",{className:"custom-control custom-checkbox"},c.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"blurSet",defaultChecked:t.settings.blur,onChange:function(e){var n=!t.settings.blur;a({blur:!t.settings.blur});var r=JSON.parse(window.localStorage.settings);r.blur=n,window.localStorage.settings=JSON.stringify(r)}}),c.a.createElement("label",{className:"custom-control-label",htmlFor:"blurSet"},"\u0420\u0430\u0437\u043c\u044b\u0442\u0438\u0435 \u0444\u043e\u043d\u0430 popup"))),c.a.createElement("div",{className:"dropdown-divider"}),c.a.createElement("a",{className:"dropdown-item",href:"/",onClick:function(e){S("token","",{expires:-1}),window.localStorage.setItem("user",""),window.location.assign("/")}},"\u0412\u044b\u0439\u0442\u0438")))))}return c.a.createElement("header",{className:"app-header"},c.a.createElement("nav",{className:"navbar navbar-light bg-light"},c.a.createElement("a",{className:"navbar-brand",href:"#",onClick:function(e){return e.preventDefault()}},c.a.createElement("img",{src:T.a,width:"30",height:"30",className:"d-inline-block align-top",alt:""})," ",c.a.createElement("span",{className:"logo-text"},"UNSPLASH")," ",c.a.createElement("span",{style:{color:"#999",fontSize:"13px"}},"viewer"))))},U=a(244),D=a(86),G=a.n(D),M=a(87),R=a.n(M),W=a(88),H=a.n(W),q=a(32),F=a.n(q),B=a(33),Y=a.n(B),$=(a(234),function(e){function t(e){return Object(w.a)(this,t),Object(E.a)(this,Object(k.a)(t).call(this,e))}return Object(N.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this.props,t=e.route,a=e.state,n=e.popupImageAction,r=e.likePhoto,o=e.likeImageAction;return document.querySelector(".photos-grid-view")&&a.settings.blur&&(document.querySelector(".photos-grid-view").classList.add("blur"),document.querySelector(".navbar").classList.add("blur")),document.body.style.overflow="hidden",a.popup_image.id>-1?c.a.createElement("div",{className:"popup"},c.a.createElement(U.a,{to:"/"},c.a.createElement("div",{className:"bg-popup"})),c.a.createElement("div",{className:"popup-component"},c.a.createElement(U.a,{to:"/"},c.a.createElement("div",{className:"close-popup-bg"}),c.a.createElement("img",{src:R.a,alt:"",className:"close-btn"})),c.a.createElement("div",{className:"popupContainer"},c.a.createElement("div",{className:"popup_header"},c.a.createElement("div",{className:"popup_user-card"},c.a.createElement("img",{src:a.popup_image.image.user.profile_image.small,alt:"",className:"popup_profile-image"}),c.a.createElement("div",{className:"popup_profile-links"},c.a.createElement("b",{className:"popup_user-card__user-name"}," ",a.popup_image.image.user.name),c.a.createElement("br",null),c.a.createElement("b",null," ",c.a.createElement("a",{href:a.popup_image.image.user.links.html,target:"_blank",rel:"noopener noreferrer",className:"popup_user-card__user-login"},"@",a.popup_image.image.user.username)))),c.a.createElement("a",{href:a.popup_image.image.links.download,target:"_blank",rel:"noopener noreferrer"},c.a.createElement("img",{src:H.a,alt:"",className:"download"})),c.a.createElement("button",{className:"like-button popup-like",onClick:function(e){r(A,a.popup_image.image),o(A,a.popup_image.id,a.popup_image.image)}},c.a.createElement("img",{src:a.popup_image.image.liked_by_user?Y.a:F.a,alt:"like",className:"like-small"}),c.a.createElement("span",{className:"likes"},a.popup_image.image.likes))),c.a.createElement("img",{src:a.popup_image.image.urls.regular,alt:"",className:"image i-max",onClick:function(e){"i-max"==e.target.classList[1]?(e.target.classList.remove("i-max"),e.target.classList.add("i-min")):"i-min"==e.target.classList[1]&&(e.target.classList.remove("i-min"),e.target.classList.add("i-max"))}}),a.settings.date?c.a.createElement("div",{className:"popup_date-owner"},a.popup_image.image.updated_at):null))):(-1==a.popup_image.id&&(n(-2,{},{}),A.photos.getPhoto(t.location.pathname.split("/")[2]).then(function(e){return e.json()}).then(function(e){n(9999,{},e)})),c.a.createElement("div",{className:"popup"},c.a.createElement("div",{className:"loading bg-popup"},c.a.createElement(U.a,{to:"/",className:"btn btn-outline-primary btn-cancel"},"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"))))}}]),t}(c.a.Component)),z=(a(236),function(e){return{type:"SET_MY_INFO",info:e}}),K=1,Q=!1,V=function(){var e=Object(b.a)(h.a.mark(function e(t,a,n){var r,o;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=window.pageYOffset||document.documentElement.scrollTop,!(window.innerHeight+r>=document.body.clientHeight-300)){e.next=8;break}if(Q){e.next=8;break}return Q=!0,e.next=6,I(a,K,20);case 6:(o=e.sent)&&Object.keys(o).length&&(K++,t(o),Q=!1);case 8:case"end":return e.stop()}},e,this)}));return function(t,a,n){return e.apply(this,arguments)}}(),X=function(e){function t(){return Object(w.a)(this,t),Object(E.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(N.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this.props,t=e.state,a=(e.route,e.addImagesAction),n=e.popupImageAction,r=e.likeImageAction;return Object.keys(t.user_info).length||z(JSON.parse(window.localStorage.user)),0===t.images.length&&V(a,A,t),window.onscroll=function(){V(a,A,t)},document.querySelector(".photos-grid-view")&&(document.querySelector(".photos-grid-view").classList.remove("blur"),document.querySelector(".navbar").classList.remove("blur")),document.body.style.overflow="overlay",c.a.createElement("div",{className:"home-container"},c.a.createElement(g.a,{path:"/:image",render:function(e){return c.a.createElement($,{route:e,state:t,popupImageAction:n,likePhoto:C,likeImageAction:r})}}),c.a.createElement(G.a,{className:"photos-grid-view",elementType:"div",options:{transitionDuration:0,originTop:!0,fitWidth:!0},disableImagesLoaded:!1},t.images.map(function(e,a){var o=e.liked_by_user?Y.a:F.a;return c.a.createElement("figure",{key:a,className:"figure",style:{minHeight:195}},c.a.createElement(U.a,{to:"/image/"+e.id},c.a.createElement("img",{src:e.urls.small,className:"figure-img img-fluid rounded",alt:"image",style:{minHeight:"195px",minWidth:"100%",backgroundColor:e.color},onClick:function(t){return n(a,{},e)}})),t.settings.date?c.a.createElement("span",{className:"owner-date"},e.updated_at):null,c.a.createElement("figcaption",{className:"figure-caption text-right"},c.a.createElement("a",{href:e.user.links.html,target:"_blank",rel:"noopener noreferrer",className:"owner"},c.a.createElement("b",null,e.user.name)),c.a.createElement("button",{className:"like-button",onClick:function(t){C(A,e),r(A,a,e)}},c.a.createElement("img",{src:o,alt:"",className:"like-small"}),c.a.createElement("span",{className:"likes"},e.likes))))})))}}]),t}(c.a.Component),Z=X=Object(u.b)(function(e){return{state:e}},function(e){return{addImagesAction:function(t){e(function(e){return{type:"ADD_IMAGES",images:e}}(t))},popupImageAction:function(t,a,n){e(function(e,t,a){return{type:"POPUP_IMAGE",id:e,state:t,image:a}}(t,a,n))},likeImageAction:function(t,a,n){e(function(e,t,a){return{type:"TOGGLE_LIKE",id:t,unsplash:e,image:a}}(t,a,n))}}})(X),ee=(a(239),a(90)),te=a.n(ee),ae=function(){return c.a.createElement("div",null,c.a.createElement("button",{className:"btn btn-outline-primary auth-btn",onClick:function(e){!function(e){var t=e.auth.getAuthenticationUrl(["public","write_likes"]);window.location.assign(t)}(A)}},"\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f"),c.a.createElement("embed",{className:"figure-image",src:""+te.a}))},ne=function(e){function t(){return Object(w.a)(this,t),Object(E.a)(this,Object(k.a)(t).apply(this,arguments))}return Object(N.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){var e=this.props,t=e.state,a=e.changeSettingsAction,n=e.setMyInfoAction,r=e.routeLocation;return window.token=y("token"),function(){var e=Object(b.a)(h.a.mark(function e(){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.location.search.split("code=")[1]){e.next=6;break}return e.next=3,L(A,window.location.search.split("code=")[1]);case 3:window.token=y("token"),e.next=7;break;case 6:window.token&&L(A);case 7:if(window.localStorage.user||!window.token){e.next=12;break}return e.next=10,A.currentUser.profile().then(function(e){return e.text()}).then(function(e){if(e&&"Rate Limit Exceeded"!=e&&!JSON.parse(e).errors)return JSON.parse(e);console.error("\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d!")});case 10:(a=e.sent)&&(window.localStorage.user=JSON.stringify(a));case 12:window.localStorage.user&&!Object.keys(t.user_info).length&&n(JSON.parse(window.localStorage.user)),window.location.search.split("code=")[1]&&r.history.push("/");case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()(),y("token")&&window.localStorage.keycode?window.localStorage.user?c.a.createElement("div",{className:"App"},c.a.createElement(P,{state:t,changeSettingsAction:a}),c.a.createElement(g.a,{exact:!0,path:"/*",render:function(e){return c.a.createElement(Z,{state:t,route:e})}})):c.a.createElement("b",null,"\u041b\u0438\u043c\u0438\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d \u0438\u043b\u0438 \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a!"):c.a.createElement("div",null,c.a.createElement(P,null),c.a.createElement(ae,null))}}]),t}(c.a.Component),re=ne=Object(u.b)(function(e){return{state:e}},function(e){return{setMyInfoAction:function(t){e(z(t))},changeSettingsAction:function(t){e({type:"CHANGE_SETTINGS",arr:t})}}})(ne),oe=(a(241),window.localStorage.settings?JSON.parse(window.localStorage.settings):window.localStorage.settings=JSON.stringify({date:!1,blur:!0})),ie=Object(l.b)(p,{user_info:{},images:[],settings:Object(n.a)({},oe),popup_image:{id:-1,state:{},image:{}}});Object(s.render)(c.a.createElement(u.a,{store:ie},c.a.createElement(d.a,null,c.a.createElement(g.a,{exact:!0,path:"*",render:function(e){return c.a.createElement(re,{routeLocation:e})}}))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");r?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):o(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):o(t,e)})}}()},32:function(e,t,a){e.exports=a.p+"static/media/61731.5fc44516.svg"},33:function(e,t,a){e.exports=a.p+"static/media/291212.ab11192f.svg"},53:function(e,t,a){e.exports="./static/media/logo2.eceedf32.svg"},87:function(e,t,a){e.exports=a.p+"static/media/close.c4c396d3.svg"},88:function(e,t,a){e.exports=a.p+"static/media/126488.2e61c3f5.svg"},90:function(e,t,a){e.exports="./static/media/MaskFigureUnregister2.9657789f.svg"},91:function(e,t,a){e.exports=a(243)}},[[91,2,1]]]);
//# sourceMappingURL=main.de06e34d.chunk.js.map