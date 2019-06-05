export const setMyInfoAction = (info) => {
    return {
        type: 'SET_MY_INFO',
        info: info
    }
}

export const addImagesAction = (images) => {
    return {
        type: 'ADD_IMAGES',
        images: images
    }
}

export const likeImageAction = (unsplash, id, image) => {
    return {
        type: 'TOGGLE_LIKE',
        id: id,
        unsplash: unsplash,
        image: image,
    }
}

export const popupImageAction = (id, state, image) => {
    return {
        type: 'POPUP_IMAGE',
        id: id,
        state: state,
        image: image
    }
}

export const changeSettingsAction = (arr) => {
    return {
        type: 'CHANGE_SETTINGS',
        arr: arr
    }
}