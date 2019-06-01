import Unsplash from 'unsplash-js';
import { getCookie, setCookie } from '../helpers';

const DEFS = {
    accessKey: "2e0b887662588b73126393d4d2621056982214f0414d16a8434a7e2386466cc7",
    secretkey: "569797e0eaec6cd9a46412ef0043b548c87e1ae6ad7ca45e8147aa5fe0cacda3",
    callbackUrl: "http://cdn.khodyr.ru/any/unsplash.php"
}

// Инициализация
export const unsplash = new Unsplash({
    applicationId: DEFS.accessKey,
    secret: DEFS.secretkey,
    callbackUrl: DEFS.callbackUrl
});

export const authenticationUnsplash = (unsplash) => {
    // Генерирует ссылку для авторизации с указанными правами
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        "public",
        "write_likes"
    ]);

    window.location.assign(authenticationUrl); // Перенапревление на авторизацию в unsplash
}

export const getToken = (unsplash) => {
    getCookie("token");
    if (getCookie("token")) {
        return unsplash.auth.setBearerToken(getCookie("token"));
    };
    const code = window.location.search.split('code=')[1];
    if (code) {
        return unsplash.auth.userAuthentication(code)
            .then(res => res.json())
            .then(res => {
                window.localStorage['keycode'] = code;
                let date = new Date;
                date.setDate(date.getDate() + 1);
                setCookie("token", res.access_token, {
                    expires: date.toUTCString()
                });
                unsplash.auth.setBearerToken(res.access_token);
        });
    }
}

export const getUser = (unsplash) => {
    return unsplash.currentUser.profile()
      .then(res => res.text())
      .then(res => res)
}
  
export const getPhotos = (unsplash, amount = 20) => {
    return (
      unsplash.photos.listPhotos(1, amount, 'latest')
        .then(res => res.json())
        .then(res => res)
    )
}
  
export const getPhotos_ = (unsplash, start = 1, end = 15) => {
    return (
      unsplash.photos.listPhotos(start, amount, 'latest')
        .then(res => res.json())
        .then(res => res)
    )
}
  
export const likePhoto = (unsplash, id) => {
    return (
      unsplash.photos.likePhoto(id)
        .then(res => res.json())
        .then(res => res)
    )
}
  
export const unlikePhoto = (unsplash, id) => {
    return (
      unsplash.photos.unlikePhoto(id)
        .then(res => res.json())
        .then(res => res)
    )
}