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

export const getToken = (unsplash, code) => {
    if (getCookie("token")) {
        return unsplash.auth.setBearerToken(getCookie("token"));
    };
    if (code) {
        return unsplash.auth.userAuthentication(code)
            .then(res => res.text())
            .then(res => {
                if (res && res != "Rate Limit Exceeded" && !JSON.parse(res).errors) {
                    window.localStorage['keycode'] = code;
                    let date = new Date;
                    date.setDate(date.getDate() + 1);
                    setCookie("token", JSON.parse(res).access_token, {
                        expires: date.toUTCString()
                    });
                    unsplash.auth.setBearerToken(JSON.parse(res).access_token);
                } else { console.error("Лимит запросов исчерпан!"); }
        });
    }
}

export const getUser = (unsplash) => {
    return unsplash.currentUser.profile()
      .then(res => res.text())
      .then(res => {
        if (res && res != "Rate Limit Exceeded" && !JSON.parse(res).errors) { return JSON.parse(res); }
        else { console.error("Лимит запросов исчерпан!"); }
      })
}
  
export const getPhotos = (unsplash, start = 1, end = 15) => {
    return (
      unsplash.photos.listPhotos(start, end, 'latest')
        .then(res => res.text())
        .then(res => {
            if (res != "Rate Limit Exceeded" && !JSON.parse(res).errors) { return JSON.parse(res); }
            else { console.error("Лимит запросов исчерпан!"); }
        })
    )
}
  
export const likePhoto = (unsplash, id) => {
    return (
      unsplash.photos.likePhoto(id)
        .then(res => res.text())
        .then(res => {
            if (res != "Rate Limit Exceeded" && !JSON.parse(res).errors) { return JSON.parse(res); }
            else { console.error("Лимит запросов исчерпан!"); }
        })
    )
}
  
export const unlikePhoto = (unsplash, id) => {
    return (
      unsplash.photos.unlikePhoto(id)
        .then(res => res.text())
        .then(res => {
            if (res != "Rate Limit Exceeded" && !JSON.parse(res).errors) { return JSON.parse(res); }
            else { console.error("Лимит запросов исчерпан!"); }
        })
    )
}