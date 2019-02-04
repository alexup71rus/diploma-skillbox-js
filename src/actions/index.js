export const setMyInfo = (info) => {
    return {
        type: 'SET_MY_INFO',
        info: info
    }
}

export const addImages = (images) => {
    return {
        type: 'ADD_IMAGES',
        images: images
    }
}

export const likeImage = (id, unsplash, image) => {
    return {
        type: 'SET_LIKE',
        id: id,
        unsplash: unsplash,
        image: image,
    }
}

export const popupImage = (id, state, image) => {
    return {
        type: 'POPUP_IMAGE',
        id: id,
        state: state,
        image: image
    }
}

export const test = (int) => {
    return {
        type: 'TEST'
    }
}